import type { Dict } from './types';

const en: Dict = {
  "nav": {
    "how": "How it works",
    "map": "The map",
    "service": "Drone service",
    "system": "Inside",
    "proof": "Proof",
    "get": "Get the app",
    "lang": "Language",
    "langTitle": "Choose your language",
    "langKeep": "Continue"
  },
  "hero": {
    "headline": "Where exactly is the problem?",
    "what": "Drikr finds crop problems early, shows exactly where they are on a map of your field, and treats only that patch — not the whole field.",
    "cta": "Get the Android app",
    "alt": "See how it works"
  },
  "problem": {
    "label": "The problem",
    "title": "Spraying five acres for a problem in one",
    "text": "Weather, soil, water, pests and disease hit different parts of a field at different times. And early on, the damage is **hard to see** — it looks like normal variation, or a nutrient shortage.",
    "causes": [
      {
        "name": "Weather",
        "text": "Sudden rain, drought, heat or humidity."
      },
      {
        "name": "Soil",
        "text": "Poor soil, or nutrients running out."
      },
      {
        "name": "Water",
        "text": "Irrigation that does not come on time."
      },
      {
        "name": "Pests",
        "text": "Insects feeding on the crop."
      },
      {
        "name": "Disease",
        "text": "Fungi, bacteria and viruses."
      },
      {
        "name": "Temperature",
        "text": "Sudden swings that stress the plant."
      }
    ],
    "exampleTitle": "A typical case",
    "example": "In a **5-acre** field only **0.8 acre** is affected. Nobody knows which 0.8, so all five get sprayed — more chemical, more labour, more money. And if it was caught late, the crop can still be lost.",
    "sprayed": "Sprayed",
    "affected": "Actually affected",
    "acres": "acres"
  },
  "how": {
    "label": "How it works",
    "title": "Two ways to use it",
    "tabs": [
      "Drone scan",
      "Sensors in the field"
    ],
    "drone": [
      {
        "n": "01",
        "title": "Mark your field",
        "text": "Draw it once in the app."
      },
      {
        "n": "02",
        "title": "The drone scans it",
        "text": "It flies a planned path, photographs the crop, and records the exact place of every photo."
      },
      {
        "n": "03",
        "title": "AI reads the photos",
        "text": "It looks for signs of disease, pests, nutrient shortage and stress."
      },
      {
        "n": "04",
        "title": "You get a field map",
        "text": "Healthy, at-risk and problem areas, marked on your own field."
      },
      {
        "n": "05",
        "title": "You get a plain answer",
        "text": "“Aphid risk detected in 0.8 acre” — with what to use, where, and what it costs."
      },
      {
        "n": "06",
        "title": "Treat just that patch",
        "text": "By hand, or book the drone service to spray only the marked area."
      }
    ],
    "sensor": [
      {
        "n": "01",
        "title": "Sensors stay in the field",
        "text": "Temperature, humidity, rain, soil moisture and leaf wetness, all day."
      },
      {
        "n": "02",
        "title": "The app watches for trouble",
        "text": "Conditions that favour disease or stress are spotted early."
      },
      {
        "n": "03",
        "title": "You get an alert",
        "text": "For example: high disease risk in one part of the field."
      },
      {
        "n": "04",
        "title": "Look, or send the drone",
        "text": "Check the spot yourself, or schedule a drone scan."
      },
      {
        "n": "05",
        "title": "Treat only where needed",
        "text": "Watching all the time; the drone only when it is useful."
      }
    ]
  },
  "find": {
    "label": "The field map",
    "title": "A map anyone can read",
    "text": "The AI result becomes a map of your field in three states — **healthy**, **at risk** and **problem** — and one plain sentence about what to do.",
    "points": [
      {
        "title": "Healthy",
        "body": "The crop looks fine. **Leave it alone** — no spray, no cost."
      },
      {
        "title": "At risk",
        "body": "Early signs or the weather point to trouble. **Look again soon.**"
      },
      {
        "title": "Problem",
        "body": "A probable problem. **This is the only area to treat.**"
      }
    ],
    "caption": "Drag a sensor, or tab to one and use the arrow keys. The map and the advice update.",
    "panel": "field health map",
    "healthy": "Healthy",
    "atRisk": "At risk",
    "problem": "Problem",
    "rec": "Aphid risk detected in {a} acre",
    "recAction": "Spray only the dark area. The rest of the field needs nothing.",
    "recNone": "No problem area right now. Nothing to spray.",
    "field": "5-acre field"
  },
  "trust": {
    "label": "Why trust it",
    "title": "It says when it is not sure",
    "text": "Two numbers, kept apart: how bad it looks, and how much evidence is behind it. A big number on thin evidence is **held back** — and shown to you as held back.",
    "points": [
      {
        "title": "Two numbers, never merged",
        "body": "**How bad** it looks and **how sure** it is stay apart. An old reading lowers the confidence without touching the score."
      },
      {
        "title": "You set the bar",
        "body": "The setting lives in your profile. **Low**, and you hear everything including some false alarms. **High**, and you only hear what the sensors are sure of."
      },
      {
        "title": "Nothing is hidden, only held",
        "body": "Anything held back is **shown to you as held back**, so a quiet app is never mistaken for a healthy field."
      }
    ],
    "caption": "Drag the threshold. The highest-scoring risk is the first to be dropped.",
    "panel": "alerts"
  },
  "watch": {
    "label": "What it watches",
    "title": "Five things, scored separately",
    "items": [
      {
        "name": "Pest",
        "text": "Insects feeding on the crop. The sensors pick up the damage before you can see it."
      },
      {
        "name": "Irrigation",
        "text": "Whether the soil holds enough water for this crop, at this stage of its life."
      },
      {
        "name": "Nutrient",
        "text": "Whether the soil still has the feed the crop needs right now."
      },
      {
        "name": "Climate risk",
        "text": "Heat, cold, wind or rain coming that could hurt the crop."
      },
      {
        "name": "Crop health",
        "text": "The overall picture, put together from the other four."
      }
    ]
  },
  "treat": {
    "label": "Targeted treatment",
    "title": "Treat one acre, not ten",
    "text": "Find the problem first, then spray only there. Set your own field below.",
    "field": "Your field",
    "affected": "Affected area",
    "acres": "acres",
    "whole": "Spray the whole field",
    "targeted": "Spray only the problem",
    "sprayed": "Sprayed",
    "spray": "Spraying",
    "scan": "Drone scan",
    "saved": "Saved this season",
    "less": "less area sprayed",
    "note": "Spraying at **₹1,150 an acre** a season and a scan at **₹100 an acre** (the middle of ₹75–125). Real savings have to be **measured in field trials**, not assumed — so read this as a sum, not a promise."
  },
  "service": {
    "label": "Drone as a service",
    "title": "You do not need to own a drone",
    "text": "A local FPO, cooperative or trained operator owns and flies it. You book a scan or a spray in the app, and pay per acre — only when you need it.",
    "steps": [
      {
        "name": "You request",
        "text": "A scan or a spray, from the app."
      },
      {
        "name": "An operator flies",
        "text": "A trained local operator handles the drone."
      },
      {
        "name": "You pay per acre",
        "text": "Only for the service you used."
      }
    ],
    "figures": [
      {
        "value": "₹75–125",
        "label": "per acre for field monitoring",
        "sub": "estimated, through FPOs and operators"
      },
      {
        "value": "₹1.17 lakh",
        "label": "prototype of our own drone",
        "sub": "development-grade parts"
      },
      {
        "value": "₹30–40k",
        "label": "target for a leaner drone",
        "sub": "the long-term goal"
      }
    ],
    "note": "Real prices will depend on travel distance, field size, battery use, the number of scans and the local market."
  },
  "system": {
    "label": "Inside the system",
    "title": "What it is built from",
    "hwTitle": "Our own drone — in development",
    "swTitle": "Software",
    "today": "Today the app flies a small ready-made drone (Dynalog DR-DG600C) straight from the phone to photograph your field. The hardware below is for Drikr's own drone, now being built.",
    "hw": [
      {
        "name": "Kakute H7",
        "text": "Flight controller. Keeps the drone stable and flies the planned path."
      },
      {
        "name": "Raspberry Pi 5",
        "text": "Onboard computer for images and communication."
      },
      {
        "name": "Camera",
        "text": "RGB, or multispectral, depending on the build."
      },
      {
        "name": "RTK GNSS",
        "text": "Very precise positioning, so every finding has an exact place."
      },
      {
        "name": "Field sensors",
        "text": "Temperature, humidity, soil moisture and more."
      }
    ],
    "sw": [
      {
        "name": "Flight control",
        "text": "Autonomous survey along waypoints."
      },
      {
        "name": "Image processing",
        "text": "OpenCV cleans, stitches and segments the photos into one field image."
      },
      {
        "name": "Crop-disease AI",
        "text": "Finds the patterns of disease, pests and stress."
      },
      {
        "name": "Field map",
        "text": "Turns results into places on your field."
      },
      {
        "name": "Recommendations",
        "text": "What to do, where, and how much."
      },
      {
        "name": "Farmer app",
        "text": "Request scans, see results, get advice — in 13 languages."
      }
    ],
    "built": "Built or prototyped already: autonomous flight, geo-tagged photos, image stitching, the AI model, the field map and the farmer app.",
    "flowTitle": "The whole chain",
    "flow": [
      "You pick a field",
      "The drone scans it",
      "The camera captures",
      "RTK records the place",
      "The computer processes",
      "AI finds problems",
      "A field map is made",
      "The app shows it",
      "You get advice",
      "Treat by hand or by drone"
    ]
  },
  "impact": {
    "label": "Why it matters",
    "title": "Five benefits",
    "benefits": [
      {
        "name": "Less pesticide",
        "text": "Treatment only where it is needed."
      },
      {
        "name": "Less labour",
        "text": "No walking the whole field again and again."
      },
      {
        "name": "Less crop loss",
        "text": "Caught earlier, before it spreads."
      },
      {
        "name": "Affordable",
        "text": "Pay for a service, not for a drone."
      },
      {
        "name": "Easy to use",
        "text": "Your language, plain advice."
      }
    ],
    "groupsTitle": "Who gains",
    "groups": [
      {
        "name": "Farmers",
        "text": "Find problems earlier, know where to act, and stop paying for treatment that was never needed."
      },
      {
        "name": "The environment",
        "text": "Less needless spraying, and less chemical running into soil and water."
      },
      {
        "name": "Villages",
        "text": "Work for local drone operators, FPOs, cooperatives and service providers."
      },
      {
        "name": "Everyone",
        "text": "Precision farming within reach of small farmers, through shared services."
      }
    ]
  },
  "proof": {
    "label": "How we will prove it",
    "title": "Measured, not assumed",
    "text": "The goal is not “use AI”. It is less needless treatment, with crop health kept or improved — and that has to be shown on real fields.",
    "metrics": [
      {
        "name": "Area treated",
        "text": "Acres sprayed the usual way, against acres sprayed with Drikr."
      },
      {
        "name": "Pesticide used",
        "text": "Quantity per acre — whole field against targeted."
      },
      {
        "name": "Farmer cost",
        "text": "Input cost per acre, before and after."
      },
      {
        "name": "Early warning",
        "text": "How much sooner Drikr flags a problem than the eye can see it."
      }
    ],
    "feasTitle": "Can it be built and used?",
    "feas": [
      {
        "name": "Technical",
        "text": "The building blocks exist: autonomous drone, camera, positioning, sensors, computer, AI prototype and the farmer app."
      },
      {
        "name": "On the farm",
        "text": "It must scan real fields end to end, and local operators must be able to run it. The farmer never needs to understand the drone."
      },
      {
        "name": "Rules",
        "text": "Every flight follows current DGCA rules and any other permission that applies."
      },
      {
        "name": "Scale",
        "text": "The same drone, app and data system serve paddy, wheat, cotton and more. Only the AI is adapted per crop."
      }
    ]
  },
  "question": {
    "before": "Farming has always asked",
    "q1": "Should I spray this field?",
    "after": "Drikr answers a better question",
    "q2": "Where exactly is the problem, what is it, and how much treatment does it really need?"
  },
  "get": {
    "label": "Get the app",
    "title": "Put it on your phone",
    "text": "Android, free, and it works offline once installed.",
    "cta": "Download for Android",
    "unavailable": "The Android build has not been published here yet.",
    "installTitle": "Installing takes one minute",
    "steps": [
      "Tap Download. Wait until it finishes.",
      "Open the downloaded Drikr file.",
      "If the phone asks, tap Settings, turn on \"Allow from this source\", and go back.",
      "Tap Install, then Open."
    ],
    "warn": "If Google Play Protect shows a warning, tap \"More details\", then \"Install anyway\".",
    "safe": "Drikr does not read your SMS, contacts or bank apps.",
    "listen": "Listen"
  },
  "footer": {
    "tagline": "Measure first, then act.",
    "sources": "Weather from Open-Meteo. Prices from data.gov.in. Disease guidance from TNAU and PAU.",
    "built": "Made in India, for Indian farmers",
    "rights": "Readings shown here are simulated, and the app says so too.",
    "privacy": "Privacy and your data"
  },
  "demo": {
    "drag": "Drag a station",
    "reset": "Reset",
    "threshold": "Confidence threshold",
    "low": "Tell me everything",
    "high": "Only when certain",
    "sent": "Sent",
    "held": "Held back",
    "bad": "Bad",
    "sure": "Sure"
  }
};

export default en;
