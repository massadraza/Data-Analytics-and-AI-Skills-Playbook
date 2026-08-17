export const meta = {
  name: 'production-readiness-audit',
  description: 'General pre-ship audit covering reliability, observability, scalability, idempotency, and secrets hygiene — for any service, not tied to a specific project',
  whenToUse: 'Run before shipping/deploying any backend service or pipeline, as a broader gate than a single system-design skill.',
  phases: [
    { title: 'Audit', detail: 'one agent per system-design skill, run in parallel' },
    { title: 'Verify', detail: 'adversarial verification per finding' },
  ],
}

const SKILLS = [
  'resilience-check',
  'observability-audit',
  'bottleneck-scan',
  'idempotency-check',
  'secrets-exposure-scan',
]

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          skill: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high'] },
          file: { type: 'string' },
          summary: { type: 'string' },
          recommendation: { type: 'string' },
        },
        required: ['skill', 'severity', 'summary'],
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

function auditPrompt(skill) {
  return `Read the file skills/${skill}.md in this repository — it contains your full audit instructions. ` +
    `Apply those instructions to this codebase. Actually inspect the relevant source (external calls, logging, request-handling paths, side-effecting operations, config/env files) — do not guess. ` +
    `Return every concrete issue you find as a finding, each tagged with skill: "${skill}".`
}

phase('Audit')
const results = await pipeline(
  SKILLS,
  skill => agent(auditPrompt(skill), { label: `audit:${skill}`, phase: 'Audit', schema: FINDINGS_SCHEMA }),
)

const allFindings = results.filter(Boolean).flatMap(r => r.findings || [])
log(`${allFindings.length} raw findings across ${SKILLS.length} skills`)

if (allFindings.length === 0) {
  return { findings: [], verdict: 'READY — no issues found across reliability, observability, scalability, idempotency, or secrets hygiene.' }
}

phase('Verify')
const verified = await pipeline(
  allFindings,
  f => agent(
    `Try to refute this audit finding by actually re-checking the code it refers to. ` +
    `Finding (from the "${f.skill}" audit): "${f.summary}" ${f.file ? `(file: ${f.file})` : ''}. ` +
    `Recommendation given: "${f.recommendation || 'none'}". ` +
    `Default to refuted=true only if you can point to why the finding is wrong or already handled; otherwise refuted=false.`,
    { label: `verify:${f.skill}`, phase: 'Verify', schema: VERDICT_SCHEMA },
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
