import { NextRequest, NextResponse } from 'next/server';
import { runAutopilot, AutopilotConfig } from '@/lib/autopilot';
import { requireAuth } from '@/lib/auth';

// POST — run the auto-pilot pipeline once (manual trigger or cron)
export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth) return auth;

  let config: Partial<AutopilotConfig> = {};
  try {
    config = await req.json();
  } catch {
    // empty body is fine — use defaults
  }
  try {
    const result = await runAutopilot(config);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET — allow cron services (e.g. Netlify scheduled functions, cron-job.org)
// to trigger a run with default config via a simple GET + secret.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (process.env.AUTOPILOT_SECRET && secret !== process.env.AUTOPILOT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const result = await runAutopilot();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
