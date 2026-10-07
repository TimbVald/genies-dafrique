/* ── Shared Rate Limit Storage ──────────────────────────────────────
   Shared in-memory storage for rate limiting across API routes
   In production, replace with Redis or similar
   ────────────────────────────────────────────────────────────────── */
export const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
export const lastSubmissionByIp = new Map<string, number>();
