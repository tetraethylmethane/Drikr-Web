'use client';

import { LINKS } from '@/lib/site';
import { Mark } from '@/components/Logo';

/**
 * The reference footer: one bordered, tinted 20px-radius panel holding a short
 * statement at the top and an oversized wordmark at the bottom.
 */
export default function Footer() {
  return (
    <footer className="mt-[10px] w-full bg-background px-[20px] pt-2 pb-[20px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative flex h-auto w-full flex-col justify-between rounded-media border border-outline-variant bg-surface-container-low p-[20px] md:h-[500px] md:p-[32px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="max-w-md">
              <h2 className="mb-4 text-3xl font-light text-primary md:text-4xl">
                Measure, then act.
              </h2>
              <p className="leading-relaxed font-light text-secondary">
                A field does not fail all at once. Four sensors, the reasoning on the
                farmer&rsquo;s own phone, and treatment that follows the affected patch rather
                than the boundary — with the app saying plainly when it is not sure enough to
                tell you anything.
              </p>
              <a
                href="#download"
                className="mt-6 inline-block rounded border-b border-primary/30 pb-0.5 text-sm text-primary transition-colors hover:border-primary"
              >
                Get the app
              </a>
            </div>

            <nav aria-label="Footer" className="flex gap-12 lg:gap-16">
              <div>
                <p className="label mb-4">The page</p>
                <ul className="space-y-2.5">
                  {[
                    ['Sensing', '#sensing'],
                    ['Judgement', '#judgement'],
                    ['Capabilities', '#capabilities'],
                    ['The evidence', '#proof'],
                    ['Get the app', '#download'],
                  ].map(([l, h]) => (
                    <li key={h}>
                      <a
                        href={h}
                        className="rounded text-sm font-light text-secondary transition-colors hover:text-primary"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden sm:block">
                <p className="label mb-4">Built for</p>
                <ul className="space-y-2.5 text-sm font-light text-secondary">
                  <li>Smart India Hackathon 2026</li>
                  <li>Problem statement {LINKS.problemStatement}</li>
                  <li>Team {LINKS.team}</li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="mt-16 flex w-full flex-col items-end justify-between gap-8 md:mt-0 md:flex-row">
            {/* The reference closes on an oversized wordmark. Ours closes on
                the mark itself, which carries the identity better at that size
                than eleven letters would. */}
            <div className="flex flex-col gap-5 text-primary/85">
              <Mark className="h-24 w-24 md:h-32 md:w-32" />
              <span className="text-lg font-semibold tracking-[-0.01em] uppercase md:text-2xl">
                Drikr Systems
                <sup className="ml-[0.15em] align-super text-[0.42em] font-medium">&trade;</sup>
              </span>
            </div>
            <div className="mb-2 flex flex-col items-end gap-2 text-right">
              <p className="text-xs font-light text-secondary">
                Weather from Open-Meteo. Mandi prices from data.gov.in.
              </p>
              <p className="text-xs font-light text-secondary">
                Disease guidance from TNAU and PAU, with estimates marked as estimates.
              </p>
              <p className="text-xs font-light text-secondary">
                © {new Date().getFullYear()} Team Drikr. Readings shown here are simulated, and
                the app says so too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
