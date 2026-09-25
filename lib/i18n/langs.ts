export type Lang =
  | 'en'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'or'
  | 'pa'
  | 'as'
  | 'ur';

/**
 * The languages Indian farmers actually work in, by the size of the farming
 * population that speaks them.
 *
 * This is not the full Eighth Schedule. Sanskrit has no farmers, and the rest
 * of the twenty-two — Bodo, Dogri, Kashmiri, Konkani, Manipuri, Nepali,
 * Santali, Sindhi, Maithili — are real languages with real speakers but a
 * translation nobody on the team can check is a liability rather than a
 * feature. Each is one file in this folder plus one row here whenever somebody
 * who speaks it can write and review it.
 *
 * `short` is what the switcher shows, `name` is the endonym — the one label a
 * speaker of that language can always read, which is why no entry is labelled
 * in English.
 */
export const LANGS: {
  code: Lang;
  short: string;
  name: string;
  rtl?: boolean;
}[] = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'hi', short: 'हिं', name: 'हिन्दी' },
  { code: 'bn', short: 'বাং', name: 'বাংলা' },
  { code: 'mr', short: 'मरा', name: 'मराठी' },
  { code: 'te', short: 'తెలు', name: 'తెలుగు' },
  { code: 'ta', short: 'தமி', name: 'தமிழ்' },
  { code: 'gu', short: 'ગુજ', name: 'ગુજરાતી' },
  { code: 'kn', short: 'ಕನ್ನ', name: 'ಕನ್ನಡ' },
  { code: 'ml', short: 'മല', name: 'മലയാളം' },
  { code: 'or', short: 'ଓଡ଼ି', name: 'ଓଡ଼ିଆ' },
  { code: 'pa', short: 'ਪੰਜਾ', name: 'ਪੰਜਾਬੀ' },
  { code: 'as', short: 'অস', name: 'অসমীয়া' },
  { code: 'ur', short: 'اردو', name: 'اردو', rtl: true },
];

export const isLang = (v: string): v is Lang => LANGS.some((l) => l.code === v);
