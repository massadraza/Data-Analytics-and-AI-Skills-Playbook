export const meta = {
  name: 'staged-forecast-model-audit',
  description: 'Full-pipeline audit for a staged (gate + downstream) time-series forecasting model, before training a new version or shipping to production',
  whenToUse: 'Run against a two-stage or staged ML forecasting repo (e.g. classifier gate + regressor, sklearn/darts, time-series) before retraining, before a release, or when eval metrics look suspiciously good.',
  phases: [
    { title: 'Audit', detail: 'one agent per relevant skill, run in parallel' },
    { title: 'Verify', detail: 'adversarial verification per finding' },
    { title: 'Synthesize', detail: 'merge into one prioritized report' },
  ],
}

const SKILLS = [
  'dataset-health',
  'data-leakage',
  'temporal-split',
  'feature-importance',
  'eval-report',
  'threshold-tune',
  'staged-model-gating-audit',
  'forecast-horizon-audit',
  'training-serving-skew-check',
  'overfitting-check',
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
    `Apply those instructions to this codebase (a staged/two-stage time-series forecasting model: a classifier gate feeding a downstream regressor, trained on weather/environmental time-series data). ` +
    `Actually inspect the relevant source files (data loading, feature engineering, training scripts, eval scripts, the gating/regime-switch logic, and any serving/API code) — do not guess. ` +
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
    `Try to refute this audit finding by actually re-checking the code/data it refers to. ` +
    `Finding (from the "${f.skill}" audit): "${f.summary}" ${f.file ? `(file: ${f.file})` : ''}. ` +
    `Recommendation given: "${f.recommendation || 'none'}". ` +
    `Pay special attention to whether this could be a metric-inflating bug (leakage, gating skew, lookahead) vs. a minor style issue. ` +
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
