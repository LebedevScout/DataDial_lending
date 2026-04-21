// ─── ChatMockup v2 — modeled on real DataDial interface ─────────────────
// Left rail with contact list + active highlight, main pane with Jessica
// conversation. Steps add bubbles into a fixed-height scroll area so the
// outer frame never reflows.

const { useState, useEffect, useRef } = React;

function ChatMockup() {
  const [step, setStep] = useState(0);
  const TOTAL = 5; // 0 client, 1 AI draft, 2 admin reviewing, 3 sent, 4 follow-up
  useEffect(() => {
    const d = step === TOTAL - 1 ? 3400 : step === 0 ? 1100 : 1700;
    const t = setTimeout(() => setStep(s => (s + 1) % TOTAL), d);
    return () => clearTimeout(t);
  }, [step]);

  // auto-scroll to bottom when new bubble appears
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [step]);

  const inbox = [
    { name: 'Jessica M.',   ch: 'Instagram DM', last: 'interested in Botox…', unread: 2, active: true,  color: '#7F85F7' },
    { name: 'Anna K.',      ch: 'WhatsApp',     last: 'jaw has been hurting', unread: 1, active: false, color: '#E05555' },
    { name: 'Sofia R.',     ch: 'Web chat',     last: 'do you take HSA?',     unread: 0, active: false, color: '#6A4BEB' },
    { name: 'Marcus T.',    ch: 'Email',        last: 'reschedule request',   unread: 0, active: false, color: '#FBA20A' },
    { name: 'Priya S.',     ch: 'Instagram DM', last: 'price for lip filler', unread: 0, active: false, color: '#2D6A4F' },
  ];

  return (
    <div style={{
      background: '#fff', borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 30px 80px -20px rgba(10,10,10,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
      fontFamily: 'Montserrat, sans-serif', color: DD.ink,
      border: '1px solid #E4E6EB',
    }}>
      {/* window bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '11px 16px', borderBottom: '1px solid #E4E6EB',
        background: '#F4F5F7',
      }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(x => (
          <div key={x} style={{ width: 11, height: 11, borderRadius: '50%', background: x }}/>
        ))}
        <span className="mono" style={{
          marginLeft: 8, fontSize: 10, color: '#95959E',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>datadial · inbox</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['Dashboard','Inbox','Analytics','Settings'].map((t,i) => (
            <div key={t} className="mono" style={{
              fontSize: 9, padding: '3px 8px', borderRadius: 5,
              background: i===1 ? '#EDEDFE' : 'transparent',
              color: i===1 ? '#4D2ADF' : '#95959E',
              fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 500 }}>

        {/* ─── LEFT: inbox list ─────────────────────────────────────── */}
        <div style={{ borderRight: '1px solid #E4E6EB', background: '#FAFAFC', padding: '14px 10px' }}>
          {/* search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', background: '#fff',
            border: '1px solid #D5D7DB', borderRadius: 8,
            marginBottom: 12,
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#95959E" strokeWidth="1.6">
              <circle cx="7" cy="7" r="4.5"/><path d="M13 13l-2.5-2.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 11, color: '#95959E' }}>Search conversations</span>
          </div>

          <div className="mono" style={{
            fontSize: 9, color: '#95959E', letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '4px 10px 8px', fontWeight: 600,
          }}>Inbox · 5 open</div>

          {inbox.map((c, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: '8px 10px', borderRadius: 8,
              background: c.active ? '#EBF0FF' : 'transparent',
              marginBottom: 2, cursor: 'default',
              position: 'relative',
            }}>
              {c.active && (
                <div style={{
                  position: 'absolute', left: -10, top: 4, bottom: 4, width: 3,
                  borderRadius: 2, background: '#7F85F7',
                }}/>
              )}
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 11, fontWeight: 700,
              }}>{c.name[0]}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: DD.ink,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{c.name}</div>
                <div style={{
                  fontSize: 10, color: '#95959E',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{c.last}</div>
              </div>
              {c.unread > 0 && (
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#D65151', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700,
                }}>{c.unread}</div>
              )}
            </div>
          ))}
        </div>

        {/* ─── RIGHT: conversation ────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* contact header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', borderBottom: '1px solid #E4E6EB',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7F85F7, #6A4BEB)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 14,
            }}>J</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: DD.ink }}>Jessica M.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#2D6A4F',
                }}/>
                <span className="mono" style={{
                  fontSize: 10, color: '#5C5C62', letterSpacing: '0.02em',
                }}>Instagram DM · active now</span>
              </div>
            </div>
            <div style={{
              marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <div className="mono" style={{
                fontSize: 9, padding: '4px 8px', borderRadius: 6,
                background: '#E8F5EE', color: '#2D6A4F',
                fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>Booking inquiry</div>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                border: '1px solid #E4E6EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#5C5C62',
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* step rail — exactly like interface */}
          <div style={{
            display: 'flex', gap: 0, padding: '10px 16px',
            background: '#FAFAFC', borderBottom: '1px solid #E4E6EB',
          }}>
            {[
              { n: '01', l: 'Client writes' },
              { n: '02', l: 'AI drafts' },
              { n: '03', l: 'Admin reviews' },
              { n: '04', l: 'Sent' },
              { n: '05', l: 'Follow-up' },
            ].map((s, i) => {
              const done = step > i;
              const active = step === i;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    background: done ? '#2D6A4F' : active ? '#6A4BEB' : '#fff',
                    border: `1.5px solid ${done ? '#2D6A4F' : active ? '#6A4BEB' : '#D5D7DB'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 8, fontWeight: 700,
                    transition: 'all .35s',
                  }}>
                    {done
                      ? <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>
                      : s.n.slice(1)}
                  </div>
                  <div className="mono" style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.02em',
                    color: done ? '#2D6A4F' : active ? '#4D2ADF' : '#95959E',
                  }}>{s.l}</div>
                  {i < 4 && (
                    <div style={{
                      flex: 1, height: 1, marginLeft: 6, marginRight: 2,
                      background: done ? '#2D6A4F' : '#E4E6EB',
                    }}/>
                  )}
                </div>
              );
            })}
          </div>

          {/* message stream — fixed height so outer card is static */}
          <div ref={scrollRef} style={{
            height: 340, overflow: 'hidden auto',
            padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10,
            background: '#fff',
          }}>
            {/* timestamp chip */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
              <span className="mono" style={{
                fontSize: 9, color: '#95959E', padding: '3px 10px',
                background: '#F4F5F7', borderRadius: 10, letterSpacing: '0.04em',
              }}>Today · 14:07</span>
            </div>

            {/* 01 — client */}
            {step >= 0 && (
              <Bubble side="left" tail>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: DD.ink }}>
                  Hi! I'm interested in Botox — how much is it and do you have openings this week? 💜
                </div>
                <Meta time="14:07" ch="Instagram DM"/>
              </Bubble>
            )}

            {/* 02 — AI draft */}
            {step >= 1 && (
              <DraftCard>
                <div className="mono" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 9, fontWeight: 700, color: '#4D2ADF',
                  background: '#EDEDFE', padding: '3px 8px', borderRadius: 5,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.6 5.6L15 8l-5.4 2.4L8 16l-1.6-5.6L1 8l5.4-2.4z"/></svg>
                  AI draft · awaiting approval
                </div>
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: DD.ink }}>
                  Hi Jessica, thank you so much for reaching out to our clinic 💜<br/><br/>
                  Happy to confirm — yes, we offer Botox this week and I'd love to get you in. Our Botox is performed by board-certified injectors using premium Allergan product, with a complimentary consultation to map the exact areas that will give you the most natural result. Most clients feel zero downtime and see first changes in 3–5 days.<br/><br/>
                  Pricing is <b>$14/unit</b> (typical forehead + frown: 25–35 units ≈ <b>$350–490</b>; full upper face: 40–50 units ≈ <b>$560–700</b>). Consultation is on us.<br/><br/>
                  I currently have <b>Thursday at 2:00 PM</b> and <b>Friday at 10:30 AM</b> open with Dr. Lee — would either of those work for you?
                </div>
                {/* sources chip — like the real interface */}
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {['Price list v3', 'Services · Botox', 'Calendar · next 7d'].map(s => (
                    <span key={s} className="mono" style={{
                      fontSize: 9, padding: '3px 7px', borderRadius: 5,
                      background: '#F4F5F7', color: '#5C5C62', letterSpacing: '0.02em',
                      border: '1px solid #E4E6EB',
                    }}>📎 {s}</span>
                  ))}
                </div>
                {step === 1 && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                    <button style={btnApprove}>
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>
                      Approve & send
                    </button>
                    <button style={btnEdit}>Edit</button>
                    <button style={btnEdit}>Regenerate</button>
                  </div>
                )}
              </DraftCard>
            )}

            {/* 03 — admin review */}
            {step === 2 && (
              <SystemRow icon="user" tone="purple">
                <b>Admin Marina</b> is reviewing the draft…
                <span className="mono" style={{ marginLeft: 8, opacity: 0.7, fontSize: 10 }}>editing tone</span>
              </SystemRow>
            )}

            {/* 04 — sent — draft becomes real reply */}
            {step >= 3 && (
              <Bubble side="right" tail>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#fff' }}>
                  Hi Jessica, thank you for reaching out 💜 Happy to confirm — our Botox is done by a board-certified injector with premium Allergan product and a complimentary consultation. Pricing is <b>$14/unit</b> (typical forehead + frown runs <b>$350–490</b>). I have <b>Thursday 2:00 PM</b> and <b>Friday 10:30 AM</b> open with Dr. Lee — which works better for you?
                </div>
                <Meta time="14:08" ch="Sent via Instagram" ok right/>
              </Bubble>
            )}
            {step >= 3 && (
              <SystemRow icon="check" tone="green">
                <b>Approved by Marina · sent in 1 min 47 sec</b>
              </SystemRow>
            )}

            {/* 05 — follow-up reply */}
            {step >= 4 && (
              <Bubble side="left">
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: DD.ink }}>
                  Thursday 2 PM works! Should I pre-pay or is it on arrival?
                </div>
                <Meta time="14:11" ch="Instagram DM"/>
              </Bubble>
            )}
          </div>

          {/* composer */}
          <div style={{
            padding: '12px 16px', borderTop: '1px solid #E4E6EB',
            background: '#FAFAFC', display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <div style={{
              flex: 1, padding: '9px 14px', borderRadius: 10,
              background: '#fff', border: '1px solid #D5D7DB',
              fontSize: 11, color: '#95959E',
            }}>
              {step >= 4 ? 'AI is drafting a reply…' : 'Write a reply or let AI draft it…'}
            </div>
            <button style={{
              width: 34, height: 34, borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #7177F6, #4D2ADF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer',
            }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2l12 6-12 6 2-6-2-6z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── bubble primitives ──────────────────────────────────────────────
function Bubble({ side, tail, children }) {
  const right = side === 'right';
  return (
    <div style={{
      display: 'flex', justifyContent: right ? 'flex-end' : 'flex-start',
      animation: 'bubble-in .32s ease-out',
    }}>
      <div style={{
        maxWidth: '82%',
        background: right
          ? 'linear-gradient(135deg, #7177F6, #4D2ADF)'
          : '#F4F5F7',
        color: right ? '#fff' : DD.ink,
        padding: '10px 14px',
        borderRadius: tail
          ? (right ? '14px 14px 4px 14px' : '14px 14px 14px 4px')
          : 14,
        boxShadow: right ? '0 6px 18px -8px rgba(77,42,223,0.55)' : 'none',
      }}>{children}</div>
    </div>
  );
}

function Meta({ time, ch, ok, right }) {
  return (
    <div className="mono" style={{
      fontSize: 9, marginTop: 5, letterSpacing: '0.02em',
      color: right ? 'rgba(255,255,255,0.72)' : '#95959E',
      display: 'flex', alignItems: 'center', gap: 5,
      justifyContent: right ? 'flex-end' : 'flex-start',
    }}>
      {time} · {ch}
      {ok && (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9l3 3 6-6M7 9l3 3 5-6"/>
        </svg>
      )}
    </div>
  );
}

function DraftCard({ children }) {
  return (
    <div style={{
      alignSelf: 'flex-start', maxWidth: '94%',
      background: 'rgba(113,119,246,0.07)',
      border: '1.5px dashed rgba(113,119,246,0.45)',
      borderRadius: 14, padding: '12px 14px',
      animation: 'bubble-in .32s ease-out',
    }}>{children}</div>
  );
}

function SystemRow({ icon, tone, children }) {
  const palette = tone === 'green'
    ? { bg: 'rgba(45,106,79,0.08)', fg: '#2D6A4F', bd: 'rgba(45,106,79,0.22)' }
    : { bg: 'rgba(113,119,246,0.08)', fg: '#4D2ADF', bd: 'rgba(113,119,246,0.22)' };
  const IconEl = icon === 'check'
    ? <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>
    : <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="7" r="3.2"/><path d="M3 17c1-3 4-5 7-5s6 2 7 5"/></svg>;
  return (
    <div style={{
      alignSelf: 'center',
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', borderRadius: 100,
      background: palette.bg, border: `1px solid ${palette.bd}`,
      color: palette.fg, fontSize: 11, fontWeight: 500,
      fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: '0.01em',
      animation: 'bubble-in .32s ease-out',
    }}>
      {IconEl}<span>{children}</span>
    </div>
  );
}

const btnApprove = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '7px 12px', border: 'none', cursor: 'pointer',
  borderRadius: 8, background: 'linear-gradient(135deg, #7177F6, #4D2ADF)',
  color: '#fff', fontSize: 11, fontWeight: 700,
  fontFamily: 'Montserrat, sans-serif',
  boxShadow: '0 6px 14px -6px rgba(77,42,223,0.55)',
};
const btnEdit = {
  padding: '7px 12px', border: '1px solid #D5D7DB', cursor: 'pointer',
  borderRadius: 8, background: '#fff',
  color: '#5C5C62', fontSize: 11, fontWeight: 600,
  fontFamily: 'Montserrat, sans-serif',
};

// inject keyframe once
if (typeof document !== 'undefined' && !document.getElementById('dd-chat-kf')) {
  const s = document.createElement('style'); s.id = 'dd-chat-kf';
  s.textContent = `@keyframes bubble-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`;
  document.head.appendChild(s);
}

window.ChatMockup = ChatMockup;
