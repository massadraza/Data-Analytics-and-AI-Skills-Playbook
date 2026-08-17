export const meta = {
  name: 'codebase-onboarding-map',
  description: 'Explore a codebase module-by-module in parallel and synthesize an architecture overview for onboarding or as a CLAUDE.md draft',
  whenToUse: 'Run on a new-to-you codebase, or a codebase that has drifted from its docs, to rebuild an accurate architecture map without reading everything yourself top to bottom.',
  phases: [
    { title: 'Discover', detail: 'list top-level modules' },
    { title: 'Map', detail: 'one agent per module, run in parallel' },
    { title: 'Synthesize', detail: 'merge into one architecture doc' },
  ],
}

const MODULE_LIST_SCHEMA = {
  type: 'object',
  properties: {
    modules: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          path: { type: 'string' },
          guessed_purpose: { type: 'string' },
        },
        required: ['name', 'path'],
      },
    },
  },
  required: ['modules'],
}

phase('Discover')
const moduleList = await agent(
  `List the top-level source directories/modules in this repository that represent distinct areas of functionality ` +
  `(ignore node_modules, .git, dist, build, venv, .venv, __pycache__, and other generated/vendor directories). ` +
  `For each, give its path and a one-line guess of its purpose based on directory/file names only — don't deep-read files yet. ` +
  `Cap it at the 12 most significant modules if there are more.`,
  { schema: MODULE_LIST_SCHEMA, phase: 'Discover' },
)

log(`${moduleList.modules.length} modules found, mapping each in parallel`)

phase('Map')
const moduleReports = await pipeline(
  moduleList.modules,
  m => agent(
    `Explore the module at path "${m.path}" in this repository (guessed purpose: "${m.guessed_purpose || 'unknown'}"). ` +
    `Read enough of its key files to summarize: (1) its actual purpose, (2) the 3-5 most important files and what each does, ` +
    `(3) how it connects to other parts of the codebase (what it imports/calls, what calls into it), ` +
    `and (4) anything a new engineer should know before touching it — non-obvious constraints, gotchas, or conventions. ` +
    `Keep it to a tight paragraph or two per point, not exhaustive file-by-file detail.`,
    { label: `map:${m.name}`, phase: 'Map' },
  ).then(report => ({ ...m, report })),
)

log('Module maps complete, synthesizing architecture overview')

phase('Synthesize')
const doc = await agent(
  `You are given per-module summaries of a codebase:\n\n` +
  moduleReports.map(m => `## ${m.name} (${m.path})\n${m.report}`).join('\n\n') +
  `\n\nWrite a single cohesive architecture overview in Markdown suitable for a CLAUDE.md "Architecture" section or an onboarding doc: ` +
  `a short intro describing what this project does overall, a module-by-module breakdown, and a "how the pieces connect" section describing the main data/control flow across modules. ` +
  `Then write this content to a new file named ARCHITECTURE.draft.md in the repository root — if that file already exists, write to ARCHITECTURE.draft.v2.md instead so nothing is overwritten. ` +
  `Return the final markdown text as your answer as well.`,
  { phase: 'Synthesize' },
)

return { modules: moduleList.modules.map(m => m.name), doc }
