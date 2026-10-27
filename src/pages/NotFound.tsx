import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AtlasShell from '@/atlas/AtlasShell';
import { MaskLines } from '@/atlas/ui';

const NotFound = () => (
  <>
    <Helmet><title>Off the map — Satwik K. Udupi</title><meta name="robots" content="noindex" /></Helmet>
    <AtlasShell nav={[{ label: 'Work', href: '/' }]} cta={{ label: 'Pravaha Tattva', to: '/pravaha-tattva' }} brand={<span>S.K.U</span>}>
      <section style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', padding: '120px 0 60px' }}>
        <div className="a-wrap">
          <div className="a-label" style={{ marginBottom: 24 }}>Error 404 · sheet not found</div>
          <h1 className="a-display"><MaskLines immediate lines={[<>Off the</>, <><span className="a-em">map.</span></>]} /></h1>
          <p className="a-lede" style={{ margin: '28px 0 34px', color: 'var(--ink)' }}>This coordinate isn’t on any sheet I’ve drawn. Head back to the index.</p>
          <Link to="/" className="a-btn solid" data-cursor="Home"><span>← Back to the portfolio</span></Link>
        </div>
      </section>
    </AtlasShell>
  </>
);
export default NotFound;
