/**
 * Translation through Bhashini, the Government of India's language platform.
 *
 * The app and the back-translation script call this instead of Bhashini so the
 * credentials live only in Vercel's environment (BHASHINI_USER_ID,
 * BHASHINI_API_KEY) and never inside the APK, where anyone could pull them
 * out. Until both are set, GET reports `ready: false` and the app simply does
 * not offer translation.
 *
 * Bhashini works in two steps: ask the pipeline config which model serves a
 * language pair (and get a short-lived inference key), then call that model.
 * The config is cached per pair for an hour.
 */

export const dynamic = 'force-dynamic';

const LANGS = new Set(['en', 'hi', 'bn', 'mr', 'te', 'ta', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'ur']);
const CONFIG_URL = 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline';
/** MeitY's public pipeline for translation. */
const PIPELINE_ID = '64392f96daac500b55c543cd';

const MAX_ITEMS = 40;
const MAX_CHARS = 1200;
const MAX_TOTAL = 12000;

type Endpoint = { url: string; header: string; key: string; serviceId: string; at: number };
const cache = new Map<string, Endpoint>();

function creds() {
  const userId = process.env.BHASHINI_USER_ID;
  const apiKey = process.env.BHASHINI_API_KEY;
  return userId && apiKey ? { userId, apiKey } : null;
}

async function endpoint(source: string, target: string): Promise<Endpoint> {
  const pair = `${source}>${target}`;
  const hit = cache.get(pair);
  if (hit && Date.now() - hit.at < 3_600_000) return hit;

  const c = creds()!;
  const res = await fetch(CONFIG_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', userID: c.userId, ulcaApiKey: c.apiKey },
    body: JSON.stringify({
      pipelineTasks: [{ taskType: 'translation', config: { language: { sourceLanguage: source, targetLanguage: target } } }],
      pipelineRequestConfig: { pipelineId: PIPELINE_ID },
    }),
  });
  if (!res.ok) throw new Error(`config ${res.status}`);
  const j = await res.json();
  const ep = j?.pipelineInferenceAPIEndPoint;
  const serviceId = j?.pipelineResponseConfig?.[0]?.config?.[0]?.serviceId;
  if (!ep?.callbackUrl || !ep?.inferenceApiKey?.value || !serviceId) throw new Error('config shape');

  const out = {
    url: ep.callbackUrl,
    header: ep.inferenceApiKey.name || 'Authorization',
    key: ep.inferenceApiKey.value,
    serviceId,
    at: Date.now(),
  };
  cache.set(pair, out);
  return out;
}

async function translate(texts: string[], source: string, target: string): Promise<string[]> {
  const ep = await endpoint(source, target);
  const res = await fetch(ep.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', [ep.header]: ep.key },
    body: JSON.stringify({
      pipelineTasks: [
        { taskType: 'translation', config: { language: { sourceLanguage: source, targetLanguage: target }, serviceId: ep.serviceId } },
      ],
      inputData: { input: texts.map((source) => ({ source })) },
    }),
  });
  if (!res.ok) {
    // A stale inference key is the usual cause; drop it so the next call refetches.
    cache.delete(`${source}>${target}`);
    throw new Error(`compute ${res.status}`);
  }
  const j = await res.json();
  const output: { target?: string }[] = j?.pipelineResponse?.[0]?.output ?? [];
  if (output.length !== texts.length) throw new Error('compute shape');
  return output.map((o, i) => o.target ?? texts[i]);
}

export async function GET() {
  return Response.json({ ready: creds() !== null });
}

export async function POST(req: Request) {
  if (!creds()) return Response.json({ error: 'not configured' }, { status: 503 });

  let body: { texts?: unknown; source?: unknown; target?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad json' }, { status: 400 });
  }
  const { texts, source, target } = body;
  if (
    !Array.isArray(texts) ||
    texts.length === 0 ||
    texts.length > MAX_ITEMS ||
    !texts.every((t) => typeof t === 'string' && t.length > 0 && t.length <= MAX_CHARS) ||
    (texts as string[]).reduce((n, t) => n + t.length, 0) > MAX_TOTAL ||
    typeof source !== 'string' ||
    typeof target !== 'string' ||
    !LANGS.has(source) ||
    !LANGS.has(target)
  ) {
    return Response.json({ error: 'bad request' }, { status: 400 });
  }
  if (source === target) return Response.json({ translations: texts });

  try {
    return Response.json({ translations: await translate(texts as string[], source, target) });
  } catch (e) {
    return Response.json({ error: 'translation failed', detail: String(e) }, { status: 502 });
  }
}
