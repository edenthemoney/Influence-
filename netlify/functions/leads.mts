// Free leads table on Netlify Blobs (store "influence-leads"). Every op requires ADMIN_TOKEN.
// Never sends anything; read/write storage only.
import { getStore } from '@netlify/blobs';

const STATUSES = ['new', 'contacted', 'booked', 'lost'];
const json = (d: unknown, status = 200) => new Response(JSON.stringify(d), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

function authed(req: Request) {
  const want = (globalThis as any).Netlify?.env?.get('ADMIN_TOKEN') || process.env.ADMIN_TOKEN;
  const got = req.headers.get('x-admin-token') || (req.headers.get('authorization') || '').replace(/^Bearer /, '');
  return !!want && got === want;
}

export default async (req: Request) => {
  if (!authed(req)) return json({ error: 'Unauthorized' }, 401);
  const store = getStore({ name: 'influence-leads', consistency: 'strong' });

  if (req.method === 'GET') {
    const { blobs } = await store.list();
    const leads = (await Promise.all(blobs.slice(0, 1000).map((b) => store.get(b.key, { type: 'json' }).catch(() => null)))).filter(Boolean) as any[];
    leads.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    return json({ leads });
  }

  const body: any = await req.json().catch(() => ({}));
  const id = String(body.id || body.lead?.id || '');
  if (!/^[\w-]{8,64}$/.test(id)) return json({ error: 'Bad id' }, 400);
  const prev: any = (await store.get(id, { type: 'json' })) || null;
  const now = new Date().toISOString();

  if (req.method === 'POST') {
    // Upsert from /api/save-lead (contact first, qualifier answers later). Keeps Eden's status/notes.
    const l = body.lead || {};
    const merged = {
      ...(prev || {}), ...Object.fromEntries(Object.entries(l).filter(([, v]) => v !== undefined && v !== '' && v !== null)),
      id,
      answers: { ...(prev?.answers || {}), ...(l.answers || {}) },
      flags: Array.from(new Set([...(prev?.flags || []), ...(l.flags || [])])),
      status: prev?.status || 'new',
      notes: prev?.notes || '',
      createdAt: prev?.createdAt || now,
      updatedAt: now,
    };
    await store.setJSON(id, merged);
    return json({ ok: true });
  }

  if (req.method === 'PATCH') {
    if (!prev) return json({ error: 'Not found' }, 404);
    const next = { ...prev, updatedAt: now };
    if (typeof body.status === 'string' && STATUSES.includes(body.status)) next.status = body.status;
    if (typeof body.notes === 'string') next.notes = body.notes.slice(0, 4000);
    await store.setJSON(id, next);
    return json({ ok: true, lead: next });
  }
  if (req.method === 'DELETE') {
    await store.delete(id);
    return json({ ok: true });
  }
  return json({ error: 'Method not allowed' }, 405);
};
