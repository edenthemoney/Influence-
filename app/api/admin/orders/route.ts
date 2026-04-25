import { NextRequest, NextResponse } from 'next/server';

// Simple auth check - in production use proper authentication
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin123';

declare global {
  var orders: any[];
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  // Simple token auth (replace with proper auth in production)
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = global.orders || [];
  
  return NextResponse.json({ 
    orders,
    count: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.amount || 0), 0)
  });
}
