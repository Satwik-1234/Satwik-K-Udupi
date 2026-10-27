import { pravahaProjects } from '@/data/portfolio';
import { MaskLines, PlateHead, Reveal } from '../ui';

const Engagements = () => (
  <section id="engagements" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
    <div className="a-wrap">
      <PlateHead n="01" label="Project index" right={`${pravahaProjects.length} engagements · 7 repositories`} />
      <h2 className="a-h2" style={{ marginBottom: 'clamp(16px,2vw,28px)' }}>
        <MaskLines lines={[<>Engagements,</>, <><span className="a-em">on the record.</span></>]} />
      </h2>
      <Reveal><p className="a-lede" style={{ marginBottom: 'clamp(34px,5vw,70px)' }}>
        Dam-safety studies, flood-frequency analysis and CSR mapping — each one a documented, re-runnable workflow with its method, data and results in a public repository.
      </p></Reveal>

      <div>
        {pravahaProjects.map((p, i) => (
          <Reveal key={p.id} delay={0.02}>
            <article className="pj-row" style={{ display: 'grid', gap: '18px clamp(24px,4vw,64px)', padding: 'clamp(26px,3.5vw,44px) 0', borderTop: '1px solid var(--rule-strong)' }}>
              <div>
                <div className="a-label" style={{ color: 'var(--signal)' }}>{p.code} · {p.kind}</div>
                <h3 className="a-h3" style={{ fontSize: 'clamp(1.6rem,2.7vw,2.4rem)', margin: '10px 0 14px' }}>{p.title}</h3>
                <div className="a-label" style={{ lineHeight: 1.8 }}>{p.place}</div>
                <div style={{ marginTop: 12, fontWeight: 600 }}>{p.client}</div>
                {p.via && <div style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginTop: 2 }}>{p.via}</div>}
              </div>
              <div>
                <p style={{ fontSize: 18, maxWidth: '58ch' }}>{p.scope}</p>
                <ul style={{ display: 'grid', gap: 9, margin: '18px 0 20px' }}>
                  {p.highlights.map((h) => (<li key={h} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', color: 'var(--ink-soft)', fontSize: 15.5 }}><span style={{ color: 'var(--signal)' }}>—</span><span>{h}</span></li>))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>{p.tools.map((t) => <span className="a-tag" key={t}>{t}</span>)}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {p.links.map((l, k) => (
                    <a key={l.url} className={`a-btn ${k === 0 ? 'solid' : ''}`} href={l.url} target="_blank" rel="noopener noreferrer" data-cursor="Open" style={{ padding: '10px 16px' }}><span>{l.label} ↗</span></a>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="a-rule" />
      </div>
      <p className="a-label" style={{ marginTop: 22, lineHeight: 1.8, maxWidth: '70ch' }}>
        Client documents and imagery remain the property of the respective clients; repositories show methods, structure and non-confidential results. Further engagements are held under confidentiality.
      </p>
    </div>
    <style>{`.pj-row{grid-template-columns:1fr}@media(min-width:960px){.pj-row{grid-template-columns:minmax(0,4fr) minmax(0,7fr)}}`}</style>
  </section>
);
export default Engagements;
