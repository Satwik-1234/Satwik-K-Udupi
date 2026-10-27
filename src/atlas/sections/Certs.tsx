import { useState } from 'react';
import { certificationsFull } from '@/data/legacy';
import { MaskLines, PlateHead, Reveal } from '../ui';

const cats = [['all', 'All'], ['gis', 'GIS & remote sensing'], ['hydrology', 'Hydrology'], ['cad', 'CAD / CAE'], ['other', 'Other']] as const;

const Certs = () => {
  const [f, setF] = useState<string>('all');
  const list = certificationsFull.filter((c) => f === 'all' || c.category === f);
  return (
    <section id="certs" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
      <div className="a-wrap">
        <PlateHead n="09" label="Certifications" right={`${certificationsFull.length} credentials`} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 30, flexWrap: 'wrap', marginBottom: 'clamp(26px,4vw,50px)' }}>
          <h2 className="a-h2"><MaskLines lines={[<>Always</>, <><span className="a-em">still learning.</span></>]} /></h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cats.map(([k, l]) => {
              const n = k === 'all' ? certificationsFull.length : certificationsFull.filter((c) => c.category === k).length;
              return (
                <button key={k} className="a-tag" onClick={() => setF(k)} data-cursor="Filter"
                  style={{ background: f === k ? 'var(--ink)' : 'transparent', color: f === k ? 'var(--paper)' : 'var(--ink)', cursor: 'none' }}>{l} · {n}</button>
              );
            })}
          </div>
        </div>
        <div className="cert-grid2">
          {list.map((c, i) => (
            <Reveal key={c.name + c.date} delay={(i % 6) * 0.025} y={14}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, padding: '14px 0', borderTop: '1px solid var(--rule)', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{c.name}</div>
                  {c.skills && <div className="a-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 3 }}>{c.skills.join(' · ')}</div>}
                </div>
                <div className="a-label" style={{ textAlign: 'right', lineHeight: 1.6 }}>{c.issuer}<br />{c.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="a-rule" />
      </div>
      <style>{`.cert-grid2{display:grid;grid-template-columns:1fr;column-gap:56px}@media(min-width:900px){.cert-grid2{grid-template-columns:1fr 1fr}}`}</style>
    </section>
  );
};
export default Certs;
