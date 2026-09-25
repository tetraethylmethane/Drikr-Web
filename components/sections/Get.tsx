'use client';

import DarkPlate from '@/components/DarkPlate';
import { APK } from '@/lib/site';
import { useT } from '@/lib/i18n';

export default function Get() {
  const { t } = useT();
  const ready = APK.url !== null;

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
            <h2 className="text-4xl leading-tight font-light text-balance text-on-primary md:text-5xl">
              {ready ? t.get.title : t.get.unavailable}
            </h2>

            {ready && (
              <>
                <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed font-light text-inverse-on-surface/85">
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
      </div>
    </section>
  );
}
