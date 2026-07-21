Scan $ARGUMENTS for exposed or mishandled secrets.

1. **Hardcoded secrets** — search source files for API keys, tokens, passwords, or connection strings written directly in code rather than loaded from environment/config
2. **.env hygiene** — check that `.env` (or equivalent) is in `.gitignore`, and check git history/staged files for any accidental commit of a real `.env`
3. **Config file leakage** — check deploy configs (`railway.toml`, `render.yaml`, CI config) for secrets committed in plaintext instead of referencing a secrets manager or platform env vars
4. **Logging leakage** — check whether request/response logging, error traces, or debug output could print secrets (full request bodies, headers, API responses containing keys)
5. **Frontend exposure** — for any frontend code, check that no backend-only secret (API keys meant for server-side calls) is bundled into client-side JS

For each finding, show file path and line number, explain the exposure path (who could see it and how), and suggest the fix (move to env var, add to `.gitignore`, redact in logs, rotate the key if already committed). If secrets handling looks clean, confirm explicitly.
