'use client';

import Reveal from '@/components/ui/Reveal';

/**
 * The 2/5 label + 3/5 statement pairing from the reference, and the sources
 * marquee beneath it.
 *
 * The reference fills that marquee with publication mastheads — VOGUE, MONOCLE,
 * Kinfolk. Drikr has no customers, press or partners, and inventing a row of
 * them is the single most common lie on a landing page. The slot instead names
 * the bodies the app's data genuinely comes from, labelled as sources rather
 * than endorsements, because that is what they are.
 */
export default function Intro() {
  return (
    <>
      <section className="px-[20px] pt-8 pb-[80px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex items-start pt-3 lg:w-2/5">
              <span className="label whitespace-nowrap">The system</span>
            </div>
            <div className="lg:w-3/5">
              <Reveal>
                <p className="text-[28px] leading-tight font-light tracking-tight text-primary md:text-[36px]">
                  Four sensors in the soil, the reasoning running on the farmer&rsquo;s own
                  phone, and a drone sent to the affected patch instead of the whole field. It
                  works with no signal, and it tells you when it is not sure.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 w-full overflow-hidden bg-surface pt-[80px]">
        <p className="label mb-8 px-[20px] text-center">Built on published data</p>
        <div className="logo-track opacity-60" aria-hidden>
          {[0, 1].map((g) => (
            <div key={g} className="flex items-center gap-32 pr-32">
              <span className="text-xl font-semibold tracking-tight text-primary">TNAU</span>
              <span className="text-xl font-light tracking-widest text-primary">OPEN-METEO</span>
              <span className="text-xl font-medium text-primary italic">data.gov.in</span>
              <span className="text-xl font-semibold text-primary uppercase">PAU</span>
              <span className="text-xl tracking-wide text-primary">ICAR&ndash;IIWBR</span>
            </div>
          ))}
        </div>
        <p className="sr-only">
          Data sources: Tamil Nadu Agricultural University, Open-Meteo, data.gov.in, Punjab
          Agricultural University, and ICAR-IIWBR. These are sources the app reads from, not
          partners or endorsements.
        </p>
      </section>
    </>
  );
}
