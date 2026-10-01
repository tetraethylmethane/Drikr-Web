/**
 * Drone photos from the app, for training Drikr's crop AI.
 *
 * The app only calls this when the farmer has agreed to share photos. Every
 * request carries a Firebase ID token, verified here against Google's public
 * keys for the drikr-369ce project, so only this app's signed-in users can
 * write - the endpoint is not an open bucket. Images go to Vercel Blob under
 * flights/<uid>/<flightId>/ with a random suffix, so a link cannot be guessed;
 * the app then writes the links into Firestore `flights/`, which only the
 * farmer and the experts can read.
 */
import { del, list, put } from '@vercel/blob';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';

const PROJECT = 'drikr-369ce';
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'),
);
/** A 720p JPEG is ~100-300 KB; anything far bigger is not a drone frame. */
const MAX_BYTES = 3_000_000;

async function uidFrom(req: Request): Promise<string | null> {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${PROJECT}`,
      audience: PROJECT,
    });
    return typeof payload.sub === 'string' && payload.sub ? payload.sub : null;
  } catch {
    return null;
  }
}

const safe = (s: unknown) => String(s ?? '').replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 120);

export async function POST(req: Request) {
  const uid = await uidFrom(req);
  if (!uid) return Response.json({ error: 'unauthorised' }, { status: 401 });

  let body: { flightId?: unknown; spot?: unknown; image?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad json' }, { status: 400 });
  }
  const flightId = safe(body.flightId);
  const spot = Number(body.spot);
  if (!flightId || !Number.isFinite(spot) || typeof body.image !== 'string') {
    return Response.json({ error: 'bad request' }, { status: 400 });
  }

  const bytes = Buffer.from(body.image, 'base64');
  // JPEG files start FF D8 FF; refuse anything else rather than storing it.
  if (bytes.length < 1000 || bytes.length > MAX_BYTES || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    return Response.json({ error: 'not a jpeg' }, { status: 400 });
  }

  const blob = await put(`flights/${safe(uid)}/${flightId}/spot-${spot}.jpg`, bytes, {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'image/jpeg',
  });
  return Response.json({ url: blob.url });
}

/** The farmer's right to erasure: remove every photo they uploaded. */
export async function DELETE(req: Request) {
  const uid = await uidFrom(req);
  if (!uid) return Response.json({ error: 'unauthorised' }, { status: 401 });
  let removed = 0;
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: `flights/${safe(uid)}/`, cursor, limit: 1000 });
    if (page.blobs.length) {
      await del(page.blobs.map((b) => b.url));
      removed += page.blobs.length;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return Response.json({ removed });
}
