Review a change to an LLM agent's system prompt or instructions (given as a diff, or by comparing $ARGUMENTS to its previous version in git history) for likely behavior regressions.

1. **Intent diff** — summarize in plain English what the prompt change is trying to achieve
2. **Removed constraints** — flag any instruction, format rule, or guardrail that was removed or weakened; state what behavior it was previously preventing
3. **Ambiguity introduced** — flag new wording that's vaguer than what it replaced (e.g., "be concise" replacing a specific word/length limit) and could cause inconsistent output
4. **Downstream contract risk** — if this agent's output feeds a parser, another agent, or a fixed UI template, check whether the prompt still guarantees the output shape/format that downstream code expects
5. **Missing golden examples** — check whether this prompt has an associated eval set (sample inputs + expected outputs); if not, draft 3-5 representative test cases covering typical and edge-case inputs
6. **Regression test suggestion** — propose a lightweight before/after comparison: run both prompt versions on the same golden set and diff the outputs for anything beyond the intended change

Output the risk-ranked list of behavior changes and the suggested golden test cases.
