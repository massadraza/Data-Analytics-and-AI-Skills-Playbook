Check $ARGUMENTS for operations that aren't safe to run twice.

1. **Side-effect inventory** — list every operation with a real-world side effect: sending an email/newsletter, writing to a database, calling a paid API, triggering a webhook, notifying a user
2. **Duplicate-trigger scenarios** — for each, identify how it could realistically fire twice: a retry after a timeout (but the first call actually succeeded), a webhook redelivery, a scheduled job overlapping with a manual rerun, a user double-clicking submit
3. **Idempotency key check** — flag operations with no idempotency key, dedup check, or "already processed" guard before executing the side effect
4. **State check before action** — check whether the code verifies current state before acting (e.g., "has this newsletter already been sent for this date?") or just executes unconditionally
5. **Recovery behavior** — if a job fails partway through, check whether restarting it safely resumes/skips completed steps or redoes everything from scratch (redoing external side effects)

For each gap, show file path and line number, describe the concrete duplicate-send/duplicate-write scenario, and suggest a fix (idempotency key, dedup table, check-before-write). If an operation is already safely idempotent, confirm it explicitly.
