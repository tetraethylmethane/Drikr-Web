import type { Dict } from './types';

const en: Dict = {
  nav: { how: 'How it works', trust: 'Why trust it', watch: 'What it watches', get: 'Get the app', lang: 'Language' },
  hero: {
    headline: 'Trouble starts in one corner of the field.',
    what: 'Drikr is a crop-monitoring app for small farms. A few sensors in the soil, the working-out done on your phone, and a clear answer about which part of the field needs treating.',
    cta: 'Get the Android app',
    alt: 'See how it works',
  },
  how: {
    label: 'How it works',
    title: 'Five steps, start to finish',
    steps: [
      { n: '01', title: 'The field reports in', text: 'Small solar-powered boxes measure the soil and the air every five minutes.' },
      { n: '02', title: 'Your phone collects it', text: 'Walk past the base station and the readings hop across. No SIM card, no monthly bill.' },
      { n: '03', title: 'Your phone works it out', text: 'It turns a few readings into a picture of the whole field. No signal needed.' },
      { n: '04', title: 'You get told', text: 'But only when there is enough evidence behind it. Weak warnings are held back.' },
      { n: '05', title: 'A drone treats the patch', text: 'It sprays only the affected squares, and only after you confirm.' },
    ],
  },
  find: {
    label: 'Finding the problem',
    title: 'Which corner — not just whether',
    text: 'You cannot put a sensor on every plant. The app fills in the ground between four of them, so treatment follows **the patch, not the whole field**.',
    points: [
      {
        title: 'Put four sensors in the field',
        body: 'Spread out, **not clustered**. Trouble arrives as a patch — a low corner that holds water, or the windward edge insects reach first.',
      },
      {
        title: 'The app fills in the gaps',
        body: 'It scores **every square** of ground between them, and stops at the field boundary rather than guessing past it.',
      },
      {
        title: 'Only the bad squares get treated',
        body: 'On this field that is **fourteen per cent**. The other eighty-six are left alone, and that is where the money is saved.',
      },
    ],
    caption: 'Drag a sensor, or tab to one and use the arrow keys. Every square re-scores.',
    panel: 'field health map',
  },
  trust: {
    label: 'Why trust it',
    title: 'It says when it is not sure',
    text: 'Two numbers, kept apart: how bad it looks, and how much evidence is behind it. A big number on thin evidence is **held back** — and shown to you as held back.',
    points: [
      {
        title: 'Two numbers, never merged',
        body: '**How bad** it looks and **how sure** it is stay apart. An old reading lowers the confidence without touching the score.',
      },
      {
        title: 'You set the bar',
        body: 'The setting lives in your profile. **Low**, and you hear everything including some false alarms. **High**, and you only hear what the sensors are sure of.',
      },
      {
        title: 'Nothing is hidden, only held',
        body: 'Anything held back is **shown to you as held back**, so a quiet app is never mistaken for a healthy field.',
      },
    ],
    caption: 'Drag the threshold. The highest-scoring risk is the first to be dropped.',
    panel: 'alerts',
  },
  watch: {
    label: 'What it watches',
    title: 'Five things, scored separately',
    items: [
      { name: 'Pest', text: 'Insects feeding on the crop. The sensors pick up the damage before you can see it.' },
      { name: 'Irrigation', text: 'Whether the soil holds enough water for this crop, at this stage of its life.' },
      { name: 'Nutrient', text: 'Whether the soil still has the feed the crop needs right now.' },
      { name: 'Climate risk', text: 'Heat, cold, wind or rain coming that could hurt the crop.' },
      { name: 'Crop health', text: 'The overall picture, put together from the other four.' },
    ],
  },
  save: {
    label: 'What it saves',
    title: 'Treat a seventh of the field, not all of it',
    text: 'The saving comes from one thing: knowing where the problem is.',
    perAcre: 'Cost per acre, per season',
    usual: 'Usual',
    withApp: 'With Drikr',
    yourField: 'Your field',
    acres: 'acres',
    saved: 'Saved per year',
    subscription: 'Subscription',
    net: 'Left in your pocket',
    note: 'Below about **1.7 acres** the subscription costs more than it saves. We have not hidden that — drag the slider and watch it go negative.',
    rows: ['Spraying', 'Water', 'Labour', 'Other inputs'],
  },
  get: {
    label: 'Get the app',
    title: 'Put it on your phone',
    text: 'Android, free, and it works offline once installed.',
    cta: 'Download for Android',
    unavailable: 'The Android build has not been published here yet.',
  },
  footer: {
    tagline: 'Measure first, then act.',
    sources: 'Weather from Open-Meteo. Prices from data.gov.in. Disease guidance from TNAU and PAU.',
    built: 'Built for Smart India Hackathon 2026',
    rights: 'Readings shown here are simulated, and the app says so too.',
  },
  demo: {
    drag: 'Drag a station',
    reset: 'Reset',
    threshold: 'Confidence threshold',
    low: 'Tell me everything',
    high: 'Only when certain',
    sent: 'Sent',
    held: 'Held back',
    bad: 'Bad',
    sure: 'Sure',
  },
};

export default en;
