import { NextRequest, NextResponse } from 'next/server';

// Metrics tracking API
let metrics = {
  totalEmailsSent: 40,
  totalOpens: 30,
  totalResponses: 7,
  totalMeetingsBooked: 3,
  totalDealsClosed: 1,
  averageOpenRate: 75,
  averageResponseRate: 17.5,
  averageMeetingRate: 7.5,
  averageDealRate: 2.5,
  topPerformingNiches: [
    { niche: 'fashion', responseRate: 25, dealRate: 5 },
    { niche: 'food', responseRate: 20, dealRate: 10 },
    { niche: 'fitness', responseRate: 15, dealRate: 0 }
  ],
  weeklyStats: [
    { week: '2024-08-05', emailsSent: 10, opens: 8, responses: 2, meetings: 1, deals: 0 },
    { week: '2024-08-12', emailsSent: 15, opens: 12, responses: 3, meetings: 1, deals: 1 },
    { week: '2024-08-19', emailsSent: 15, opens: 10, responses: 2, meetings: 1, deals: 0 }
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timeframe = searchParams.get('timeframe'); // week, month, all

  if (timeframe === 'week') {
    const latestWeek = metrics.weeklyStats[metrics.weeklyStats.length - 1];
    return NextResponse.json({
      success: true,
      timeframe: 'week',
      metrics: latestWeek
    });
  }

  if (timeframe === 'month') {
    const monthStats = metrics.weeklyStats.slice(-4);
    const monthlyTotals = monthStats.reduce((acc, week) => ({
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
  metrics.averageOpenRate = (metrics.totalOpens / metrics.totalEmailsSent) * 100;
  metrics.averageResponseRate = (metrics.totalResponses / metrics.totalEmailsSent) * 100;
  metrics.averageMeetingRate = (metrics.totalMeetingsBooked / metrics.totalEmailsSent) * 100;
  metrics.averageDealRate = (metrics.totalDealsClosed / metrics.totalEmailsSent) * 100;

  return NextResponse.json({
    success: true,
    metrics: metrics
  });
}
