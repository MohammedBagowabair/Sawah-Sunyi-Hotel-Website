import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, BedDouble, CalendarDays, Home, Menu, Minus, Phone, Plus, X } from 'lucide-react';
import { COPY, ROOM_PHOTOS } from '@/content';
import { RoomGallery } from '@/components/RoomGallery';
import { CREDITS } from '@/credits';
import { useCopy } from '@/lib/lang';
import { PHONE_DISPLAY, TEL, waUrl } from '@/lib/wa';
import { todayISO, useBooking } from '@/lib/booking';
import { HeroPic, Pic } from '@/components/Pic';
import { LangSwitch } from '@/components/LangSwitch';
import { WaFab, WaIcon } from '@/components/WaFab';

function useLockScroll(locked: boolean) {
  useEffect(() => {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [locked]);
}

export default function App() {
  const c = useCopy(COPY);
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const b = useBooking();
  useLockScroll(menu || sheet);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setSheet(false); } };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const openBooking = (room?: string) => { if (room) b.setRoom(room); setMenu(false); setSheet(true); };

  return (
    <>
      <a href="#main" className="skip">{c.skip}</a>
      <header className={`top ${scrolled ? 'is-solid' : ''}`}>
        <a href="#top" className="brand">
          <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M8 25c4-3 8-3 12 0s8 3 12 0M8 19c4-3 8-3 12 0s8 3 12 0M20 6v8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span>Sawah <em>Sunyi</em></span>
        </a>
        <nav className="desk-nav" aria-label="Primary">
          {c.nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="top-actions">
          <LangSwitch label={c.langLabel} />
          <button className="btn-reserve desk-only" onClick={() => openBooking()}>{c.reserve}</button>
          <button className="icon-btn mob-only" aria-label={c.openMenu} aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(true)}><Menu size={22} /></button>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <HeroPic alt={c.heroAlt} className="hero-img" />
          <div className="hero-shade" />
          <div className="hero-inner">
            <p className="eyebrow light">{c.heroEyebrow}</p>
            <h1>{c.heroTitle[0]}<br /><em>{c.heroTitle[1]}</em></h1>
            <p className="hero-text">{c.heroText}</p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => openBooking()}>{c.heroCta} <ArrowRight size={18} /></button>
              <a href="#intro" className="btn-ghost">{c.explore} <ArrowDown size={16} /></a>
            </div>
          </div>
        </section>

        <section id="intro" className="intro wrap">
          <p className="eyebrow">{c.introEyebrow}</p>
          <h2>{c.introTitle}</h2>
          <p className="lede">{c.introText}</p>
          <dl className="facts">
            {c.facts.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
          </dl>
        </section>

        <Rooms onAsk={openBooking} />

        <section id="rituals" className="rituals">
          <div className="wrap">
            <p className="eyebrow">{c.ritualsEyebrow}</p>
            <h2>{c.ritualsTitle}</h2>
          </div>
          <ol className="ritual-list wrap">
            {c.rituals.map((r, i) => (
              <li key={r.t}>
                <div className="ritual-img"><Pic name={r.img} alt={r.alt} sizes="(min-width: 900px) 30vw, 88vw" /></div>
                <span className="ritual-n">0{i + 1}</span>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="table" className="table">
          <div className="table-img"><Pic name="dining" alt={c.tableAlt} sizes="(min-width: 900px) 50vw, 100vw" /></div>
          <div className="table-copy">
            <p className="eyebrow light">{c.tableEyebrow}</p>
            <h2>{c.tableTitle}</h2>
            <p>{c.tableText}</p>
          </div>
        </section>

        <section id="find" className="find wrap">
          <p className="eyebrow">{c.findEyebrow}</p>
          <h2>{c.findTitle}</h2>
          <p className="lede">{c.findText}</p>
          <div className="find-actions">
            <a className="btn-wa" href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer"><WaIcon size={20} /> {c.chat}</a>
            <a className="btn-line" href={TEL}><Phone size={18} /> <span dir="ltr">{PHONE_DISPLAY}</span></a>
          </div>
        </section>

        <section id="book" className="book-band">
          <div className="wrap">
            <p className="eyebrow light">{c.bookEyebrow}</p>
            <h2>{c.bookTitle}</h2>
            <p>{c.bookText}</p>
            <button className="btn-primary on-dark" onClick={() => openBooking()}><CalendarDays size={18} /> {c.heroCta}</button>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-grid">
          <div>
            <p className="foot-brand">Sawah <em>Sunyi</em></p>
            <p>{c.footerTag}</p>
          </div>
          <div>
            <p className="foot-h">{c.contact}</p>
            <p><a href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer">WhatsApp <span dir="ltr">{PHONE_DISPLAY}</span></a></p>
            <p><a href={TEL}>{c.callUs} <span dir="ltr">{PHONE_DISPLAY}</span></a></p>
          </div>
          <div className="foot-note">
            <p>{c.demo}</p>
            <details>
              <summary>{c.credits}</summary>
              <ul>
                {CREDITS.map((cr) => (
                  <li key={cr.page}><a href={cr.page} target="_blank" rel="noopener noreferrer">{cr.title.replace(/\.(jpe?g|png)$/i, '')}</a>, {cr.artist}, {cr.lic}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
        <p className="wrap foot-legal">{c.rights}</p>
      </footer>

      <WaFab text={c.waDefault} label={c.waLabel} />

      <nav className="tabbar" aria-label={c.reserve}>
        <a href="#top"><Home size={20} /><span>{c.home}</span></a>
        <a href="#stay"><BedDouble size={20} /><span>{c.roomsTab}</span></a>
        <button className="tab-reserve" onClick={() => openBooking()}><CalendarDays size={20} /><span>{c.reserve}</span></button>
        <a href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer"><WaIcon size={20} /><span>{c.chat}</span></a>
        <a href={TEL}><Phone size={20} /><span>{c.call}</span></a>
      </nav>

      {menu && (
        <div id="menu" className="menu" role="dialog" aria-modal="true" aria-label={c.openMenu}>
          <div className="menu-top">
            <span className="brand">Sawah <em>Sunyi</em></span>
            <button className="icon-btn" aria-label={c.closeMenu} onClick={() => setMenu(false)} autoFocus><X size={24} /></button>
          </div>
          <nav className="menu-links" aria-label="Menu">
            {c.nav.map(([h, l], i) => <a key={h} href={h} onClick={() => setMenu(false)}><span>0{i + 1}</span>{l}</a>)}
          </nav>
          <div className="menu-foot">
            <LangSwitch label={c.langLabel} className="on-dark" />
            <button className="btn-primary on-dark" onClick={() => openBooking()}>{c.reserve}</button>
          </div>
        </div>
      )}

      {sheet && <BookingSheet b={b} onClose={() => setSheet(false)} />}
    </>
  );
}

function Rooms({ onAsk }: { onAsk: (room: string) => void }) {
  const c = useCopy(COPY);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset['i'])); }), { root: el, threshold: 0.6 });
    el.querySelectorAll('li').forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);
  const go = (d: number) => {
    const el = track.current;
    if (!el) return;
    const i = Math.max(0, Math.min(c.rooms.length - 1, active + d));
    (el.children[i] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };
  return (
    <section id="stay" className="stay" aria-roledescription="carousel">
      <div className="wrap stay-head">
        <div>
          <p className="eyebrow">{c.stayEyebrow}</p>
          <h2>{c.stayTitle}</h2>
        </div>
        <div className="stay-ctrl">
          <span className="count" aria-live="polite">{c.roomOf.replace('{n}', String(active + 1)).replace('{t}', String(c.rooms.length))}</span>
          <button className="round" aria-label={c.prev} onClick={() => go(-1)} disabled={active === 0}><ArrowLeft size={18} /></button>
          <button className="round" aria-label={c.next} onClick={() => go(1)} disabled={active === c.rooms.length - 1}><ArrowRight size={18} /></button>
        </div>
      </div>
      <ul className="room-track" ref={track}>
        {c.rooms.map((r, i) => (
          <li key={r.name} data-i={i} className="room" aria-label={c.roomOf.replace('{n}', String(i + 1)).replace('{t}', String(c.rooms.length))}>
            <div className="room-img"><RoomGallery photos={ROOM_PHOTOS[i] ?? []} alts={r.alts} label={r.name} note={c.photoNote} photoOf={c.photoOf} sizes="(min-width: 900px) 40vw, 84vw" /></div>
            <h3>{r.name}</h3>
            <p className="room-meta">{r.meta}</p>
            <p>{r.text}</p>
            <button className="link-btn" onClick={() => onAsk(r.name)}>{c.askRoom} <ArrowRight size={16} /></button>
          </li>
        ))}
      </ul>
      <p className="swipe-hint wrap" aria-hidden="true">{c.swipeHint} →</p>
      <div className="dots" aria-hidden="true">{c.rooms.map((r, i) => <span key={r.name} className={i === active ? 'on' : ''} />)}</div>
    </section>
  );
}

function BookingSheet({ b, onClose }: { b: ReturnType<typeof useBooking>; onClose: () => void }) {
  const c = useCopy(COPY);
  const send = () => {
    if (b.datesInvalid) return;
    window.open(waUrl(b.compose({ ...c.msg })), '_blank', 'noopener');
  };
  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={onClose}>
      <form className="sheet" onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); send(); }}>
        <div className="grab" aria-hidden="true" />
        <button type="button" className="icon-btn sheet-x" aria-label={c.f.close} onClick={onClose} autoFocus><X size={22} /></button>
        <p className="eyebrow">{c.bookEyebrow}</p>
        <h2 id="sheet-title">{c.bookTitle}</h2>
        <div className="field-row">
          <label>{c.f.arrival}<input type="date" min={todayISO()} value={b.arrival} onChange={(e) => b.setArrival(e.target.value)} /></label>
          <label>{c.f.departure}<input type="date" min={b.arrival || todayISO(1)} value={b.departure} onChange={(e) => b.setDeparture(e.target.value)} aria-invalid={b.datesInvalid} /></label>
        </div>
        {b.datesInvalid ? <p className="err" role="alert">{c.f.dateError}</p> : b.nights > 0 ? <p className="nights">{b.nights === 1 ? c.f.night : c.f.nights.replace('{n}', String(b.nights))}</p> : null}
        <div className="field">
          <span className="lbl" id="g-lbl">{c.f.guests}</span>
          <div className="stepper" role="group" aria-labelledby="g-lbl">
            <button type="button" aria-label={c.f.less} onClick={() => b.setGuests(Math.max(1, b.guests - 1))} disabled={b.guests <= 1}><Minus size={18} /></button>
            <output aria-live="polite">{b.guests}</output>
            <button type="button" aria-label={c.f.more} onClick={() => b.setGuests(Math.min(8, b.guests + 1))} disabled={b.guests >= 8}><Plus size={18} /></button>
          </div>
        </div>
        <label>{c.f.room}
          <select value={b.room} onChange={(e) => b.setRoom(e.target.value)}>
            <option value="">{c.f.anyRoom}</option>
            {c.rooms.map((r) => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </label>
        <label>{c.f.note}<textarea rows={2} placeholder={c.f.notePh} value={b.note} onChange={(e) => b.setNote(e.target.value)} /></label>
        <button type="submit" className="btn-wa wide" disabled={b.datesInvalid}><WaIcon size={20} /> {c.f.send}</button>
      </form>
    </div>
  );
}
