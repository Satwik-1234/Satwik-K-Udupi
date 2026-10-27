import { Helmet } from 'react-helmet-async';
import AtlasShell from '@/atlas/AtlasShell';
import { LightboxProvider } from '@/atlas/ui';
import Hero from '@/atlas/sections/Hero';
import About from '@/atlas/sections/About';
import Expertise from '@/atlas/sections/Expertise';
import Work from '@/atlas/sections/Work';
import Hydrocast from '@/atlas/sections/Hydrocast';
import Atlas from '@/atlas/sections/Atlas';
import Practice from '@/atlas/sections/Practice';
import Toolbox from '@/atlas/sections/Toolbox';
import Code from '@/atlas/sections/Code';
import Certs from '@/atlas/sections/Certs';
import PravahaBand from '@/atlas/sections/PravahaBand';
import Contact from '@/atlas/sections/Contact';

const nav = [
  { label: 'Disciplines', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'Hydrocast', href: '#hydrocast' },
  { label: 'Atlas', href: '#atlas' },
  { label: 'Practice', href: '#practice' },
  { label: 'Toolbox', href: '#toolbox' },
  { label: 'Contact', href: '#contact' },
];

const Index = () => (
  <>
    <Helmet>
      <title>Satwik K. Udupi — Hydrologist & GIS Analyst</title>
      <meta name="description" content="Satwik K. Udupi — hydrologist and GIS analyst. Dam-break and flood modelling (HEC-RAS, HEC-HMS), watershed studies, remote sensing and the Hydrocast flood-prediction system. Founder, Pravaha Tattva Solutions." />
    </Helmet>
    <AtlasShell nav={nav} cta={{ label: 'Pravaha Tattva', to: '/pravaha-tattva' }} brand={<><span style={{ fontSize: 15 }}>◉</span><span>S.K.U<span className="brand-long"> — Hydrology & GIS</span></span></>}>
      <LightboxProvider>
        <Hero />
        <About />
        <Expertise />
        <Work />
        <Hydrocast />
        <Atlas />
        <Practice />
        <Toolbox />
        <Code />
        <Certs />
        <PravahaBand />
        <Contact />
      </LightboxProvider>
    </AtlasShell>
  </>
);
export default Index;
