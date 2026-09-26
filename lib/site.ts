/**
 * Every claim the site makes, in one file.
 *
 * The app itself refuses to state things it cannot back up — a metric with no sensor
 * renders "No sensor" rather than 0, a photo the model cannot read is "could not
 * identify" rather than "healthy". A marketing site that overstated the same product
 * would undo that, so the numbers here are traceable to the repo and the ones that are
 * estimates are labelled as estimates in the UI.
 */

/* ------------------------------------------------------------------ download ---- */

/**
 * Where the Android build lives.
 *
 * `null` means no build has been published yet, and the download section says exactly
 * that instead of rendering a button that 404s. Set it to `/drikr.apk` once the file
 * is in web/public/, or to a GitHub Release / EAS URL if the APK is large enough that
 * you would rather not push a binary through the Vercel deploy.
 */
export const APK: {
  url: string | null;
  version: string;
  sizeMb: number | null;
  minAndroid: string;
  builtAt: string | null;
} = {
  // Served from Vercel Blob, not from public/ and not from an EAS artifact URL.
  //
  // Three constraints picked this. The APK is 102 MB, past Vercel's 100 MB limit
  // for a deployed file, so it cannot ride along with the site any more. An EAS
  // artifact link expires after two weeks, and a download button that quietly
  // starts 404ing is the exact failure this project refuses to ship. A GitHub
  // Release would work but its URL names the repository, and this site
  // deliberately does not disclose where the source lives.
  //
  // Blob is the one option with none of those problems: same Vercel account, no
  // size limit, no expiry, nothing about the repo in the URL. Re-upload with
  //   vercel blob put <apk> --pathname drikr.apk --access public --allow-overwrite --multipart
  url: 'https://xbogiiv12itasct0.public.blob.vercel-storage.com/drikr.apk',
  version: '1.0.0',
  sizeMb: 102,
  minAndroid: '7.0 (API 24)',
  builtAt: '26 September 2026',
};

/**
 * The repository URL is deliberately absent.
 *
 * The site does not link to the source and does not name where it lives — this
 * is competition work, and a public page is the wrong place to hand over the
 * code. Do not reintroduce a `github` field here: if it exists, something will
 * eventually render it.
 */
export const LINKS = {
  problemStatement: '26180',
  team: 'H043',
};

/* ------------------------------------------------------------------- content ---- */

export const PIPELINE = [
  {
    id: 'sense',
    step: '01',
    title: 'The field reports in',
    plain:
      'Small solar-powered boxes sit in the field. Every five minutes each one wakes up, measures the air and the soil around it, and radios the numbers to a base station at the edge of the farm.',
    detail:
      'ESP32 slave nodes with BME280/680, BH1750 and ADS1115 probes, over LoRa at 433 MHz. They sleep between readings, which is what makes one 18650 cell last a season.',
    metrics: ['Air temperature', 'Humidity', 'Light', 'VOC', 'Soil moisture', 'Soil pH'],
  },
  {
    id: 'carry',
    step: '02',
    title: 'Your phone carries the data',
    plain:
      'The base station has no SIM card and no monthly bill. It just remembers. When you walk past it with your phone, the readings hop across, and they upload the next time your phone has signal.',
    detail:
      'A cursor-based, resumable courier. Nothing is lost if either half is missing — the Master buffers 240 readings and the phone drains the queue when it can.',
    metrics: ['No SIM', 'No subscription', 'Works offline', 'Resumable'],
  },
  {
    id: 'score',
    step: '03',
    title: 'The phone works out what is wrong',
    plain:
      'All the thinking happens on your phone, not on a server somewhere. It turns a handful of readings into a picture of the whole field, and scores five different things that could be going wrong.',
    detail:
      'Inverse-distance interpolation spreads four sparse nodes across a grid, then a pure-function decision engine scores each cell. No network call, so it works with no signal at all.',
    metrics: ['Crop health', 'Pest', 'Nutrient', 'Irrigation', 'Climate risk'],
  },
  {
    id: 'alert',
    step: '04',
    title: 'You get told — but only if it is worth telling',
    plain:
      'A warning only reaches you when there is enough evidence behind it. If just one sensor is reporting, or the reading is hours old, the app holds the alert back and shows you that it did.',
    detail:
      'A confidence gate, a per-severity cooldown and a dedupe pass. Severity escalation is the only thing that bypasses the cooldown. Held-back risks stay visible as suppressedRisks.',
    metrics: ['Confidence gate', 'Cooldown', 'Dedupe', 'Nothing hidden'],
  },
  {
    id: 'act',
    step: '05',
    title: 'A drone sprays only the bad patches',
    plain:
      'Because the app knows which parts of the field are affected, it can plan a flight over just those parts. You look at the plan, and nothing takes off until you say yes.',
    detail:
      'Grid cells become GPS waypoints through a two-anchor similarity transform. Missions are always proposed first; confirmation is the authorisation.',
    metrics: ['Targeted', 'You confirm', 'Weather-checked', 'Abort always live'],
  },
] as const;

export const DOMAINS = [
  {
    key: 'cropHealth',
    label: 'Crop Health',
    plain: 'How the crop is doing overall, pulled together from everything else.',
    icon: 'sprout',
  },
  {
    key: 'pest',
    label: 'Pest',
    plain:
      'Insects feeding on the crop. Chewed leaves give off a chemical signature, and the sensors can smell it before you can see the damage.',
    icon: 'bug',
  },
  {
    key: 'nutrient',
    label: 'Nutrient',
    plain: 'Whether the soil still has the nitrogen, phosphorus and potassium the crop needs at this point in its life.',
    icon: 'flask',
  },
  {
    key: 'irrigation',
    label: 'Irrigation',
    plain: 'Whether there is enough water in the soil — measured against what this crop needs at this exact growth stage, not a fixed number.',
    icon: 'droplets',
  },
  {
    key: 'climate',
    label: 'Climate Risk',
    plain: 'Heat, cold, wind or rain in the forecast that could hurt the crop in the next few days.',
    icon: 'cloud',
  },
] as const;

/** From src/config/agronomy.ts — COST_MODEL, rupees per acre per season. */
export const COST_MODEL = {
  conventional: { spray: 1150, water: 480, labour: 400, other: 900 },
  withDrikr: { spray: 500, water: 60, labour: 75, other: 900 },
  subscriptionPerMonth: 399,
  droneServicePerAcre: 500,
};

export const COST_ROWS = [
  { label: 'Spraying', key: 'spray', plain: 'Less chemical, because only the affected patches get sprayed.' },
  { label: 'Water', key: 'water', plain: 'Water goes where the soil is actually dry.' },
  { label: 'Labour', key: 'labour', plain: 'No walking the whole field to find the problem.' },
  { label: 'Other inputs', key: 'other', plain: 'Seed, fertiliser and the rest — unchanged.' },
] as const;

export const CROPS = [
  { key: 'rice', label: 'Rice', aliases: ['paddy', 'dhan', 'chawal', 'nel', 'arisi'] },
  { key: 'wheat', label: 'Wheat', aliases: ['gehu', 'gehun', 'godhumai'] },
  { key: 'maize', label: 'Maize', aliases: ['makka', 'makai', 'corn', 'bhutta', 'cholam'] },
  { key: 'cotton', label: 'Cotton', aliases: ['kapas', 'narma', 'paruthi'] },
  { key: 'tomato', label: 'Tomato', aliases: ['tamatar', 'thakkali', 'takkali'] },
  { key: 'sugarcane', label: 'Sugarcane', aliases: ['ganna', 'ikshu', 'karumbu', 'cane'] },
  { key: 'groundnut', label: 'Groundnut', aliases: ['moongphali', 'peanut', 'verkadalai', 'singdana'] },
] as const;

/** Disease-window provenance, from src/config/agronomy.ts. 21 windows in total. */
export const PROVENANCE = { tnau: 14, pau: 1, estimated: 6, total: 21 };

export const DRONE_LINKS = [
  {
    aircraft: 'Dynalog DR-DG600C',
    link: 'manual',
    status: 'working',
    plain:
      'Works today. It is a 249-gram camera drone with locked-down software, so the app writes the waypoints out and the farmer types them into the maker’s own app.',
  },
  {
    aircraft: 'turbodrone bridge',
    link: 'lwPro',
    status: 'working',
    plain:
      'A laptop joined to the drone’s own WiFi speaks the protocol for us. Set one URL and the app can upload a route, start it and abort it.',
  },
  {
    aircraft: 'ArduPilot / Pixhawk',
    link: 'mavlink',
    status: 'not built',
    plain: 'The fallback that is certain to work on a proper agricultural drone. Not written yet.',
  },
] as const;

/** Things the app deliberately does not do. Stated on the site because they are the point. */
export const LIMITS = [
  {
    title: 'The 249 g drone cannot spray',
    plain:
      'It weighs 249 grams in total. There is no tank on it. Spray missions are planned and costed correctly, but flying one needs a real agricultural drone.',
  },
  {
    title: 'Readings are simulated until you connect hardware',
    plain:
      'With no sensor box wired up, the app runs a physics-flavoured simulator — and says so, on the home screen, on the sensor page and in your profile. It never pretends a simulated number is a measurement.',
  },
  {
    title: 'A photo can be refused',
    plain:
      'Point the camera at soil, or take a blurry shot, and the answer is "could not identify". That is a real answer. It will never guess "healthy" to fill the space.',
  },
  {
    title: 'Six of 21 disease windows are still estimates',
    plain:
      'Fourteen came from TNAU’s own published guidance and one from PAU. The remaining six are informed guesses, and the app labels them as guesses when it shows them to you.',
  },
  {
    title: 'A field with no sensors gets no score',
    plain:
      'If nothing is measuring your field, no screen will show you a risk percentage for it. You get a scouting calendar instead — a reason to go and look, which is a different and honest claim.',
  },
] as const;

export const STATS = [
  { value: '5', label: 'risk domains scored', sub: 'each carrying its own evidence' },
  { value: '3', label: 'languages, full parity', sub: 'English, Hindi, Tamil — with speech' },
  { value: '0', label: 'network calls to score a field', sub: 'the engine runs on your phone' },
  { value: '14/21', label: 'disease windows sourced', sub: 'from TNAU published guidance' },
];
