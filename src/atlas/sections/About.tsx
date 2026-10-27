import portrait from '@/assets/profile-photo.webp';
import { offClock, spoken, stats } from '@/data/portfolio';
import { CountUp, MaskLines, PlateHead, Reveal } from '../ui';

const About = () => (
  <section id="about" className="a-section" style={{ background: 'linear-gradient(to bottom, transparent, var(--paper) 140px)' }}>
    <div className="a-wrap">
      <PlateHead n="01" label="The surveyor" right="Fig. 1" />
      <div style={{ display: 'grid', gap: 'clamp(32px,6vw,96px)' }} className="about-grid">
        <Reveal>
          <figure style={{ margin: 0, maxWidth: 420 }}>
            <div className="a-plate">
              <div style={{ aspectRatio: '896 / 1060', overflow: 'hidden', background: '#10151d' }}>
                <img src={portrait} alt="Portrait of Satwik K. Udupi" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <figcaption className="a-caption"><span>Fig. 1 — Satwik K. Udupi</span><span>B.Tech Agri. Engg · CGPA 8.27</span></figcaption>
          </figure>
        </Reveal>

        <div>
          <h2 className="a-h2" style={{ marginBottom: 'clamp(24px,3vw,40px)' }}>
            <MaskLines lines={[<>Rivers are data</>, <>with <span className="a-em">consequences.</span></>]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="a-lede" style={{ color: 'var(--ink)' }}>
              I’m an agricultural engineer who ended up in hydrology: I build the models that say how fast a flood arrives, how deep it gets,
              and which villages, fields and bridges are in the way.
            </p>
            <p className="a-lede" style={{ marginTop: 18 }}>
              Beyond research my work spans dam-break and flood-frequency analysis, watershed conservation, remote-sensing erosion studies, GIS mapping and NGO CSR reporting.
              I also run <a href="#pravaha" className="a-link" style={{ color: 'var(--ink)', fontWeight: 600 }}>Pravaha Tattva Solutions</a>, taking these methods to client projects.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="off-grid" style={{ marginTop: 'clamp(56px,8vw,110px)', display: 'grid', gap: '22px 40px', alignItems: 'start' }}>
          <div className="a-label" style={{ color: 'var(--ink)' }}>Off the clock</div>
          {offClock.map((o) => (<div key={o.k}><div className="a-h3" style={{ fontSize: '1.5rem' }}>{o.k}</div><p style={{ color: 'var(--ink-soft)', marginTop: 4, fontSize: 15 }}>{o.v}</p></div>))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 30 }}>
          <span className="a-label" style={{ color: 'var(--ink)', marginRight: 6 }}>Speaks</span>{spoken.map((l) => <span className="a-tag" key={l}>{l}</span>)}
        </div>
      </Reveal>

      <div style={{ marginTop: 'clamp(60px,9vw,130px)', display: 'grid', gap: 0 }} className="stat-grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div style={{ borderTop: '1px solid var(--rule-strong)', padding: '22px 22px 28px 0', height: '100%' }}>
              <div className="a-serif" style={{ fontSize: 'clamp(2.6rem,5vw,4.6rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                <CountUp to={s.v} decimals={s.d} suffix={s.suffix} />
              </div>
              <p className="a-label" style={{ marginTop: 14, lineHeight: 1.7, maxWidth: 30 + 'ch' }}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
    <style>{`
      .about-grid{grid-template-columns:1fr}
      .stat-grid{grid-template-columns:1fr 1fr}
      .off-grid{grid-template-columns:1fr}
      @media(min-width:900px){.about-grid{grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:end}.stat-grid{grid-template-columns:repeat(4,1fr)}.off-grid{grid-template-columns:160px repeat(3,1fr)}}
    `}</style>
  </section>
);
export default About;
