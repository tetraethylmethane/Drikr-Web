'use client';

import DarkPlate from '@/components/DarkPlate';
import { APK } from '@/lib/site';

/**
 * The closing call to action, over a media block.
 *
 * Still driven by APK.url — null renders the honest "not published" state
 * rather than a button that 404s.
 */
export default function SignOff() {
  const ready = APK.url !== null;

  return (
    <section id="download" className="bg-background px-[20px] pb-0">
      <div className="mx-auto max-w-[1200px]">
        <DarkPlate
          image="field-aerial"
          className="flex h-[400px] w-full items-center justify-center rounded-media md:h-[500px]"
          innerClassName="w-full"
        >
          <div className="mx-6 flex flex-col items-center px-8 py-12 text-center">
            <span className="label mb-6 text-inverse-on-surface/70">Get the app</span>
            <h2 className="max-w-2xl text-4xl leading-tight font-light text-on-primary md:text-5xl">
              {ready ? 'Put it on your phone.' : 'The build is not published here yet.'}
            </h2>

            {ready ? (
              <>
                <a
                  href={APK.url!}
                  download
                  className="mt-8 rounded-[100px] bg-surface-container-lowest px-6 py-2.5 text-xs font-medium tracking-wide text-primary transition-opacity duration-300 hover:opacity-80"
                >
                  Download for Android
                </a>
                <p className="mt-5 text-[11px] text-inverse-on-surface/60">
                  Version {APK.version}
                  {APK.sizeMb ? ` · ${APK.sizeMb} MB` : ''} · Android {APK.minAndroid} and above
                </p>
              </>
            ) : (
              // No fallback link. The old one pointed at the repository, and a
              // page that cannot offer a build should say so rather than hand
              // over the source instead.
              <p className="mt-8 max-w-[44ch] text-[13px] leading-relaxed text-inverse-on-surface/70">
                The signed Android build has not been published here yet. Everything described
                on this page is built and running.
              </p>
            )}
          </div>
        </DarkPlate>
      </div>
    </section>
  );
}
