import { Link } from 'react-router-dom';
import logo from '@/assets/pravaha-logo.png';
import { MaskLines, Reveal } from '../ui';

const PravahaBand = () => (
  <section id="pravaha" style={{ background: '#0d1a45', color: '#f2ede2', position: 'relative', overflow: 'hidden' }}>
    <svg aria-hidden="true" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}>
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M-20 ${40 + i * 26} C 160 ${i * 22}, 260 ${120 + i * 24}, 420 ${60 + i * 25} S 700 ${20 + i * 28}, 840 ${70 + i * 24}`} fill="none" stroke="#c99a1c" strokeWidth={i % 5 === 0 ? 1.6 : 0.7} />
      ))}
    </svg>
    <div className="a-wrap" style={{ position: 'relative', padding: 'clamp(80px,12vw,170px) var(--gutter)', display: 'grid', gap: 40 }}>
      <div className="a-label" style={{ color: '#c99a1c' }}>My company · Karad, Maharashtra</div>
      <div style={{ display: 'grid', gap: 40 }} className="pv-grid">
        <div>
          <h2 className="a-h2" style={{ color: '#f2ede2', fontSize: 'clamp(2.8rem,8vw,7.5rem)' }}>
            <MaskLines lines={[<>Pravaha</>, <><span style={{ fontStyle: 'italic', color: '#c99a1c' }}>Tattva</span> Solutions</>]} />
          </h2>
          <Reveal delay={0.1}>
            <p style={{ fontSize: 'clamp(1.1rem,1.6vw,1.4rem)', maxWidth: '44ch', marginTop: 28, color: 'rgba(242,237,226,.78)' }}>
              Geospatial and hydrological consulting — flood modelling, watershed studies, UAV mapping and CFD — for institutions, agencies and developers.
            </p>
            <Link to="/pravaha-tattva" className="a-btn" data-cursor="Enter" style={{ marginTop: 34, color: '#f2ede2', borderColor: '#f2ede2' }}>
              <span>Enter the company site →</span>
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15} style={{ display: 'grid', placeItems: 'center' }}>
          <img src={logo} alt="Pravaha Tattva Solutions" style={{ width: 'min(360px,70%)', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.35))' }} />
        </Reveal>
      </div>
    </div>
    <style>{`.pv-grid{grid-template-columns:1fr}@media(min-width:900px){.pv-grid{grid-template-columns:minmax(0,7fr) minmax(0,4fr);align-items:center}}`}</style>
  </section>
);
export default PravahaBand;
