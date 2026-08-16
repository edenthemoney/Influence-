import { NextRequest, NextResponse } from 'next/server';

// Metrics tracking API - ready for real data
let metrics: any = {
  totalEmailsSent: 0,
  totalOpens: 0,
  totalResponses: 0,
  totalMeetingsBooked: 0,
  totalDealsClosed: 0,
  averageOpenRate: 0,
  averageResponseRate: 0,
  averageMeetingRate: 0,
  averageDealRate: 0,
  topPerformingNiches: [],
  weeklyStats: []
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timeframe = searchParams.get('timeframe'); // week, month, all

  if (timeframe === 'week') {
    const latestWeek = metrics.weeklyStats[metrics.weeklyStats.length - 1];
    return NextResponse.json({
      success: true,
      timeframe: 'week',
      metrics: latestWeek || { emailsSent: 0, opens: 0, responses: 0, meetings: 0, deals: 0 }
    });
  }

  if (timeframe === 'month') {
    const monthStats = metrics.weeklyStats.slice(-4);
    const monthlyTotals = monthStats.reduce((acc: any, week: any) => ({
      emailsSent: acc.emailsSent + week.emailsSent,
      opens: acc.opens + week.opens,
      responses: acc.responses + week.responses,
      meetings: acc.meetings + week.meetings,
      deals: acc.deals + week.deals
    }), { emailsSent: 0, opens: 0, responses: 0, meetings: 0, deals: 0 });

    return NextResponse.json({
      success: true,
      timeframe: 'month',
      metrics: monthlyTotals
    });
  }

  return NextResponse.json({
    success: true,
    timeframe: 'all',
    metrics: metrics
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, data } = body;

  // Update metrics based on type
  switch (type) {
    case 'email_sent':
      metrics.totalEmailsSent++;
      break;
    case 'email_opened':
      metrics.totalOpens++;
      break;
    case 'email_responded':
      metrics.totalResponses++;
      break;
    case 'meeting_booked':
      metrics.totalMeetingsBooked++;
      break;
    case 'deal_closed':
      metrics.totalDealsClosed++;
      break;
    default:
      return NextResponse.json(
        { success: false, error: 'Invalid metric type' },
        { status: 400 }
      );
  }

  // Recalculate averages
  if (metrics.totalEmailsSent > 0) {
    metrics.averageOpenRate = (metrics.totalOpens / metrics.totalEmailsSent) * 100;
    metrics.averageResponseRate = (metrics.totalResponses / metrics.totalEmailsSent) * 100;
    metrics.averageMeetingRate = (metrics.totalMeetingsBooked / metrics.totalEmailsSent) * 100;
    metrics.averageDealRate = (metrics.totalDealsClosed / metrics.totalEmailsSent) * 100;
  }

  return NextResponse.json({
    success: true,
    metrics: metrics
  });
}
