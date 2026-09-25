import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Capability, { PanelHeader } from '@/components/sections/Capability';
import Statement from '@/components/sections/Statement';
import Capabilities from '@/components/sections/Capabilities';
import Proof from '@/components/sections/Proof';
import SignOff from '@/components/sections/SignOff';
import MapPanel from '@/components/panels/MapPanel';
import GatePanel from '@/components/panels/GatePanel';

/**
 * Section rhythm is varied on purpose: 128px above the first capability, a
 * tighter 96px after the interstitial has already given the eye a rest, and
 * 128px again before the evidence. Identical spacing down a whole page is one
 * of the things that reads as assembled rather than composed.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Intro />

      <div id="sensing">
        <Capability
          eyebrow="How it senses"
          topPad="pt-[128px]"
          heading={
            <>
              Knowing which corner
              <br />
              has the problem
            </>
          }
          icon="grid_on"
          title="Sparse sensing"
          lead="You cannot put a sensor on every plant, so the app works out what is happening between the ones you have. The closer a station is to a spot, the more its reading counts for that spot — which is why the map and the alert can never contradict each other. They are one calculation, not two."
          items={[
            {
              title: 'Place four stations',
              body: 'Spread across the plot rather than clustered. Trouble arrives as a patch — a low corner that holds water, the windward edge the pests reach first.',
            },
            {
              title: 'Interpolate the ground between',
              body: 'Inverse-distance weighting turns four readings into a score for every cell of the field, clipped to the plot boundary.',
            },
            {
              title: 'Treat only what is flagged',
              body: 'On this field that is fourteen per cent. The other eighty-six are left alone, which is where the saving comes from.',
            },
          ]}
        >
          <PanelHeader name="field_health_map" />
          <MapPanel />
        </Capability>
      </div>

      <Statement>A confident guess is still a guess.</Statement>

      <div id="judgement">
        <Capability
          reverse
          eyebrow="How it decides"
          topPad="pt-[96px]"
          heading={
            <>
              Telling you when it
              <br />
              is not sure
            </>
          }
          icon="rule"
          title="Evidence gating"
          lead="Most farm apps hand you one number and hope you trust it. Drikr keeps two apart: how bad it looks, and how sure it is. A serious-looking problem with thin evidence behind it is held back — and you can see that it was held back. This matters because of how trust actually breaks: an app that cries wolf three times gets ignored the fourth."
          items={[
            {
              title: 'Score and confidence stay separate',
              body: 'One station reporting, a stale reading or an uncalibrated probe lowers confidence without touching the score.',
            },
            {
              title: 'The farmer sets the threshold',
              body: 'It lives in Profile. Set it low to hear about everything including false alarms, or high to hear only what the sensors are sure of.',
            },
            {
              title: 'Nothing is hidden, only held',
              body: 'Suppressed risks stay visible as suppressed, so a quiet app is never mistaken for a healthy field.',
            },
          ]}
        >
          <PanelHeader name="alert_engine" />
          <GatePanel />
        </Capability>
      </div>

      <div id="capabilities">
        <Capabilities />
      </div>

      <Proof />
      <SignOff />
    </>
  );
}
