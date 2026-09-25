/**
 * Site copy in English, Hindi and Tamil.
 *
 * The app ships all three at full parity, so a site that only speaks English
 * would be claiming less than the product delivers. Terminology is taken from
 * the app's own locale files rather than re-invented — खेत / வயல் for field,
 * फ़सल / பயிர் for crop, सिंचाई / நீர்ப்பாசனம் for irrigation — so somebody
 * who reads the site in Tamil and then opens the app sees the same words.
 *
 * Every string is short on purpose. Short copy is easier to understand, and it
 * is also the only way three languages stay accurate and maintained.
 */

export type Lang = 'en' | 'hi' | 'ta';

type Step = { n: string; title: string; text: string };
/** `body` may contain **bold** markers; see lib/rich.tsx. */
type Point = { title: string; body: string };
type Item = { name: string; text: string };

export type Dict = {
  nav: { how: string; trust: string; watch: string; get: string; lang: string };
  hero: { headline: string; what: string; cta: string; alt: string };
  how: { label: string; title: string; steps: Step[] };
  find: { label: string; title: string; text: string; points: Point[]; caption: string; panel: string };
  trust: { label: string; title: string; text: string; points: Point[]; caption: string; panel: string };
  watch: { label: string; title: string; items: Item[] };
  save: {
    label: string;
    title: string;
    text: string;
    perAcre: string;
    usual: string;
    withApp: string;
    yourField: string;
    acres: string;
    saved: string;
    subscription: string;
    net: string;
    note: string;
    rows: string[];
  };
  get: { label: string; title: string; text: string; cta: string; unavailable: string };
  footer: { tagline: string; sources: string; built: string; rights: string };
  demo: { drag: string; reset: string; threshold: string; low: string; high: string; sent: string; held: string; bad: string; sure: string };
};
