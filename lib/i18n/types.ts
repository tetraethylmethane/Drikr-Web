/**
 * Site copy in 13 Indian languages.
 *
 * The app ships all 13 at full parity, so a site that only speaks English
 * would be claiming less than the product delivers. Terminology is taken from
 * the app's own locale files rather than re-invented — खेत / வயல் for field,
 * फ़सल / பயிர் for crop, सिंचाई / நீர்ப்பாசனம் for irrigation — so somebody
 * who reads the site in Tamil and then opens the app sees the same words.
 *
 * Every string is short on purpose. Short copy is easier to understand, and it
 * is also the only way thirteen languages stay accurate and maintained.
 */

type Step = { n: string; title: string; text: string };
/** `body` may contain **bold** markers; see lib/rich.tsx. */
type Point = { title: string; body: string };
type Item = { name: string; text: string };
type Figure = { value: string; label: string; sub: string };

export type Dict = {
  nav: {
    how: string;
    map: string;
    service: string;
    system: string;
    proof: string;
    get: string;
    lang: string;
    /** The first-visit language prompt. */
    langTitle: string;
    langKeep: string;
  };
  hero: { headline: string; what: string; cta: string; alt: string };
  problem: {
    label: string;
    title: string;
    text: string;
    causes: Item[];
    exampleTitle: string;
    example: string;
    sprayed: string;
    affected: string;
    acres: string;
  };
  how: { label: string; title: string; tabs: [string, string]; drone: Step[]; sensor: Step[] };
  find: {
    label: string;
    title: string;
    text: string;
    points: Point[];
    caption: string;
    panel: string;
    healthy: string;
    atRisk: string;
    problem: string;
    /** `{a}` is replaced with the affected acreage. */
    rec: string;
    recAction: string;
    recNone: string;
    field: string;
  };
  trust: { label: string; title: string; text: string; points: Point[]; caption: string; panel: string };
  watch: { label: string; title: string; items: Item[] };
  treat: {
    label: string;
    title: string;
    text: string;
    field: string;
    affected: string;
    acres: string;
    whole: string;
    targeted: string;
    sprayed: string;
    spray: string;
    scan: string;
    saved: string;
    less: string;
    note: string;
  };
  service: { label: string; title: string; text: string; steps: Item[]; figures: Figure[]; note: string };
  system: {
    label: string;
    title: string;
    hwTitle: string;
    swTitle: string;
    /** What flies today, so the hardware list is not read as the current drone. */
    today: string;
    hw: Item[];
    sw: Item[];
    built: string;
    flowTitle: string;
    flow: string[];
  };
  impact: { label: string; title: string; benefits: Item[]; groupsTitle: string; groups: Item[] };
  proof: { label: string; title: string; text: string; metrics: Item[]; feasTitle: string; feas: Item[] };
  question: { before: string; q1: string; after: string; q2: string };
  get: { label: string; title: string; text: string; cta: string; unavailable: string };
  footer: { tagline: string; sources: string; built: string; rights: string; privacy: string };
  demo: { drag: string; reset: string; threshold: string; low: string; high: string; sent: string; held: string; bad: string; sure: string };
};
