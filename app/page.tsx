'use client';

import Hero from '@/components/sections/Hero';
import Steps from '@/components/sections/Steps';
import Feature from '@/components/sections/Feature';
import Watches from '@/components/sections/Watches';
import Savings from '@/components/sections/Savings';
import Get from '@/components/sections/Get';
import MapPanel from '@/components/panels/MapPanel';
import GatePanel from '@/components/panels/GatePanel';
import { useT } from '@/lib/i18n';

/**
 * Six sections. Read top to bottom they answer, in order: what is it, how does
 * it work, how does it find the problem, why should I believe it, what does it
 * watch, what does it save, how do I get it.
 */
export default function Page() {
  const { t } = useT();

  return (
    <>
      <Hero />
      <Steps />

      <Feature
        id="find"
        label={t.find.label}
        title={t.find.title}
        text={t.find.text}
        points={t.find.points}
        caption={t.find.caption}
        panel={t.find.panel}
      >
        <MapPanel />
      </Feature>

      <Feature
        reverse
        id="trust"
        label={t.trust.label}
        title={t.trust.title}
        text={t.trust.text}
        points={t.trust.points}
        caption={t.trust.caption}
        panel={t.trust.panel}
      >
        <GatePanel />
      </Feature>

      <Watches />
      <Savings />
      <Get />
    </>
  );
}
