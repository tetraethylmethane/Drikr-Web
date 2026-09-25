'use client';

import { Mark } from '@/components/Logo';
import LangSwitch from '@/components/LangSwitch';
import { LINKS } from '@/lib/site';
import { useT } from '@/lib/i18n';

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="mt-[10px] w-full bg-background px-[20px] pt-2 pb-[20px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex w-full flex-col justify-between gap-12 rounded-media border border-outline-variant bg-surface-container-low p-[24px] md:min-h-[380px] md:p-[32px]">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <h2 className="mb-3 text-3xl font-light text-primary">{t.footer.tagline}</h2>
              <p className="text-[15px] leading-relaxed font-light text-secondary">
                {t.footer.sources}
              </p>
            </div>
            <LangSwitch />
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-4 text-primary/85">
              <Mark className="h-16 w-16 md:h-24 md:w-24" />
              <span className="text-base font-semibold tracking-[-0.01em] uppercase md:text-xl">
                Drikr Systems
                <sup className="ml-[0.15em] align-super text-[0.42em] font-medium">&trade;</sup>
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-left text-[12px] font-light text-secondary sm:text-right">
              <p>
                {t.footer.built} · PS {LINKS.problemStatement} · {LINKS.team}
              </p>
              <p className="max-w-[46ch]">{t.footer.rights}</p>
              <p>© {new Date().getFullYear()} Drikr Systems</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
