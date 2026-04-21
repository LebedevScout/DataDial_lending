// ─── DataDial Landing — redesigned for Medicine & Beauty ──────────────
// Palette & type pulled from the Сайты.fig DataDial/DataDial2 designs.

const DD = {
  ink:     '#0A0A0A',
  ink2:    '#141416',
  grey:    '#212124',
  grey2:   '#303033',
  line:    '#2A2A2D',
  lineHi:  '#3A3A3F',
  mute:    '#95959E',
  muted2:  '#BFBFC7',
  text:    '#F2F4F8',
  bgSoft:  '#EEF0F5',
  white:   '#FFFFFF',
  card:    '#FFFFFF',
  cardLn:  '#E4E6EB',
  // purples
  p100:    '#EDEDFE',   // light wash
  p300:    '#7177F6',   // gradient top
  p500:    '#6A4BEB',   // primary CTA
  p600:    '#5E3EE5',
  p700:    '#4D2ADF',   // gradient bottom
  p800:    '#3A1CB8',
  violet:  '#7D10FB',
  // supporting
  gold:    '#FBA20A',
  mint:    '#2D6A4F',
  coral:   '#E05555',
};

// ─── small primitives ────────────────────────────────────────────────
function Tag({ tone = 'dark', children, icon: Icon }) {
  const dark = tone === 'dark';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 10px',
      background: dark ? 'rgba(255,255,255,0.06)' : DD.p100,
      color: dark ? DD.muted2 : DD.p700,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : 'rgba(106,75,235,0.15)'}`,
      borderRadius: 100,
      fontFamily: 'IBM Plex Sans, ui-monospace, monospace',
      fontSize: 11, fontWeight: 500,
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      {Icon && <Icon size={11} strokeWidth={2.2} />}
      {children}
    </span>
  );
}

function Logo({ dark = true, size = 36 }) {
  const s = size;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: s, height: s, borderRadius: s*0.32,
        background: `linear-gradient(180deg, ${DD.p300} 0%, ${DD.p700} 100%)`,
        position: 'relative', overflow: 'hidden',
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.15), 0 6px 22px -6px ${DD.p500}88`,
      }}>
        {/* Inner mark — recreated from Figma at native 36×36 scale.
            Artwork sits in a 17.15 × 16.4 box, centered (pad ≈ 9.4 px). */}
        <svg width={s} height={s} viewBox="0 0 36 36" style={{ position: 'absolute', inset: 0 }}>
          <g transform="translate(9.6 9.8)" fill="#fff">
            {/* L-bar: horizontal top + vertical left, rounded ends */}
            <path d="M 17.15 2.34 C 17.15 1.05 16.06 0 14.70 0 L 7.35 0 C 3.19 0 0 3.05 0 7.03 L 0 14.06 C 0 15.35 1.10 16.40 2.45 16.40 C 3.80 16.40 4.90 15.35 4.90 14.06 L 4.90 7.03 C 4.90 5.63 5.88 4.69 7.34 4.69 L 14.69 4.69 C 16.04 4.69 17.14 3.64 17.14 2.35 Z" fillRule="nonzero"/>
            {/* Wedge / angled bar — bottom-right diagonal */}
            <path d="M 16.45 12.42 L 12.99 9.11 C 12.03 8.19 10.48 8.19 9.53 9.11 C 8.57 10.02 8.57 11.51 9.53 12.42 L 12.99 15.72 C 13.94 16.64 15.50 16.64 16.45 15.72 C 17.41 14.81 17.41 13.32 16.45 12.42 Z" fillRule="nonzero"/>
          </g>
        </svg>
      </div>
      <span style={{
        fontFamily: 'Actay Wide, "Plus Jakarta Sans", sans-serif',
        fontWeight: 700, fontSize: s*0.62, letterSpacing: '-0.01em',
        color: dark ? DD.text : DD.ink,
      }}>DataDial</span>
      <span style={{
        fontFamily: 'IBM Plex Sans, ui-monospace, monospace',
        fontSize: 10, fontWeight: 500, letterSpacing: '0.1em',
        color: dark ? DD.mute : DD.p500,
        padding: '3px 7px', borderRadius: 5,
        border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : DD.p100}`,
        background: dark ? 'rgba(255,255,255,0.04)' : DD.p100,
        transform: 'translateY(-6px)',
      }}>M&B</span>
    </div>
  );
}

// Minimal icon set — line-weight matches Figma
const Icon = {
  arrow:    (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>,
  check:    (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>,
  chev:     (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l4 4 4-4"/></svg>,
  spark:    (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.6 5.6L15 8l-5.4 2.4L8 16l-1.6-5.6L1 8l5.4-2.4z"/></svg>,
  msg:      (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6a3 3 0 013-3h8a3 3 0 013 3v5a3 3 0 01-3 3H9l-4 3v-3a3 3 0 01-2-3V6z"/></svg>,
  shield:   (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z"/></svg>,
  bolt:     (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z"/></svg>,
  user:     (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="7" r="3.2"/><path d="M3 17c1-3 4-5 7-5s6 2 7 5"/></svg>,
  chart:    (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17V7M9 17V3M15 17v-7"/></svg>,
  clock:    (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>,
  stack:    (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l8 4-8 4-8-4 8-4zM2 10l8 4 8-4M2 14l8 4 8-4"/></svg>,
  pulse:    (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10h4l2-5 3 10 2-5h5"/></svg>,
  star:     (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2.2 5 5.3.5-4 3.6 1.2 5.2L8 11.6 3.3 14.3l1.2-5.2-4-3.6L5.8 5z"/></svg>,
  play:     (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>,
  x:        (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>,
};

// ─── buttons ─────────────────────────────────────────────────────────
function Btn({ variant = 'primary', children, style, onClick, tone }) {
  const dark = tone === 'dark';
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '14px 22px', borderRadius: 12, cursor: 'pointer',
    fontFamily: 'Montserrat, system-ui, sans-serif',
    fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em',
    transition: 'transform .18s ease, box-shadow .18s ease, background .18s',
    border: 'none', whiteSpace: 'nowrap',
  };
  if (variant === 'primary') return (
    <button onClick={onClick} className="dd-btn-primary" style={{
      ...base,
      background: `linear-gradient(135deg, ${DD.p300} 0%, ${DD.p700} 100%)`,
      color: '#fff',
      boxShadow: `0 10px 30px -12px ${DD.p500}aa, inset 0 1px 0 rgba(255,255,255,0.25)`,
      ...style,
    }}>{children}</button>
  );
  if (variant === 'ghost') return (
    <button onClick={onClick} className="dd-btn-ghost" style={{
      ...base,
      background: dark ? 'rgba(255,255,255,0.06)' : 'transparent',
      color: dark ? DD.text : DD.ink,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : DD.cardLn}`,
      ...style,
    }}>{children}</button>
  );
  return null;
}

window.DD = DD;
window.DDTag = Tag;
window.DDLogo = Logo;
window.DDIcon = Icon;
window.DDBtn = Btn;
