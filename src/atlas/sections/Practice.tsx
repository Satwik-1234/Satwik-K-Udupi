import { educationFull, experienceFull as expLegacy } from '@/data/legacy';
import { currentRole } from '@/data/portfolio';

import { founderRole } from '@/data/portfolio';
const experienceFull: any[] = [currentRole, founderRole, ...expLegacy];
import Trajectory from './Trajectory';
import { Disclosure, MaskLines, PlateHead, Reveal } from '../ui';

const Tags = ({ items }: { items: string[] }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{items.map((t) => <span key={t} className="a-tag">{t}</span>)}</div>
);
const Block = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <div><div className="a-label" style={{ marginBottom: 10, color: 'var(--ink)' }}>{k}</div>{children}</div>
);
const Bullets = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 8 }}>
    {items.map((b) => (
      <li key={b} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', color: 'var(--ink-soft)' }}>
        <span style={{ color: 'var(--signal)' }}>—</span><span>{b}</span>
      </li>
    ))}
  </ul>
);

const Practice = () => (
  <section id="practice" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
    <div className="a-wrap">
      <PlateHead n="06" label="Practice" right="Experience & education" />
      <h2 className="a-h2" style={{ marginBottom: 'clamp(40px,6vw,90px)' }}>
        <MaskLines lines={[<>Field, model,</>, <><span className="a-em">deliver.</span></>]} />
      </h2>

      <Trajectory />

      <div className="a-label" style={{ margin: 'clamp(60px,8vw,110px) 0 14px' }}>Experience · {experienceFull.length} roles</div>
      <div>
        {experienceFull.map((e: any, i: number) => (
          <Reveal key={e.title + e.duration} delay={i * 0.03}>
            <Disclosure defaultOpen={i === 0} head={
              <div className="ledger-row" style={{ display: 'grid', gap: '6px 28px' }}>
                <span className="a-label" style={{ paddingTop: 6 }}>{e.duration.replace(/ · .*/, '')}</span>
                <div>
                  <div className="a-h3" style={{ fontSize: 'clamp(1.4rem,2.2vw,2rem)' }}>{e.title} <span className="a-label" style={{ marginLeft: 8 }}>{e.type}</span></div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{e.company}</div>
                  <div className="a-label" style={{ marginTop: 4 }}>{e.location}</div>
                </div>
              </div>}>
              <div className="ledger-row" style={{ display: 'grid', gap: '16px 28px' }}>
                <span />
                <div style={{ display: 'grid', gap: 22, maxWidth: '72ch' }}>
                  {e.project && <div className="a-mono" style={{ fontSize: 13, color: 'var(--signal)' }}>Project · {e.project}</div>}
                  <Bullets items={e.highlights} />
                  {e.skills && <Tags items={e.skills} />}
                </div>
              </div>
            </Disclosure>
          </Reveal>
        ))}
        <div className="a-rule" />
      </div>

      <div className="a-label" style={{ margin: 'clamp(60px,8vw,110px) 0 14px' }}>Education · {educationFull.length} qualifications</div>
      <div>
        {educationFull.map((e: any, i: number) => (
          <Reveal key={e.degree}>
            <Disclosure defaultOpen={i === 0} head={
              <div className="ledger-row" style={{ display: 'grid', gap: '6px 28px' }}>
                <span className="a-label" style={{ paddingTop: 6 }}>{e.duration}</span>
                <div>
                  <div className="a-h3" style={{ fontSize: 'clamp(1.4rem,2.2vw,2rem)' }}>{e.degree} — {e.field}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{e.institution}</div>
                  {(e.college || e.location) && <div className="a-label" style={{ marginTop: 4 }}>{e.college ?? e.location}</div>}
                  <div className="a-mono" style={{ fontSize: 13, marginTop: 8, color: 'var(--signal)' }}>{e.grade}</div>
                </div>
              </div>}>
              <div className="ledger-row" style={{ display: 'grid', gap: '16px 28px' }}>
                <span />
                <div className="edu-cols" style={{ display: 'grid', gap: 28 }}>
                  {e.projects && <Block k="Academic projects"><Bullets items={e.projects} /></Block>}
                  {e.coursework && <Block k="Coursework"><Tags items={e.coursework} /></Block>}
                  {e.activities && <Block k="Activities"><Bullets items={e.activities} /></Block>}
                  {e.achievements && <Block k="Achievements"><Bullets items={e.achievements} /></Block>}
                </div>
              </div>
            </Disclosure>
          </Reveal>
        ))}
        <div className="a-rule" />
      </div>
    </div>
    <style>{`
      .ledger-row{grid-template-columns:1fr}
      .edu-cols{grid-template-columns:1fr}
      @media(min-width:900px){.ledger-row{grid-template-columns:200px minmax(0,1fr)}.edu-cols{grid-template-columns:1fr 1fr}}
    `}</style>
  </section>
);
export default Practice;
