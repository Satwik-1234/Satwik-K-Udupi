import { useState } from 'react';
import { maps } from '@/data/portfolio';
import { MaskLines, PlateHead, Reveal, pressable, useLightbox } from '../ui';

const themes = ['All', ...Array.from(new Set(maps.map((m) => m.theme)))];

const Atlas = () => {
  const [f, setF] = useState('All');
  const { open } = useLightbox();
  const list = maps.filter((m) => f === 'All' || m.theme === f);
  return (
    <section id="atlas" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
      <div className="a-wrap">
        <PlateHead n="05" label="The atlas" right={`${maps.length} sheets`} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 30, flexWrap: 'wrap', marginBottom: 'clamp(30px,5vw,60px)' }}>
          <h2 className="a-h2"><MaskLines lines={[<>Every sheet,</>, <>drawn <span className="a-em">by hand.</span></>]} /></h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {themes.map((t) => (
              <button key={t} className="a-tag" onClick={() => setF(t)} data-cursor="Filter"
                style={{ background: f === t ? 'var(--ink)' : 'transparent', color: f === t ? 'var(--paper)' : 'var(--ink)', cursor: 'none' }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ columnGap: 'clamp(16px,2.4vw,34px)' }} className="atlas-cols">
          {list.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.07} className="atlas-item">
              <figure style={{ margin: '0 0 clamp(22px,3vw,40px)', breakInside: 'avoid' }}>
                <div className="a-plate" data-cursor="Open" aria-label={`Open map: ${m.title}`} {...pressable(() => open(m.id))} style={{ cursor: 'none' }}>
                  <img src={m.src} alt={m.title} loading="lazy" />
                </div>
                <figcaption className="a-caption"><span>{m.title}</span><span>{m.tool}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`.atlas-cols{columns:1}@media(min-width:700px){.atlas-cols{columns:2}}@media(min-width:1100px){.atlas-cols{columns:3}}`}</style>
    </section>
  );
};
export default Atlas;
