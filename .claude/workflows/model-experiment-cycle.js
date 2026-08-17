export const meta = {
  name: 'model-experiment-cycle',
  description: 'Run the full pre-experiment assessment cycle for an ML model — data health, feature signal, tuning suggestions, current eval — and synthesize a concrete next-experiment plan',
  whenToUse: 'Run before starting a new model experiment/iteration, so the plan is grounded in the current data and model state instead of guesswork.',
  phases: [
    { title: 'Assess', detail: 'data health + current model eval + feature signal, in parallel' },
    { title: 'Recommend', detail: 'hyperparameter and threshold suggestions, in parallel' },
    { title: 'Plan', detail: 'synthesize one concrete next-experiment plan' },
  ],
}

function skillPrompt(skill, extra) {
  return `Read the file skills/${skill}.md in this repository for your instructions, then apply them to the ML model(s) in this project. ${extra || ''}`
}

phase('Assess')
const [health, evalReport, importance, comparison] = await parallel([
  () => agent(skillPrompt('dataset-health'), { label: 'assess:dataset-health', phase: 'Assess' }),
  () => agent(skillPrompt('eval-report'), { label: 'assess:eval-report', phase: 'Assess' }),
  () => agent(skillPrompt('feature-importance'), { label: 'assess:feature-importance', phase: 'Assess' }),
  () => agent(skillPrompt('model-compare'), { label: 'assess:model-compare', phase: 'Assess' }),
])

phase('Recommend')
const [hyperparams, threshold] = await parallel([
  () => agent(skillPrompt('hyperparameter-suggest'), { label: 'recommend:hyperparameter-suggest', phase: 'Recommend' }),
  () => agent(skillPrompt('threshold-tune'), { label: 'recommend:threshold-tune', phase: 'Recommend' }),
])

log('Assessment and tuning recommendations gathered, synthesizing next-experiment plan')

phase('Plan')
const plan = await agent(
  `You have the following audit results from the current best model in this project:\n\n` +
  `--- Dataset health ---\n${health}\n\n` +
  `--- Current eval ---\n${evalReport}\n\n` +
  `--- Feature importance ---\n${importance}\n\n` +
  `--- Model comparison across existing experiments ---\n${comparison}\n\n` +
  `--- Hyperparameter suggestions ---\n${hyperparams}\n\n` +
  `--- Threshold tuning ---\n${threshold}\n\n` +
  `Read skills/new-model.md in this repository for the scaffolding convention this project uses. ` +
  `Then write a concrete, prioritized next-experiment plan: what single change to try next and why (pick the highest-leverage idea from the above, don't just list all of them), ` +
  `what to keep constant so the experiment is a fair comparison against the current best model, and the exact scaffolding steps to set it up per the new-model convention. ` +
  `Keep it to one clear experiment, not a laundry list.`,
  { phase: 'Plan' },
)

return { health, evalReport, importance, comparison, hyperparams, threshold, plan }
