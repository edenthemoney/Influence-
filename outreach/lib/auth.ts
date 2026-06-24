import { NextRequest, NextResponse } from 'next/server';

// Simple shared secret for internal API routes.
// For local-only use, the secret can be empty (disabled). For any public deploy,
// set AUTOPILOT_SECRET and pass it as `?secret=...` or `X-Api-Secret` header.

export function requireAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.AUTOPILOT_SECRET;
  if (!secret) return null; // local-only mode, no secret configured

  const provided =
    req.nextUrl.searchParams.get('secret') ||
    req.headers.get('x-api-secret') ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
