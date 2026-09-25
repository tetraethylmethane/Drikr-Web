'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Dict } from './types';
import en from './en';
import { LANGS, isLang, type Lang } from './langs';

export type { Dict } from './types';
export { LANGS, type Lang } from './langs';

/**
 * Thirteen languages, loaded one at a time.
 *
 * Bundling every dictionary would put roughly a hundred kilobytes of Indic
 * text into the first load so that twelve-thirteenths of it could go unread.
 * English ships with the page because the server renders in it; every other
 * language is a dynamic import fetched when somebody asks for it, which is a
 * single small chunk over a connection they are already using.
 *
 * The map has to be written out rather than built from a template string —
 * a bundler cannot split what it cannot see statically.
 */
const LOADERS: Record<Lang, () => Promise<{ default: Dict }>> = {
  en: async () => ({ default: en }),
  hi: () => import('./hi'),
  bn: () => import('./bn'),
  mr: () => import('./mr'),
  te: () => import('./te'),
  ta: () => import('./ta'),
  gu: () => import('./gu'),
  kn: () => import('./kn'),
  ml: () => import('./ml'),
  or: () => import('./or'),
  pa: () => import('./pa'),
  as: () => import('./as'),
  ur: () => import('./ur'),
};

const STORAGE_KEY = 'drikr-lang';

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  loading: boolean;
}>({ lang: 'en', setLang: () => {}, t: en, loading: false });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [t, setT] = useState<Dict>(en);
  const [loading, setLoading] = useState(false);

  const load = async (l: Lang) => {
    if (l === 'en') {
      setT(en);
      setLangState('en');
      return;
    }
    setLoading(true);
    try {
      const mod = await LOADERS[l]();
      setT(mod.default);
      setLangState(l);
    } catch {
      // A chunk that will not load is not worth a broken page: stay where we
      // are, in a language that is already on screen.
    } finally {
      setLoading(false);
    }
  };

  // Read the saved choice on mount rather than during render — the server has
  // no localStorage, and reading it while rendering would make the first
  // client paint disagree with the HTML that was sent.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private mode, or storage blocked */
    }
    const guess = navigator.language.split('-')[0];
    const pick = saved && isLang(saved) ? saved : isLang(guess) ? guess : 'en';
    if (pick !== 'en') void load(pick);
  }, []);

  // Keep the document in step, so screen readers switch voice, the browser
  // offers the right dictionary, and Urdu lays out right-to-left.
  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = meta?.rtl ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* the choice just will not survive a reload */
    }
    void load(l);
  };

  return <Ctx.Provider value={{ lang, setLang, t, loading }}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
