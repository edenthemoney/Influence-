'use client';

import { FormEvent, useState } from 'react';

const VENUE_TYPES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'nightclub', label: 'Nightclub' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'resort', label: 'Resort' },
  { value: 'lounge', label: 'Lounge' },
  { value: 'other', label: 'Another kind of room' },
];

const CREATOR_SERVICES = [
  'Venue skits',
  'Restaurant and food',
  'Nightlife and clubs',
  'Hotels and resorts',
  'On-camera hosting',
];

function plain(value: string) {
  return value.replace(/[<>]/g, '').trim();
}

function normalizeHandle(raw: string) {
  let handle = raw.trim();
  handle = handle.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
  handle = handle.replace(/^@+/, '');
  handle = handle.split(/[/?#]/)[0] ?? '';
  return handle;
}

function normalizeUrl(raw: string) {
  const value = raw.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[\w.-]+\.[a-z]{2,}([/?#].*)?$/i.test(value)) return `https://${value}`;
  return '';
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f6f1e7]/55">{label}</span>
      {children}
    </label>
  );
}

export function BookForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [venue, setVenue] = useState('');
  const [venueType, setVenueType] = useState('');
  const [niche, setNiche] = useState('');
  const [note, setNote] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (company) {
      setDone(true);
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (!name.trim() || !venue.trim() || !niche.trim() || !venueType) {
      setError('Name, venue, the kind of room, and the niche are required.');
      return;
    }
    if (digits.length < 10) {
      setError('Enter a phone number we can reach you at.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter an email we can reply to.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: plain(name),
          email: email.trim(),
          phone: phone.trim(),
          source: 'book_influencers',
          serviceType: venueType,
          notes: [
            `Venue: ${plain(venue)}`,
            `Niche: ${plain(niche)}`,
            note.trim() ? `Note: ${plain(note)}` : '',
          ].filter(Boolean).join(' | '),
        }),
      });
      if (!response.ok) throw new Error('failed');
      setDone(true);
    } catch {
      setError('We could not send that just now. Call or text (561) 552-0392, or email influencemodelsagency@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="border border-[#c6a15a]/40 px-6 py-12 text-center" role="status">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c6a15a]">Received</p>
        <h3 className="mt-3 font-display text-4xl italic text-[#f6f1e7]">We have the room.</h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#f6f1e7]/70">
          {plain(name).split(' ')[0] || 'Thank you'}, we will match influencers to {plain(venue) || 'your venue'} and be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="h-0 overflow-hidden" aria-hidden>
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input className="ix-field" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label="Email">
          <input className="ix-field" required type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label="Phone">
          <input className="ix-field" required type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </Field>
        <Field label="Venue">
          <input className="ix-field" required autoComplete="organization" value={venue} onChange={(event) => setVenue(event.target.value)} placeholder="The name of the room" />
        </Field>
      </div>
      <Field label="What kind of room">
        <select className="ix-field" required value={venueType} onChange={(event) => setVenueType(event.target.value)}>
          <option value="" disabled>Select</option>
          {VENUE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Niche">
        <input className="ix-field" required value={niche} onChange={(event) => setNiche(event.target.value)} placeholder="Late dinner, bottle service, a new menu, pool season" />
      </Field>
      <Field label="Anything we should know">
        <textarea className="ix-field min-h-[96px] resize-y" value={note} onChange={(event) => setNote(event.target.value)} maxLength={2000} />
      </Field>
      {error && <p className="text-sm text-[#f0c7c7]" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="flex h-12 w-full items-center justify-center bg-[#c6a15a] text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1a1408] disabled:opacity-60"
      >
        {submitting ? 'Sending' : 'Book influencers'}
      </button>
      <p className="text-center text-[11px] text-[#f6f1e7]/40">We reply about this inquiry. That is the whole list.</p>
    </form>
  );
}

export function JoinForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (service: string) => {
    setServices((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (website) {
      setDone(true);
      return;
    }
    const handle = normalizeHandle(instagram);
    if (!name.trim() || !location.trim() || !experience.trim()) {
      setError('Name, city, and a note about the work are required.');
      return;
    }
    if (!/^[A-Za-z0-9._]{1,30}$/.test(handle)) {
      setError('Enter an Instagram handle.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter an email we can reply to.');
      return;
    }
    const portfolioUrl = normalizeUrl(portfolio);
    const note = [
      'Join the network — venue marketplace',
      message.trim() ? plain(message) : '',
      portfolio.trim() && !portfolioUrl ? `Portfolio note: ${plain(portfolio)}` : '',
    ].filter(Boolean).join('\n');

    setSubmitting(true);
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: plain(name),
          email: email.trim(),
          instagram: handle,
          location: plain(location),
          experience: plain(experience),
          services,
          portfolio: portfolioUrl,
          message: note,
        }),
      });
      if (!response.ok) throw new Error('failed');
      setDone(true);
    } catch {
      setError('We could not send that just now. Email influencemodelsagency@gmail.com and include your Instagram.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="border border-[#c6a15a]/40 px-6 py-12 text-center" role="status">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c6a15a]">Application in</p>
        <h3 className="mt-3 font-display text-4xl italic text-[#f6f1e7]">We will watch the work.</h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#f6f1e7]/70">
          If the skits fit the rooms we book, we will write back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="h-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input className="ix-field" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label="Email">
          <input className="ix-field" required type="email" autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label="Instagram">
          <input className="ix-field" required autoComplete="username" value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="@handle" />
        </Field>
        <Field label="City">
          <input className="ix-field" required autoComplete="address-level2" value={location} onChange={(event) => setLocation(event.target.value)} />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f6f1e7]/55">What you will shoot</legend>
        <div className="grid gap-1 sm:grid-cols-2">
          {CREATOR_SERVICES.map((service) => (
            <label key={service} className="flex min-h-11 items-center gap-3 text-sm text-[#f6f1e7]/80">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#c6a15a]"
                checked={services.includes(service)}
                onChange={() => toggle(service)}
              />
              {service}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="The work, in a few lines">
        <textarea className="ix-field min-h-[96px] resize-y" required value={experience} onChange={(event) => setExperience(event.target.value)} maxLength={2000} placeholder="Rooms you have filmed, or the kind of skit you make." />
      </Field>
      <Field label="A link, if you have one">
        <input className="ix-field" inputMode="url" autoComplete="url" value={portfolio} onChange={(event) => setPortfolio(event.target.value)} placeholder="https://" />
      </Field>
      <Field label="Note">
        <textarea className="ix-field min-h-[72px] resize-y" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={2000} />
      </Field>
      {error && <p className="text-sm text-[#f0c7c7]" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="flex h-12 w-full items-center justify-center border border-[#c6a15a] text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f3e6c4] disabled:opacity-60"
      >
        {submitting ? 'Sending' : 'Join the network'}
      </button>
    </form>
  );
}
