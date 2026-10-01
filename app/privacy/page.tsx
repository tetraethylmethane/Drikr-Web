import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy — Drikr',
  description: 'What the Drikr app keeps, why, who sees it, and how to get a copy or delete it.',
};

// The same notice the app shows on its Privacy screen (src/i18n/locales/en.json,
// "privacy.*"), so the two never say different things. The app shows it in the
// farmer's own language; this page is the public English copy it links to.
const SECTIONS = [
  {
    title: 'What we keep',
    body: 'Your mobile number, a scrambled form of your PIN, your name and district if you give them, your fields (crop, area, location), sensor readings, alerts, drone flights and photos, and your posts in the community.',
  },
  {
    title: 'Why',
    body: 'Only to give advice for your own field, to keep your fields if you change phones, and to run the community and drone bookings. We never sell your data and never show ads.',
  },
  {
    title: 'Where it is kept',
    body: 'On your phone, and on Google Firebase servers when you are online. Drone photos stay on your phone unless you send them.',
  },
  {
    title: 'Who sees it',
    body: 'Community posts show your name and district — never your number. In a drone booking your number goes only to the operator who accepts the job. Questions you ask Kisan Mitra may be sent to Google Gemini to get an answer. If you tap Translate on a community post, its text is sent to Bhashini, the Government of India’s translation service, and nothing else about you is. If you turn on SMS alerts, urgent alerts are sent by SMS from your phone to the numbers you chose, and to no one else.',
  },
  {
    title: 'How long',
    body: 'Until you delete it. Sensor readings are kept per field, without your name or number.',
  },
  {
    title: 'Your rights',
    body: 'Under the Digital Personal Data Protection Act, 2023 you can get a copy of your data, correct it and have it erased. In the app, open Profile → Privacy and use “Get a copy of my data” or “Delete all my data”. Deleting your data also withdraws your consent, at any time.',
  },
];

export default function PrivacyPage() {
  return (
    <section className="w-full px-[20px] pt-28 pb-16 md:pt-36">
      <div className="mx-auto max-w-[760px]">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Privacy and your data</h1>
        <p className="mb-10 text-[17px] leading-relaxed text-secondary">
          This is the notice for the Drikr app. The app shows the same notice, in your own language, under
          Profile → Privacy.
        </p>
        <div className="flex flex-col gap-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-2 text-xl font-bold text-primary">{s.title}</h2>
              <p className="text-[16px] leading-relaxed text-secondary">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="mb-2 text-xl font-bold text-primary">Complaints (Grievance Officer)</h2>
          <p className="text-[16px] leading-relaxed text-secondary">
            Write to{' '}
            <a href="mailto:drikr.systems@gmail.com" className="underline underline-offset-2 hover:text-primary">
              drikr.systems@gmail.com
            </a>
            .
          </p>
        </div>
        <p className="mt-12 text-[13px] text-secondary">Last updated 1 October 2026.</p>
      </div>
    </section>
  );
}
