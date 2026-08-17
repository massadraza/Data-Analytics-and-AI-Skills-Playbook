export const meta = {
  name: 'pr-readiness-check',
  description: 'Review the current diff across correctness, simplification/reuse, security, and test coverage before opening a PR',
  whenToUse: 'Run before opening a PR on any project, not just the ones in this repo — a general pre-PR gate covering more ground than a single-pass review.',
  phases: [
    { title: 'Review', detail: 'one agent per dimension, run in parallel over the diff' },
    { title: 'Verify', detail: 'adversarial verification per finding' },
  ],
}

const DIMENSIONS = [
  {
    key: 'correctness',
    prompt: 'Run `git diff` against the base/target branch (default to main/master if unspecified) to see the pending changes. Review ONLY the changed code for correctness bugs: logic errors, off-by-one, wrong operator, unhandled edge cases, null/undefined handling, race conditions. For each bug, name the concrete input or state that triggers it.',
  },
  {
    key: 'simplification',
    prompt: 'Run `git diff` against the base/target branch to see the pending changes. Review ONLY the changed code for unnecessary complexity: duplicated logic that could reuse an existing helper, premature abstraction, dead code, or a simpler idiom that does the same thing in fewer lines.',
  },
  {
    key: 'security',
    prompt: 'Run `git diff` against the base/target branch to see the pending changes. Review ONLY the changed code for security issues: injection (SQL/command/XSS), secrets or credentials committed, missing input validation at trust boundaries, unsafe deserialization, broken auth/access checks.',
  },
  {
    key: 'test-coverage',
    prompt: 'Run `git diff` against the base/target branch to see the pending changes. For each new or changed function/branch, check whether an accompanying test was added or updated in this diff. Flag any new conditional branch, error path, or edge case that has no test covering it.',
  },
]

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['low', 'medium', 'high'] },
          file: { type: 'string' },
          line: { type: 'number' },
          summary: { type: 'string' },
          failure_scenario: { type: 'string' },
        },
        required: ['severity', 'summary'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    refuted: { type: 'boolean' },
    reason: { type: 'string' },
  },
  required: ['refuted', 'reason'],
}

phase('Review')
const results = await pipeline(
  DIMENSIONS,
  d => agent(d.prompt, { label: `review:${d.key}`, phase: 'Review', schema: FINDINGS_SCHEMA })
    .then(r => (r.findings || []).map(f => ({ ...f, dimension: d.key }))),
)

const allFindings = results.filter(Boolean).flat()
log(`${allFindings.length} raw findings across ${DIMENSIONS.length} review dimensions`)

if (allFindings.length === 0) {
  return { findings: [], verdict: 'READY — no issues found across correctness, simplification, security, or test coverage.' }
}

phase('Verify')
const verified = await pipeline(
  allFindings,
  f => agent(
    `Try to refute this ${f.dimension} finding by re-checking the actual code it refers to (re-run \`git diff\` if needed). ` +
    `Finding: "${f.summary}" ${f.file ? `(file: ${f.file}${f.line ? `:${f.line}` : ''})` : ''}. ` +
    `Failure scenario given: "${f.failure_scenario || 'none'}". ` +
    `Default to refuted=true only if you can point to why it's wrong, unreachable, or already handled elsewhere; otherwise refuted=false.`,
    { label: `verify:${f.dimension}`, phase: 'Verify', schema: VERDICT_SCHEMA },
  ).then(v => ({ ...f, verdict: v })),
)

const confirmed = verified.filter(Boolean).filter(v => v.verdict && !v.verdict.refuted)
const blocking = confirmed.filter(f => f.severity === 'high')

log(`${confirmed.length}/${allFindings.length} findings confirmed; ${blocking.length} high-severity`)

return {
  totalRaw: allFindings.length,
  totalConfirmed: confirmed.length,
  confirmed,
  verdict: blocking.length > 0
    ? `NOT READY — ${blocking.length} high-severity issue(s) to fix first.`
    : confirmed.length > 0
      ? `READY WITH NOTES — ${confirmed.length} lower-severity issue(s) worth a look, none blocking.`
      : 'READY — no confirmed issues.',
}
