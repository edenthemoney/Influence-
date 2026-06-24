import { NextResponse } from 'next/server';
import { getSchedulerStatus } from '@/lib/scheduler';

// GET — current warm-up / ramp status for the dashboard
export async function GET() {
  return NextResponse.json(getSchedulerStatus());
}
