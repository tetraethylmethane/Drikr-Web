'use client';

import { useState } from 'react';
import { ShieldCheck, Volume2, Square } from 'lucide-react';
import DarkPlate from '@/components/DarkPlate';
import { APK } from '@/lib/site';
import { useT } from '@/lib/i18n';

// Speech-synthesis voice tags for each site language.
const VOICE: Record<string, string> = {
  en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', te: 'te-IN', ta: 'ta-IN', gu: 'gu-IN',
  kn: 'kn-IN', ml: 'ml-IN', or: 'or-IN', pa: 'pa-IN', as: 'as-IN', ur: 'ur-IN',
};

export default function Get() {
  const { t, lang } = useT();
  const ready = APK.url !== null;
  const [speaking, setSpeaking] = useState(false);

  // Read the install steps aloud, for a farmer who would rather listen.
  const listen = () => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
    if (!synth) return;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(
      [t.get.installTitle, ...t.get.steps.map((s, i) => `${i + 1}. ${s}`), t.get.warn, t.get.safe].join(' '),
    );
    u.lang = VOICE[lang] ?? 'en-IN';
    u.rate = 0.9;
    u.onend = u.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(u);
    setSpeaking(true);
  };

  return (
    <section id="get" className="bg-background px-[20px] pb-0">
      <div className="mx-auto max-w-[1200px]">
        <DarkPlate
          image="field-aerial"
          className="flex h-[380px] w-full items-center justify-center rounded-media md:h-[440px]"
          innerClassName="w-full"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center px-8 text-center">
            <span className="label mb-5 text-inverse-on-surface/70">{t.get.label}</span>
            <h2 className="text-4xl leading-tight font-bold text-balance text-on-primary md:text-5xl">
              {ready ? t.get.title : t.get.unavailable}
            </h2>

            {ready && (
              <>
                <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-inverse-on-surface/85">
                  {t.get.text}
                </p>
                <a
                  href={APK.url!}
                  download
                  className="mt-8 rounded-[100px] bg-surface-container-lowest px-6 py-2.5 text-xs font-medium tracking-wide text-primary transition-opacity duration-300 hover:opacity-80"
                >
                  {t.get.cta}
                </a>
                <p className="mt-4 text-[11px] text-inverse-on-surface/60">
                  v{APK.version}
                  {APK.sizeMb ? ` · ${APK.sizeMb} MB` : ''} · Android {APK.minAndroid}+
                </p>
              </>
            )}
          </div>
        </DarkPlate>

        {ready && (
          <div className="mx-auto mt-10 max-w-2xl rounded-media border border-outline-variant bg-surface-container-lowest p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[22px] leading-tight font-bold text-primary">{t.get.installTitle}</h3>
              <button
                onClick={listen}
                className="flex shrink-0 items-center gap-2 rounded-[100px] bg-primary px-4 py-2 text-[14px] font-medium text-on-primary"
              >
                {speaking ? <Square className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
                {t.get.listen}
              </button>
            </div>
            <ol className="mt-6 space-y-4">
              {t.get.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-on-primary">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-[17px] leading-snug text-primary">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-lg bg-surface-container px-4 py-3 text-[15px] leading-snug text-primary">
              {t.get.warn}
            </p>
            <p className="mt-4 flex items-center gap-2 text-[14px] text-secondary">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              {t.get.safe}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
