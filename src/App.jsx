// ─── Main Landing Page ────────────────────────────────────────────────
const { useState: useS, useEffect: useE, useRef: useR } = React;
const { Icon } = window; // Note: Icon is already a global from ui.jsx? check
// ui.jsx exports: DDTag, DDLogo, DDIcon, DDBtn, DD
const Tag = window.DDTag, Logo = window.DDLogo, I = window.DDIcon, Btn = window.DDBtn, DD = window.DD;

/* ── TWEAKABLE DEFAULTS ─────────────────────────────────────────────── */
const TWEAKS = /*EDITMODE-BEGIN*/{
  "shader": "silk",
  "accent": "purple"
}/*EDITMODE-END*/;

const ACCENTS = {
  purple: { p300: '#7177F6', p500: '#6A4BEB', p700: '#4D2ADF' },
  violet: { p300: '#A855F7', p500: '#8B5CF6', p700: '#6D28D9' },
  cobalt: { p300: '#6195F6', p500: '#3B6FE5', p700: '#1E40AF' },
  rose:   { p300: '#F472B6', p500: '#E11D74', p700: '#9D174D' },
};

function Nav({ scrolled }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all .3s',
      padding: scrolled ? '14px 32px' : '20px 32px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        background: scrolled ? 'rgba(14,14,16,0.75)' : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 18, padding: '10px 14px 10px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
      }}>
        <Logo dark={true} size={32}/>
        <div className="hide-mobile" style={{ display: 'flex', gap: 28 }}>
          {[
            ['Platform','#platform'],
            ['How it works','#how'],
            ['Cases','#results'],
            ['Integrations','#integrations'],
            ['Pricing','#pricing'],
            ['FAQ','#faq'],
          ].map(([l,h]) => (
            <a key={l} href={h} className="dd-link" style={{
              fontSize: 13, fontWeight: 500, fontFamily: 'IBM Plex Sans, sans-serif',
              letterSpacing: '-0.005em',
            }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="#" className="dd-link hide-mobile" style={{ fontSize: 13, fontWeight: 500, padding: '0 12px' }}>Log in</a>
          <Btn variant="primary" style={{ padding: '10px 18px', fontSize: 13 }}>
            Book a demo <I.arrow s={14}/>
          </Btn>
        </div>
      </div>
    </nav>
  );
}

function Hero({ shader, setShader }) {
  const canvasRef = useR(null);
  return (
    <section style={{ position: 'relative', minHeight: 780, overflow: 'hidden' }}>
      {/* shader layer */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.ShaderCanvas shaderKey={shader} />
      </div>
      {/* bottom fade */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 280,
        background: 'linear-gradient(180deg, rgba(10,10,10,0) 0%, #0A0A0A 100%)',
        pointerEvents: 'none',
      }}/>
      {/* vignette edges */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(1400px 700px at 50% 40%, transparent 40%, rgba(10,10,10,0.55) 100%)',
      }}/>

      {/* content */}
      <div style={{
        position: 'relative', maxWidth: 1280, margin: '0 auto',
        padding: '170px 32px 160px',
      }}>
        <div style={{ marginBottom: 28 }}>
          <Tag tone="dark" icon={(p) => <I.spark {...p}/>}>
            AI admin for Medicine & Beauty
          </Tag>
        </div>

        <h1 className="display" style={{
          fontSize: 'clamp(48px, 7vw, 88px)',
          lineHeight: 0.98, margin: 0, color: '#fff',
          maxWidth: 1100,
          textWrap: 'balance',
        }}>
          Your clinic replies in{' '}
          <span style={{
            background: `linear-gradient(135deg, ${DD.p300} 0%, #C6CCFF 60%, #fff 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>two minutes.</span>
          <br/>
          Not twenty. And it still sounds like you.
        </h1>

        <p style={{
          fontSize: 18, lineHeight: 1.55, color: DD.muted2,
          maxWidth: 580, marginTop: 28, marginBottom: 40,
          fontWeight: 400,
        }}>
          DataDial reads every client message, drafts a perfect reply using your knowledge base
          and CRM, and your admin approves with one click. Faster responses,
          consistent brand voice, zero extra hires.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
          <Btn variant="primary">Book a 20-min demo <I.arrow/></Btn>
          <Btn variant="ghost" tone="dark"><I.play s={12}/> Watch 90-sec tour</Btn>
        </div>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            'No IT setup',
            'We configure everything',
            'Live in 3–5 days',
            'HIPAA-friendly',
          ].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, color: DD.muted2, fontFamily: 'IBM Plex Sans, sans-serif' }}>
              <span style={{ color: DD.p300 }}><I.check s={13}/></span>{t}
            </div>
          ))}
        </div>

        {/* corner HUD */}
        <div style={{
          position: 'absolute', top: 170, right: 32,
          display: 'flex', flexDirection: 'column', gap: 8,
          alignItems: 'flex-end',
        }} className="hide-mobile">
          <div className="mono" style={{
            fontSize: 10, letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
          }}>Surface · {shader}</div>
          <div className="mono" style={{
            fontSize: 10, letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.3)',
          }}>— move · click —</div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { v: '78%',   l: 'of patients book with the first clinic to reply',  s: 'They message 3 at once' },
    { v: '67%',   l: 'of inquiries arrive outside business hours',        s: 'Evenings · weekends · holidays' },
    { v: '$150K', l: 'average annual revenue lost to slow replies',       s: 'Per single-location clinic' },
    { v: '5 min', l: 'window before a new lead goes cold',                s: 'After that they’ve moved on' },
  ];
  return (
    <section style={{ padding: '40px 32px 80px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          border: `1px solid rgba(255,255,255,0.08)`,
          background: `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ padding: '32px 40px 24px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: DD.p300, marginBottom: 10,
            }}>The reality of client communication</div>
            <div className="display" style={{
              fontSize: 28, lineHeight: 1.15, color: '#fff', maxWidth: 680,
            }}>While you're treating patients, potential new ones are reaching out — and not getting answers.</div>
          </div>
          <div className="stats-row" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          }}>
            {stats.map((s,i) => (
              <div key={i} style={{
                padding: '28px 32px',
                borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : 'none',
              }}>
                <div className="display" style={{
                  fontSize: 44, lineHeight: 1, marginBottom: 10,
                  background: `linear-gradient(135deg, #fff 0%, ${DD.p300} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.03em',
                }}>{s.v}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: 6 }}>{s.l}</div>
                <div className="mono" style={{ fontSize: 11, color: DD.mute, letterSpacing: '0.02em' }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', i: I.msg,   t: 'Client sends a message',
      d: 'Instagram DM, WhatsApp, web chat, SMS or email — every channel lands in one shared inbox. No more juggling five apps.' },
    { n: '02', i: I.spark, t: 'AI drafts a perfect reply',
      d: "Trained on your services, pricing and internal docs — DataDial reads the message and writes a ready-to-send reply in seconds, in your clinic's tone." },
    { n: '03', i: I.check, t: 'Admin reviews, clicks send',
      d: "Your team reads the draft, makes any edits, and approves. Every reply goes out under your clinic's name — quality guaranteed." },
  ];
  return (
    <section id="how" style={{ padding: '100px 32px', background: DD.ink }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Tag tone="dark">How it works</Tag>
          <h2 className="display" style={{
            fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
            margin: '20px auto 16px', maxWidth: 780, color: '#fff',
          }}>AI prepares. Your team approves. Clients love it.</h2>
          <p style={{ fontSize: 16, color: DD.muted2, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            The only assistant in this space built on a human-in-the-loop philosophy —
            because your brand voice matters.
          </p>
        </div>

        <div className="three-col" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '32px 28px',
              background: `linear-gradient(180deg, rgba(113,119,246,0.10) 0%, rgba(77,42,223,0.03) 100%)`,
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 20, position: 'relative', overflow: 'hidden',
            }} className="feature-card">
              {/* corner glow */}
              <div style={{
                position: 'absolute', top: -80, right: -80, width: 200, height: 200,
                background: `radial-gradient(circle, ${DD.p500}33 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}/>
              <div className="mono" style={{
                fontSize: 12, color: DD.p300, letterSpacing: '0.14em',
                marginBottom: 24, fontWeight: 600,
              }}>{s.n}</div>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${DD.p300}, ${DD.p700})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', marginBottom: 20,
                boxShadow: `0 10px 30px -10px ${DD.p500}`,
              }}>
                <s.i s={22}/>
              </div>
              <div className="display" style={{ fontSize: 22, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>
                {s.t}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: DD.muted2 }}>{s.d}</div>
            </div>
          ))}
        </div>

        {/* HITL callout */}
        <div style={{
          marginTop: 28, padding: '22px 32px',
          background: 'rgba(106,75,235,0.10)',
          border: '1px solid rgba(113,119,246,0.25)',
          borderRadius: 16, display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${DD.p300}, ${DD.p700})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0,
          }}><I.shield s={20}/></div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: DD.text }}>
            <strong style={{ color: '#fff' }}>Human-in-the-loop by design.</strong>{' '}
            <span style={{ color: DD.muted2 }}>Unlike fully automated bots, DataDial never sends anything without your team's approval.
            Your clients always get a human-quality response — backed by AI speed.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  const items = [
    { i: I.clock, t: 'Slow responses cost you bookings',
      d: 'Clients message 3 clinics at once. The first to reply wins. Your staff can’t always respond instantly — especially after hours or during treatments.' },
    { i: I.user, t: 'Reply quality depends on who’s on shift',
      d: 'One admin is great on the phone. Another types vague one-liners. New staff don’t know the price list. Clients notice the inconsistency.' },
    { i: I.stack, t: 'Too many apps, too much switching',
      d: 'Instagram DMs, WhatsApp, website chat, email, SMS — your team jumps between five apps all day. Messages fall through the cracks.' },
    { i: I.pulse, t: 'Upsells and follow-ups never happen',
      d: 'After every appointment there’s a chance to recommend a next visit, a related service, or request a review. Without automation, it simply doesn’t.' },
  ];
  return (
    <section id="platform" style={{ padding: '100px 32px', background: DD.ink2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Tag tone="dark">The problem</Tag>
          <h2 className="display" style={{
            fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
            margin: '20px 0 0', color: '#fff',
          }}>Your front desk is losing bookings every day.</h2>
        </div>
        <div className="two-col" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        }}>
          {items.map((it, i) => (
            <div key={i} className="feature-card" style={{
              padding: '26px 28px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: 18, display: 'flex', gap: 18, alignItems: 'flex-start',
            }}>
              <div style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: 11,
                background: 'rgba(224,85,85,0.10)',
                border: '1px solid rgba(224,85,85,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#F47878',
              }}><it.i s={18}/></div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{it.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: DD.muted2 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { i: I.msg,    t: 'AI drafts every reply',
      d: 'Trained on your services, prices, and policies — DataDial reads the client message and writes a ready-to-send response in seconds.' },
    { i: I.check,  t: 'Human reviews, then sends',
      d: 'Your admin reads the draft, edits if needed, clicks Send. You stay in control of every word that reaches your clients.' },
    { i: I.shield, t: 'Knowledge base stays current',
      d: 'Upload your price list, service descriptions, and internal docs once. The AI uses them — and updates automatically when you change them.' },
    { i: I.stack,  t: 'Unified team inbox',
      d: 'All client messages from every channel in one place. Assign conversations to team members, leave internal notes, no inbox chaos.' },
    { i: I.chart,  t: 'Response analytics',
      d: 'See average response time, volume by channel, and which message types take the most staff effort — to optimize over time.' },
    { i: I.bolt,   t: 'CRM & booking integration',
      d: 'Connects to your booking system and CRM. The AI sees client history and personalizes every reply with their name and past visits.' },
  ];
  return (
    <section id="features" style={{ padding: '100px 32px', background: DD.ink }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: 20, marginBottom: 56,
        }}>
          <div style={{ maxWidth: 680 }}>
            <Tag tone="dark">Platform</Tag>
            <h2 className="display" style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
              margin: '20px 0 0', color: '#fff',
            }}>Everything your front desk needs.</h2>
          </div>
          <Btn variant="ghost" tone="dark">See all features <I.arrow s={14}/></Btn>
        </div>
        <div className="three-col" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
        }}>
          {features.map((f,i) => (
            <div key={i} className="feature-card" style={{
              padding: '28px 28px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(113,119,246,0.14)',
                border: '1px solid rgba(113,119,246,0.24)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: DD.p300, marginBottom: 18,
              }}><f.i s={20}/></div>
              <div className="display" style={{ fontSize: 18, color: '#fff', marginBottom: 8, letterSpacing: '-0.005em' }}>{f.t}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.65, color: DD.muted2 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="results" style={{ padding: '100px 32px', background: DD.ink2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Tag tone="dark">Results</Tag>
          <h2 className="display" style={{
            fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
            margin: '20px 0 0', color: '#fff',
          }}>How clinics use DataDial in the wild.</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0,
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: 24, overflow: 'hidden',
        }} className="two-col">
          <div style={{
            padding: '48px 48px',
            background: `linear-gradient(160deg, rgba(113,119,246,0.12) 0%, transparent 70%)`,
            borderRight: `1px solid rgba(255,255,255,0.08)`,
          }}>
            <div style={{ display: 'flex', gap: 3, color: DD.p300, marginBottom: 24 }}>
              {[1,2,3,4,5].map(n => <I.star key={n} s={16}/>)}
            </div>
            <blockquote className="display" style={{
              margin: 0, fontSize: 24, lineHeight: 1.35, color: '#fff',
              fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
              letterSpacing: '-0.01em',
            }}>
              “Marketing was bringing in leads, but conversion was low — admins couldn’t keep
              up with message volume. After DataDial, we stopped losing people in the chat.”
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 32 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `linear-gradient(135deg, ${DD.p300}, ${DD.violet})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 16,
              }}>A</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Anna R.</div>
                <div className="mono" style={{ fontSize: 11, color: DD.mute, letterSpacing: '0.02em' }}>
                  Owner · Medical Aesthetics Clinic · New York
                </div>
              </div>
            </div>
          </div>
          <div style={{
            padding: '48px 40px', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', gap: 28,
          }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: DD.p300, marginBottom: 4,
            }}>Results after 60 days</div>
            {[
              ['+45%',      'Conversion rate',            'From first message to booked appointment'],
              ['8 / 10',    'New clients book after first reply', 'vs 4 / 10 before DataDial'],
              ['1m 47s',    'Average response time',       'Down from 12 minutes'],
            ].map(([v,l,s]) => (
              <div key={v}>
                <div className="display" style={{
                  fontSize: 40, letterSpacing: '-0.03em', lineHeight: 1,
                  background: `linear-gradient(135deg, #fff 0%, ${DD.p300} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: 6,
                }}>{v}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{l}</div>
                <div className="mono" style={{ fontSize: 11, color: DD.mute, marginTop: 3 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const tools = [
    'Instagram', 'WhatsApp Business', 'Telegram', 'SMS', 'Web Chat', 'Email',
    'Mindbody', 'Jane App', 'Zenoti', 'HubSpot', 'Salesforce', 'Google Calendar',
  ];
  return (
    <section id="integrations" style={{ padding: '80px 32px', background: DD.ink }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Tag tone="dark">Integrations</Tag>
          <h2 className="display" style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.1,
            margin: '20px 0 10px', color: '#fff',
          }}>Works with the tools you already use.</h2>
          <p style={{ fontSize: 15, color: DD.muted2, margin: 0 }}>
            No need to change your booking system or CRM.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tools.map(t => (
            <div key={t} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '11px 20px',
              fontSize: 13, fontWeight: 500, color: DD.muted2,
              fontFamily: 'IBM Plex Sans, sans-serif',
            }}>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Does the AI send messages automatically without my team reviewing?",
      a: "Never. DataDial is human-in-the-loop by design: the AI prepares a draft and your admin approves it before anything is sent. You have full control over every message that reaches your clients." },
    { q: "Which channels does DataDial work with?",
      a: "Instagram DMs, WhatsApp Business, Telegram, SMS, web chat, and email. All conversations land in one shared inbox — no more switching between five apps." },
    { q: "How long does setup take?",
      a: "Our team handles the full setup — we upload your documents, configure your assistants, and test everything. Most practices are live within 3–5 business days, with no IT effort on your side." },
    { q: "What if a client asks something the AI doesn’t know?",
      a: "The AI flags the message and routes it to your team with a note. Your admin handles it directly. The AI only suggests responses when it has enough context to answer accurately." },
    { q: "Is client data secure?",
      a: "Yes. All conversations are encrypted in transit and at rest. Each account is fully isolated — no data is shared between practices. We’re designed for healthcare-adjacent environments." },
    { q: "What’s the pricing?",
      a: "Plans start at $149/month for a single location, including setup, inbox, and up to 3 AI assistants. Custom pricing for multi-location practices. Book a demo and we’ll build a quote for your team." },
  ];
  const [open, setOpen] = useS(0);
  return (
    <section id="faq" style={{ padding: '100px 32px', background: DD.ink2 }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '360px 1fr', gap: 64,
      }} className="two-col">
        <div>
          <Tag tone="dark">FAQ</Tag>
          <h2 className="display" style={{
            fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.05,
            margin: '20px 0 16px', color: '#fff',
          }}>Common questions.</h2>
          <p style={{ fontSize: 15, color: DD.muted2, lineHeight: 1.6, marginBottom: 24 }}>
            Can’t find what you’re looking for? Book a quick demo — we answer everything live.
          </p>
          <Btn variant="primary">Talk to our team <I.arrow s={14}/></Btn>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div key={i} className="faq-item" style={{
              borderBottom: `1px solid rgba(255,255,255,0.08)`,
            }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', padding: '22px 0', background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                color: DD.text, fontFamily: 'Montserrat, sans-serif',
                fontSize: 16, fontWeight: 600,
              }}>
                <span>{f.q}</span>
                <span style={{
                  transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform .25s', color: DD.mute, flexShrink: 0,
                }}><I.chev s={18}/></span>
              </button>
              <div style={{
                maxHeight: open === i ? 200 : 0, overflow: 'hidden',
                transition: 'max-height .35s ease',
              }}>
                <div style={{
                  fontSize: 14, lineHeight: 1.7, color: DD.muted2,
                  paddingBottom: 22, maxWidth: 640,
                }}>{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="pricing" style={{ padding: '100px 32px', background: DD.ink }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 32, padding: '80px 56px',
          background: `linear-gradient(135deg, ${DD.p700} 0%, ${DD.p500} 45%, ${DD.violet} 100%)`,
          textAlign: 'center',
        }}>
          {/* decorative orbs */}
          <div style={{ position: 'absolute', top: -140, right: -80, width: 400, height: 400,
            borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', bottom: -120, left: -60, width: 340, height: 340,
            borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}/>

          <div style={{ position: 'relative' }}>
            <div className="mono" style={{
              display: 'inline-block',
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(255,255,255,0.18)',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
              color: '#fff', marginBottom: 24, textTransform: 'uppercase',
            }}>Free 20-minute demo</div>
            <h2 className="display" style={{
              fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05,
              margin: '0 auto 20px', color: '#fff', maxWidth: 780,
            }}>See DataDial running on your clinic’s actual messages.</h2>
            <p style={{
              fontSize: 17, color: 'rgba(255,255,255,0.85)', maxWidth: 540,
              margin: '0 auto 36px', lineHeight: 1.55,
            }}>
              We show you a live demo, answer every question, and set up a free pilot.
              No commitment — just 20 minutes.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="dd-btn-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#fff', color: DD.p700,
                border: 'none', padding: '16px 28px', borderRadius: 12,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
              }}>
                Book a demo <I.arrow s={15}/>
              </button>
              <button className="dd-btn-ghost" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'transparent', color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.4)',
                padding: '14.5px 26px', borderRadius: 12,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                <I.play s={12}/> Watch 2-min overview
              </button>
            </div>
            <div style={{
              display: 'flex', gap: 28, justifyContent: 'center',
              marginTop: 32, flexWrap: 'wrap',
            }}>
              {['No credit card', 'Setup included', 'Cancel anytime'].map(t => (
                <div key={t} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                  <I.check s={12}/> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '52px 32px 32px', background: DD.ink, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 40, marginBottom: 40,
        }} className="two-col">
          <div>
            <Logo dark={true} size={30}/>
            <p style={{
              fontSize: 13, color: DD.mute, maxWidth: 280, lineHeight: 1.6,
              marginTop: 16,
            }}>
              AI admin assistant for beauty clinics and medical spas.
              AI prepares, humans approve.
            </p>
          </div>
          {[
            ['Product', ['How it works','Features','Integrations','Pricing']],
            ['Company', ['About','Blog','Careers','Contact']],
            ['Legal',   ['Privacy Policy','Terms of Service','HIPAA']],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="mono" style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: DD.p300, marginBottom: 16,
              }}>{title}</div>
              {links.map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" className="dd-link" style={{ fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif' }}>{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        }}>
          <div className="mono" style={{ fontSize: 11, color: DD.mute, letterSpacing: '0.04em' }}>
            © 2026 DataDial · All rights reserved
          </div>
          <div className="mono" style={{ fontSize: 11, color: DD.mute, letterSpacing: '0.04em' }}>
            Made for clinics that care about quality.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── The live AI demo section — chat mockup with some chrome ────────── */
function LiveDemo() {
  return (
    <section style={{ padding: '100px 32px', background: DD.ink2, position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid',
        gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }} className="two-col">
        <div>
          <Tag tone="dark">Watch it work</Tag>
          <h2 className="display" style={{
            fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.05,
            margin: '20px 0 20px', color: '#fff',
          }}>Two cases. Same workflow.<br/>Every message handled with care.</h2>
          <p style={{ fontSize: 16, color: DD.muted2, lineHeight: 1.65, marginBottom: 24, maxWidth: 480 }}>
            DataDial handles the routine — pricing questions, booking times,
            follow-ups — and flags sensitive cases like post-procedure concerns
            so your senior team can step in directly.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            {[
              ['AI reads message in under 2s', DD.p300],
              ['Drafts reply trained on your protocols', DD.p300],
              ['Admin approves with one click', '#4DB380'],
              ['Sent under your clinic’s name', '#4DB380'],
            ].map(([t,c]) => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ color: c, display: 'flex' }}><I.check s={14}/></span>
                <span style={{ fontSize: 14, color: DD.text, fontFamily: 'IBM Plex Sans, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
          <Btn variant="ghost" tone="dark">Book a live walkthrough <I.arrow s={14}/></Btn>
        </div>
        <div>
          <window.ChatMockup/>
        </div>
      </div>
    </section>
  );
}

/* ── TWEAKS panel ───────────────────────────────────────────────────── */
function TweaksPanel({ value, setValue }) {
  const [active, setActive] = useS(false);
  useE(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setActive(true);
      if (e.data.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  if (!active) return null;

  const persist = (patch) => {
    const next = { ...value, ...patch };
    setValue(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 100,
      width: 280, background: 'rgba(14,14,16,0.94)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 16, padding: '16px 18px',
      boxShadow: '0 20px 60px -10px rgba(0,0,0,0.6)',
      fontFamily: 'IBM Plex Sans, sans-serif',
    }}>
      <div className="mono" style={{
        fontSize: 10, letterSpacing: '0.14em', color: DD.p300,
        textTransform: 'uppercase', marginBottom: 12, fontWeight: 600,
      }}>Tweaks</div>
      <div style={{ fontSize: 11, color: DD.mute, marginBottom: 8, fontWeight: 500 }}>
        Hero shader wallpaper
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 14 }}>
        {window.DD_SHADERS.list.map(s => {
          const on = value.shader === s.key;
          return (
            <button key={s.key} onClick={() => persist({ shader: s.key })} style={{
              padding: 0, height: 40, border: on ? `2px solid ${DD.p300}` : `1px solid rgba(255,255,255,0.10)`,
              borderRadius: 8, cursor: 'pointer', overflow: 'hidden', position: 'relative',
              background: '#000',
            }} title={s.label}>
              <ShaderThumb shaderKey={s.key}/>
            </button>
          );
        })}
      </div>
      <div className="mono" style={{ fontSize: 10, color: DD.mute, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span>
          {window.DD_SHADERS.list.find(s => s.key === value.shader)?.label}
          <span style={{ color: DD.muted2 }}> · saved</span>
        </span>
        <button
          onClick={() => {
            try { localStorage.removeItem('datadial.tweaks.v1'); } catch {}
            persist({ shader: 'aurora' });
          }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: DD.mute, fontFamily: 'inherit', fontSize: 10,
            letterSpacing: '0.04em', padding: 0,
          }}>reset</button>
      </div>
    </div>
  );
}

function ShaderThumb({ shaderKey }) {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <window.ShaderCanvas shaderKey={shaderKey}/>
    </div>
  );
}

/* ── Root ───────────────────────────────────────────────────────────── */
const LS_KEY = 'datadial.tweaks.v1';

function loadTweaks() {
  // Priority: localStorage (user choice) > EDITMODE default (designer default)
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // validate shader key still exists
      const valid = window.DD_SHADERS?.list?.some(s => s.key === saved.shader);
      return { ...TWEAKS, ...saved, shader: valid ? saved.shader : TWEAKS.shader };
    }
  } catch {}
  return TWEAKS;
}

function App() {
  const [tweaks, setTweaks] = useS(loadTweaks);
  const [scrolled, setScrolled] = useS(false);

  // Persist to localStorage on every change
  useE(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(tweaks)); } catch {}
  }, [tweaks]);

  useE(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <>
      <Nav scrolled={scrolled}/>
      <Hero shader={tweaks.shader} setShader={(k) => setTweaks(v => ({ ...v, shader: k }))}/>
      <StatsStrip/>
      <Problems/>
      <LiveDemo/>
      <HowItWorks/>
      <Features/>
      <CaseStudy/>
      <Integrations/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>
      <TweaksPanel value={tweaks} setValue={setTweaks}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
