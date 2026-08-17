export const meta = {
  name: 'newsletter-pipeline-audit',
  description: 'Full-pipeline audit for a LangGraph-style multi-agent content pipeline (routing, cost, RAG, QC, ops, prompts)',
  whenToUse: 'Run against a multi-agent content/newsletter pipeline repo (LangGraph, FastAPI, pgvector) before a release, or periodically to catch drift as agents/prompts evolve.',
  phases: [
    { title: 'Audit', detail: 'one agent per relevant skill, run in parallel' },
    { title: 'Verify', detail: 'adversarial verification per finding' },
    { title: 'Synthesize', detail: 'merge into one prioritized report' },
  ],
}

// Each skill's full instructions live in skills/<name>.md — agents read that
// file themselves so this script never duplicates the prompt text.
const SKILLS = [
  'pipeline-trace-audit',
  'multi-agent-routing-audit',
  'llm-pipeline-cost-audit',
  'content-qc-audit',
  'source-grounding-audit',
  'vector-rag-index-audit',
  'external-api-quota-audit',
  'scheduled-job-reliability-audit',
  'agent-prompt-regression-check',
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
    `Apply those instructions to this codebase (a multi-agent content/newsletter pipeline). ` +
    `Actually inspect the relevant source files (agent nodes, orchestrator, API routes, cron/schedule config, prompt files) — do not guess. ` +
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
  return { findings: [], summary: 'No issues found across any audited dimension.' }
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
const bySeverity = { high: [], medium: [], low: [] }
confirmed.forEach(f => bySeverity[f.severity]?.push(f))

log(`${confirmed.length}/${allFindings.length} findings confirmed after verification`)

phase('Synthesize')
return {
  totalRaw: allFindings.length,
  totalConfirmed: confirmed.length,
  high: bySeverity.high,
  medium: bySeverity.medium,
  low: bySeverity.low,
}
