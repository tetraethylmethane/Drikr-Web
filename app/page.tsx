'use client';

import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import How from '@/components/sections/How';
import Feature from '@/components/sections/Feature';
import Treat from '@/components/sections/Treat';
import Service from '@/components/sections/Service';
import System from '@/components/sections/System';
import Watches from '@/components/sections/Watches';
import Impact from '@/components/sections/Impact';
import Proof from '@/components/sections/Proof';
import Question from '@/components/sections/Question';
import Get from '@/components/sections/Get';
import MapPanel from '@/components/panels/MapPanel';
import GatePanel from '@/components/panels/GatePanel';
import { useT } from '@/lib/i18n';

/**
 * Read top to bottom the page answers, in order: what goes wrong in a field,
 * how Drikr is used, how it shows where the problem is, why to believe it,
 * what targeting saves, who flies the drone, what it is built from, what it
 * watches, why it matters, how it will be proved, and how to get it.
 */
export default function Page() {
  const { t } = useT();

  return (
    <>
      <Hero />
      <Problem />
      <How />

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

      <Treat />
      <Service />
      <System />
      <Watches />
      <Impact />
      <Proof />
      <Question />
      <Get />
    </>
  );
}
