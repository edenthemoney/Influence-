import { NextResponse } from 'next/server';
import { llmsText } from '@/lib/llmsText';

export async function GET() {
  return new NextResponse(llmsText, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
