'use client';

import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Site copy in English, Hindi and Tamil.
 *
 * The app ships all three at full parity, so a site that only speaks English
 * would be claiming less than the product delivers. Terminology is taken from
 * the app's own locale files rather than re-invented — खेत / வயல் for field,
 * फ़सल / பயிர் for crop, सिंचाई / நீர்ப்பாசனம் for irrigation — so somebody
 * who reads the site in Tamil and then opens the app sees the same words.
 *
 * Every string is short on purpose. Short copy is easier to understand, and it
 * is also the only way three languages stay accurate and maintained.
 */

export type Lang = 'en' | 'hi' | 'ta';

export const LANGS: { code: Lang; label: string; full: string }[] = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हिं', full: 'हिन्दी' },
  { code: 'ta', label: 'தமி', full: 'தமிழ்' },
];

type Step = { n: string; title: string; text: string };
/** `body` may contain **bold** markers; see lib/rich.tsx. */
type Point = { title: string; body: string };
type Item = { name: string; text: string };

export type Dict = {
  nav: { how: string; trust: string; watch: string; get: string; lang: string };
  hero: { headline: string; what: string; cta: string; alt: string };
  how: { label: string; title: string; steps: Step[] };
  find: { label: string; title: string; text: string; points: Point[]; caption: string; panel: string };
  trust: { label: string; title: string; text: string; points: Point[]; caption: string; panel: string };
  watch: { label: string; title: string; items: Item[] };
  save: {
    label: string;
    title: string;
    text: string;
    perAcre: string;
    usual: string;
    withApp: string;
    yourField: string;
    acres: string;
    saved: string;
    subscription: string;
    net: string;
    note: string;
    rows: string[];
  };
  get: { label: string; title: string; text: string; cta: string; unavailable: string };
  footer: { tagline: string; sources: string; built: string; rights: string };
  demo: { drag: string; reset: string; threshold: string; low: string; high: string; sent: string; held: string; bad: string; sure: string };
};

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

const hi: Dict = {
  nav: { how: 'यह कैसे काम करता है', trust: 'भरोसा क्यों', watch: 'क्या देखता है', get: 'ऐप लें', lang: 'भाषा' },
  hero: {
    headline: 'परेशानी खेत के एक कोने से शुरू होती है।',
    what: 'ड्रिक्र छोटे खेतों के लिए फ़सल निगरानी ऐप है। मिट्टी में कुछ सेंसर, हिसाब आपके फ़ोन पर, और साफ़ जवाब कि खेत के किस हिस्से में दवा चाहिए।',
    cta: 'एंड्रॉइड ऐप लें',
    alt: 'कैसे काम करता है, देखें',
  },
  how: {
    label: 'यह कैसे काम करता है',
    title: 'शुरू से आख़िर तक, पाँच क़दम',
    steps: [
      { n: '०१', title: 'खेत ख़बर भेजता है', text: 'सौर ऊर्जा से चलने वाले छोटे डिब्बे हर पाँच मिनट में मिट्टी और हवा नापते हैं।' },
      { n: '०२', title: 'आपका फ़ोन उसे लेता है', text: 'बेस स्टेशन के पास से गुज़रिए और रीडिंग फ़ोन में आ जाती है। न सिम, न महीने का बिल।' },
      { n: '०३', title: 'फ़ोन हिसाब लगाता है', text: 'कुछ रीडिंग से पूरे खेत की तस्वीर बनती है। इसके लिए नेटवर्क की ज़रूरत नहीं।' },
      { n: '०४', title: 'आपको बताया जाता है', text: 'पर तभी, जब पीछे पर्याप्त सबूत हो। कमज़ोर चेतावनी रोक ली जाती है।' },
      { n: '०५', title: 'ड्रोन उसी हिस्से पर छिड़कता है', text: 'सिर्फ़ प्रभावित हिस्से पर, और वह भी आपकी मंज़ूरी के बाद।' },
    ],
  },
  find: {
    label: 'समस्या ढूँढना',
    title: 'कौन-सा कोना — सिर्फ़ यह नहीं कि कुछ ग़लत है',
    text: 'हर पौधे पर सेंसर नहीं लग सकता। ऐप चार सेंसरों के बीच की ज़मीन का अंदाज़ा लगाता है, ताकि दवा **पूरे खेत पर नहीं, सिर्फ़ ख़राब हिस्से पर** जाए।',
    points: [
      {
        title: 'खेत में चार सेंसर लगाइए',
        body: 'फैलाकर, **एक ही जगह नहीं**। परेशानी हमेशा एक हिस्से से शुरू होती है — नीचा कोना जहाँ पानी रुकता है, या वह किनारा जहाँ कीड़े पहले पहुँचते हैं।',
      },
      {
        title: 'ऐप बीच की ज़मीन का हिसाब लगाता है',
        body: 'उनके बीच के **हर ख़ाने** को गिनता है, और खेत की सीमा पर रुक जाता है — उससे आगे अंदाज़ा नहीं लगाता।',
      },
      {
        title: 'दवा सिर्फ़ ख़राब ख़ानों पर',
        body: 'इस खेत में यह **चौदह प्रतिशत** है। बाक़ी छियासी को छोड़ दिया जाता है, और बचत यहीं से आती है।',
      },
    ],
    caption: 'सेंसर को खींचें, या टैब करके तीर बटन दबाएँ। हर ख़ाना फिर से गिना जाता है।',
    panel: 'खेत का नक्शा',
  },
  trust: {
    label: 'भरोसा क्यों',
    title: 'जब यक़ीन न हो, यह बता देता है',
    text: 'दो अलग बातें: समस्या कितनी बड़ी दिखती है, और उसके पीछे कितना सबूत है। कम सबूत वाली बड़ी चेतावनी **रोक ली जाती है** — और आपको दिखाया जाता है कि रोकी गई।',
    points: [
      {
        title: 'दो नंबर, कभी एक नहीं',
        body: '**कितनी बड़ी** समस्या दिखती है और **कितना पक्का** है — दोनों अलग रहते हैं। पुरानी रीडिंग भरोसा घटाती है, पर नंबर नहीं बदलती।',
      },
      {
        title: 'सीमा आप तय करते हैं',
        body: 'यह सेटिंग आपकी प्रोफ़ाइल में है। **कम** रखिए तो सब कुछ पता चलेगा, कुछ ग़लत चेतावनियाँ भी। **ज़्यादा** रखिए तो सिर्फ़ वही, जिसका सेंसरों को पक्का यक़ीन है।',
      },
      {
        title: 'कुछ छिपता नहीं, सिर्फ़ रुकता है',
        body: 'जो चेतावनी रोकी गई, वह **रोकी गई के तौर पर आपको दिखाई जाती है** — ताकि चुप ऐप को कभी स्वस्थ खेत न समझा जाए।',
      },
    ],
    caption: 'सीमा को खींचें। सबसे बड़ा दिखने वाला ख़तरा सबसे पहले हटता है।',
    panel: 'चेतावनी',
  },
  watch: {
    label: 'क्या देखता है',
    title: 'पाँच चीज़ें, अलग-अलग',
    items: [
      { name: 'कीट', text: 'फ़सल खाने वाले कीड़े। नुक़सान दिखने से पहले सेंसर उसे पकड़ लेते हैं।' },
      { name: 'सिंचाई', text: 'इस फ़सल को, इस समय, जितना पानी चाहिए — मिट्टी में उतना है या नहीं।' },
      { name: 'पोषक तत्व', text: 'फ़सल को अभी जो ख़ुराक चाहिए, वह मिट्टी में बची है या नहीं।' },
      { name: 'मौसम का ख़तरा', text: 'आने वाली गर्मी, ठंड, हवा या बारिश जो फ़सल को नुक़सान पहुँचा सकती है।' },
      { name: 'फ़सल स्वास्थ्य', text: 'बाक़ी चारों को जोड़कर बनी पूरी तस्वीर।' },
    ],
  },
  save: {
    label: 'कितनी बचत',
    title: 'पूरा खेत नहीं, सातवाँ हिस्सा',
    text: 'बचत एक ही बात से आती है — यह जानना कि समस्या कहाँ है।',
    perAcre: 'प्रति एकड़, प्रति मौसम लागत',
    usual: 'अभी',
    withApp: 'ड्रिक्र के साथ',
    yourField: 'आपका खेत',
    acres: 'एकड़',
    saved: 'साल भर की बचत',
    subscription: 'सदस्यता',
    net: 'आपकी जेब में बचा',
    note: 'क़रीब **१.७ एकड़** से कम पर सदस्यता बचत से ज़्यादा पड़ती है। हमने इसे छिपाया नहीं — स्लाइडर खींचकर देखिए।',
    rows: ['छिड़काव', 'पानी', 'मज़दूरी', 'अन्य लागत'],
  },
  get: {
    label: 'ऐप लें',
    title: 'इसे अपने फ़ोन में रखिए',
    text: 'एंड्रॉइड, मुफ़्त, और इंस्टॉल के बाद बिना नेटवर्क चलता है।',
    cta: 'एंड्रॉइड के लिए डाउनलोड',
    unavailable: 'एंड्रॉइड बिल्ड अभी यहाँ नहीं डाला गया है।',
  },
  footer: {
    tagline: 'पहले नापिए, फिर काम कीजिए।',
    sources: 'मौसम Open-Meteo से। भाव data.gov.in से। रोग जानकारी TNAU और PAU से।',
    built: 'स्मार्ट इंडिया हैकाथॉन २०२६ के लिए बनाया गया',
    rights: 'यहाँ दिखाई गई रीडिंग नक़ली हैं, और ऐप भी यही कहता है।',
  },
  demo: {
    drag: 'सेंसर खींचें',
    reset: 'फिर से',
    threshold: 'भरोसे की सीमा',
    low: 'सब कुछ बताइए',
    high: 'सिर्फ़ पक्का होने पर',
    sent: 'भेजा',
    held: 'रोका',
    bad: 'कितना',
    sure: 'कितना पक्का',
  },
};

const ta: Dict = {
  nav: { how: 'எப்படி வேலை செய்கிறது', trust: 'ஏன் நம்பலாம்', watch: 'எதைக் கவனிக்கிறது', get: 'செயலியைப் பெறுக', lang: 'மொழி' },
  hero: {
    headline: 'பிரச்சினை வயலின் ஒரு மூலையில் தொடங்குகிறது.',
    what: 'ட்ரிக்ர் என்பது சிறு பண்ணைகளுக்கான பயிர் கண்காணிப்பு செயலி. மண்ணில் சில சென்சார்கள், கணக்கு உங்கள் தொலைபேசியில், மற்றும் வயலின் எந்தப் பகுதிக்கு மருந்து தேவை என்பதற்கு தெளிவான பதில்.',
    cta: 'ஆண்ட்ராய்டு செயலியைப் பெறுக',
    alt: 'எப்படி வேலை செய்கிறது எனப் பார்க்க',
  },
  how: {
    label: 'எப்படி வேலை செய்கிறது',
    title: 'தொடக்கம் முதல் முடிவு வரை, ஐந்து படிகள்',
    steps: [
      { n: '௦௧', title: 'வயல் தகவல் அனுப்புகிறது', text: 'சூரிய மின்சாரத்தில் இயங்கும் சிறு பெட்டிகள் ஒவ்வொரு ஐந்து நிமிடமும் மண்ணையும் காற்றையும் அளக்கின்றன.' },
      { n: '௦௨', title: 'உங்கள் தொலைபேசி சேகரிக்கிறது', text: 'நிலையத்தைக் கடந்து செல்லும்போது அளவுகள் தொலைபேசிக்கு வந்துவிடும். சிம் இல்லை, மாதக் கட்டணமும் இல்லை.' },
      { n: '௦௩', title: 'தொலைபேசி கணக்கிடுகிறது', text: 'சில அளவுகளிலிருந்து முழு வயலின் படம் உருவாகிறது. இதற்கு இணைய இணைப்பு தேவையில்லை.' },
      { n: '௦௪', title: 'உங்களுக்குத் தெரிவிக்கப்படுகிறது', text: 'ஆனால் போதிய ஆதாரம் இருந்தால் மட்டுமே. பலவீனமான எச்சரிக்கைகள் தடுத்து வைக்கப்படுகின்றன.' },
      { n: '௦௫', title: 'ட்ரோன் அந்தப் பகுதிக்கு மருந்து தெளிக்கிறது', text: 'பாதிக்கப்பட்ட பகுதிக்கு மட்டும், அதுவும் நீங்கள் ஒப்புதல் அளித்த பிறகே.' },
    ],
  },
  find: {
    label: 'பிரச்சினையைக் கண்டறிதல்',
    title: 'எந்த மூலை — ஏதோ தவறு என்பது மட்டுமல்ல',
    text: 'ஒவ்வொரு செடியிலும் சென்சார் வைக்க முடியாது. நான்கு சென்சார்களுக்கு இடையிலான நிலத்தை செயலி கணக்கிடுகிறது, அதனால் மருந்து **முழு வயலுக்கும் அல்ல, பாதித்த பகுதிக்கு மட்டும்** செல்கிறது.',
    points: [
      {
        title: 'வயலில் நான்கு சென்சார்களை வையுங்கள்',
        body: 'பரவலாக, **ஒரே இடத்தில் அல்ல**. பிரச்சினை எப்போதும் ஒரு பகுதியில் தொடங்கும் — நீர் தேங்கும் தாழ்வான மூலை, அல்லது பூச்சிகள் முதலில் வரும் ஓரம்.',
      },
      {
        title: 'இடைப்பட்ட நிலத்தை செயலி கணக்கிடும்',
        body: 'அவற்றுக்கு இடையிலான **ஒவ்வொரு கட்டத்தையும்** கணக்கிட்டு, வயல் எல்லையில் நிறுத்திக்கொள்ளும் — அதற்கு அப்பால் ஊகிக்காது.',
      },
      {
        title: 'பாதித்த கட்டங்களுக்கு மட்டும் மருந்து',
        body: 'இந்த வயலில் அது **பதினான்கு சதவீதம்**. மீதி எண்பத்தாறு அப்படியே விடப்படும், சேமிப்பு அங்கிருந்துதான் வருகிறது.',
      },
    ],
    caption: 'சென்சாரை இழுக்கவும், அல்லது டேப் செய்து அம்புக்குறிகளைப் பயன்படுத்தவும். ஒவ்வொரு கட்டமும் மீண்டும் கணக்கிடப்படும்.',
    panel: 'வயல் வரைபடம்',
  },
  trust: {
    label: 'ஏன் நம்பலாம்',
    title: 'உறுதி இல்லாதபோது அதைச் சொல்கிறது',
    text: 'இரண்டு தனித் தனி விஷயங்கள்: பிரச்சினை எவ்வளவு பெரிதாகத் தெரிகிறது, அதற்குப் பின்னால் எவ்வளவு ஆதாரம் இருக்கிறது. ஆதாரம் குறைவான பெரிய எச்சரிக்கை **தடுத்து வைக்கப்படும்** — தடுக்கப்பட்டது என்பதும் உங்களுக்குக் காட்டப்படும்.',
    points: [
      {
        title: 'இரண்டு எண்கள், ஒருபோதும் கலப்பதில்லை',
        body: '**எவ்வளவு பெரிது** என்பதும் **எவ்வளவு உறுதி** என்பதும் தனித் தனியே இருக்கும். பழைய அளவு நம்பகத்தை மட்டும் குறைக்கும், மதிப்பெண்ணைத் தொடாது.',
      },
      {
        title: 'வரம்பை நீங்கள் முடிவு செய்கிறீர்கள்',
        body: 'இந்த அமைப்பு உங்கள் சுயவிவரத்தில் இருக்கிறது. **குறைவாக** வைத்தால் தவறான எச்சரிக்கைகள் உட்பட எல்லாம் தெரியும். **அதிகமாக** வைத்தால் சென்சார்கள் உறுதியாகச் சொல்வது மட்டும்.',
      },
      {
        title: 'எதுவும் மறைக்கப்படாது, தடுக்கப்படும் மட்டுமே',
        body: 'தடுக்கப்பட்ட எச்சரிக்கை **தடுக்கப்பட்டது என்றே உங்களுக்குக் காட்டப்படும்** — அமைதியான செயலி ஆரோக்கியமான வயல் என்று தவறாகப் புரிந்துகொள்ளப்படக் கூடாது.',
      },
    ],
    caption: 'வரம்பை இழுக்கவும். அதிக மதிப்பெண் பெற்ற அபாயமே முதலில் நீக்கப்படும்.',
    panel: 'எச்சரிக்கை',
  },
  watch: {
    label: 'எதைக் கவனிக்கிறது',
    title: 'ஐந்து விஷயங்கள், தனித் தனியாக',
    items: [
      { name: 'பூச்சி', text: 'பயிரைத் தின்னும் பூச்சிகள். சேதம் கண்ணுக்குத் தெரிவதற்கு முன்பே சென்சார்கள் அறிந்துகொள்கின்றன.' },
      { name: 'நீர்ப்பாசனம்', text: 'இந்தப் பயிருக்கு, இந்த நேரத்தில் தேவையான நீர் மண்ணில் இருக்கிறதா என்பது.' },
      { name: 'ஊட்டச்சத்து', text: 'பயிருக்கு இப்போது தேவையான சத்து மண்ணில் மீதம் இருக்கிறதா என்பது.' },
      { name: 'வானிலை அபாயம்', text: 'பயிரைப் பாதிக்கக்கூடிய வெப்பம், குளிர், காற்று அல்லது மழை.' },
      { name: 'பயிர் ஆரோக்கியம்', text: 'மற்ற நான்கையும் சேர்த்து உருவாகும் முழுமையான படம்.' },
    ],
  },
  save: {
    label: 'எவ்வளவு சேமிப்பு',
    title: 'முழு வயலும் அல்ல, ஏழில் ஒரு பங்கு',
    text: 'சேமிப்பு ஒரே ஒரு விஷயத்தில் இருந்து வருகிறது — பிரச்சினை எங்கே என்பதை அறிவது.',
    perAcre: 'ஏக்கருக்கு, பருவத்திற்கு செலவு',
    usual: 'இப்போது',
    withApp: 'ட்ரிக்ர் உடன்',
    yourField: 'உங்கள் வயல்',
    acres: 'ஏக்கர்',
    saved: 'ஆண்டுக்கு சேமிப்பு',
    subscription: 'சந்தா',
    net: 'உங்கள் கையில் மிச்சம்',
    note: 'சுமார் **௧.௭ ஏக்கர்** அளவுக்குக் கீழ் சந்தாவின் விலை சேமிப்பை விட அதிகம். அதை நாங்கள் மறைக்கவில்லை — ஸ்லைடரை இழுத்துப் பாருங்கள்.',
    rows: ['தெளிப்பு', 'தண்ணீர்', 'கூலி', 'பிற செலவுகள்'],
  },
  get: {
    label: 'செயலியைப் பெறுக',
    title: 'உங்கள் தொலைபேசியில் வைத்துக்கொள்ளுங்கள்',
    text: 'ஆண்ட்ராய்டு, இலவசம், நிறுவிய பிறகு இணையம் இல்லாமலும் இயங்கும்.',
    cta: 'ஆண்ட்ராய்டுக்கு பதிவிறக்கம்',
    unavailable: 'ஆண்ட்ராய்டு பதிப்பு இங்கே இன்னும் வெளியிடப்படவில்லை.',
  },
  footer: {
    tagline: 'முதலில் அளவிடு, பிறகு செயல்படு.',
    sources: 'வானிலை Open-Meteo இலிருந்து. விலைகள் data.gov.in இலிருந்து. நோய் வழிகாட்டுதல் TNAU மற்றும் PAU இலிருந்து.',
    built: 'ஸ்மார்ட் இந்தியா ஹேக்கத்தான் ௨௦௨௬ க்காக உருவாக்கப்பட்டது',
    rights: 'இங்கே காட்டப்படும் அளவுகள் உருவகப்படுத்தப்பட்டவை, செயலியும் அதைச் சொல்கிறது.',
  },
  demo: {
    drag: 'சென்சாரை இழுக்கவும்',
    reset: 'மீட்டமை',
    threshold: 'நம்பகத்தன்மை வரம்பு',
    low: 'எல்லாவற்றையும் சொல்',
    high: 'உறுதியானால் மட்டும்',
    sent: 'அனுப்பப்பட்டது',
    held: 'தடுக்கப்பட்டது',
    bad: 'அளவு',
    sure: 'உறுதி',
  },
};

export const DICTS: Record<Lang, Dict> = { en, hi, ta };

/* ------------------------------------------------------------------ context */

const STORAGE_KEY = 'drikr-lang';

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Read on mount rather than during render: the server has no localStorage,
  // and reading it while rendering would make the first client paint disagree
  // with the server's HTML.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && saved in DICTS) {
        setLangState(saved);
        return;
      }
      const nav = navigator.language.slice(0, 2);
      if (nav === 'hi' || nav === 'ta') setLangState(nav);
    } catch {
      // Private mode, or storage blocked. English is a fine place to land.
    }
  }, []);

  // Keep the document's own language in step, so screen readers switch voice
  // and the browser offers the right dictionary.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* not fatal — the choice just will not survive a reload */
    }
  };

  return <Ctx.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
