import { arsenal, drivers, spoken } from '@/data/portfolio';
import { MaskLines, PlateHead, Reveal } from '../ui';

const Toolbox = () => (
  <section id="toolbox" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
    <div className="a-wrap">
      <PlateHead n="07" label="Toolbox" right="Software · languages · skills" />
      <h2 className="a-h2" style={{ marginBottom: 'clamp(36px,5vw,70px)' }}>
        <MaskLines lines={[<>The instruments</>, <>on <span className="a-em">my desk.</span></>]} />
      </h2>

      {/* Daily drivers — with logos */}
      <div className="a-label" style={{ marginBottom: 14 }}>Daily drivers</div>
      <div className="drv-grid" style={{ display: 'grid', borderTop: '1px solid var(--rule-strong)', borderLeft: '1px solid var(--rule)' }}>
        {drivers.map((d, i) => (
          <Reveal key={d.name} delay={(i % 4) * 0.05}>
            <div className="drv" style={{ padding: '22px 20px 20px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', height: '100%', background: 'rgba(249,246,239,.55)' }}>
              <div style={{ height: 46, display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <img src={d.logo} alt="" loading="lazy" style={{ maxHeight: 44, maxWidth: '78%', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              <div style={{ fontWeight: 600 }}>{d.name}</div>
              <div className="a-label" style={{ marginTop: 4, lineHeight: 1.6 }}>{d.use}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Full arsenal */}
      <div className="a-label" style={{ margin: 'clamp(60px,8vw,110px) 0 18px' }}>Full arsenal</div>
      <div className="ars-grid" style={{ display: 'grid', gap: '34px 40px' }}>
        {arsenal.map((g, i) => (
          <Reveal key={g.name} delay={(i % 4) * 0.05}>
            <div className="a-label" style={{ borderTop: '1px solid var(--rule-strong)', paddingTop: 14, marginBottom: 14, color: 'var(--ink)' }}>{g.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{g.items.map((t) => <span className="a-tag" key={t}>{t}</span>)}</div>
          </Reveal>
        ))}
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="a-label" style={{ color: 'var(--ink)' }}>Spoken languages</span>
        {spoken.map((l) => <span className="a-tag" key={l}>{l}</span>)}
      </div>
    </div>
    <style>{`
      .drv-grid{grid-template-columns:1fr 1fr}
      .ars-grid{grid-template-columns:1fr}
      .dom-row{grid-template-columns:1fr}
      @media(min-width:760px){.drv-grid{grid-template-columns:repeat(3,1fr)}.ars-grid{grid-template-columns:repeat(2,1fr)}}
      @media(min-width:1100px){.drv-grid{grid-template-columns:repeat(5,1fr)}.ars-grid{grid-template-columns:repeat(4,1fr)}.dom-row{grid-template-columns:minmax(0,4fr) minmax(0,5fr) minmax(0,3fr)}}
      .drv:hover img{filter:none}
    `}</style>
  </section>
);
export default Toolbox;
