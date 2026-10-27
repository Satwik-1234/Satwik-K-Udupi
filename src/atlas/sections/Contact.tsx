import { contact } from '@/data/portfolio';
import { MaskLines, Reveal } from '../ui';

const Row = ({ k, v, href }: { k: string; v: string; href: string }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" data-cursor="Open"
    style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '18px 0', borderTop: '1px solid var(--rule-strong)', alignItems: 'baseline' }}>
    <span className="a-label">{k}</span>
    <span className="a-h3" style={{ fontSize: 'clamp(1.2rem,2.4vw,2rem)', textAlign: 'right', wordBreak: 'break-word' }}>{v} ↗</span>
  </a>
);

const Contact = () => (
  <section id="contact" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
    <div className="a-wrap">
      <div className="a-label" style={{ marginBottom: 26 }}>10 — Correspondence</div>
      <h2 className="a-display" style={{ fontSize: 'clamp(3rem,10vw,10rem)' }}>
        <MaskLines lines={[<>Let’s map</>, <>something <span className="a-em">real.</span></>]} />
      </h2>
      <div style={{ display: 'grid', gap: 40, marginTop: 'clamp(40px,6vw,90px)' }} className="ct-grid">
        <Reveal>
          <p className="a-lede" style={{ color: 'var(--ink)' }}>
            Hiring for a hydrology or GIS role, or have a flood, watershed or mapping problem? I’m open to full-time roles, consulting and research collaborations.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a className="a-btn solid" href={`mailto:${contact.email}`} data-cursor="Write"><span>Email me</span></a>
            <a className="a-btn" href={contact.form} target="_blank" rel="noopener noreferrer"><span>Project brief form</span></a>
            <button className="a-btn" onClick={() => window.print()} data-cursor="PDF"><span>Save as PDF</span></button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Row k="Email · professional" v={contact.email} href={`mailto:${contact.email}`} />
          <Row k="Email · personal" v={contact.emailPersonal} href={`mailto:${contact.emailPersonal}`} />
          <Row k="WhatsApp" v="+91 98343 00849" href={contact.whatsapp} />
          <Row k="LinkedIn" v="satwik-udupi" href={contact.linkedin} />
          <Row k="GitHub · research" v="Satwik-1234" href={contact.github} />
          <Row k="GitHub · client work" v="007-Wik" href={contact.github2} />
          <Row k="Instagram" v="@007_wik" href={contact.instagram} />
          <div className="a-rule" />
        </Reveal>
      </div>
    </div>
    <div className="a-wrap" style={{ marginTop: 'clamp(70px,10vw,140px)' }}>
      <Reveal><p className="a-serif" style={{ fontSize: 'clamp(1.6rem,3.6vw,3.2rem)', lineHeight: 1.1, maxWidth: '28ch', fontStyle: 'italic' }}>“If it flows, floods, fractures, or flashes on a satellite image — I probably want to model it.”</p></Reveal>
    </div>
    <footer className="a-wrap" style={{ marginTop: 'clamp(50px,7vw,90px)', display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
      <span className="a-label">© {new Date().getFullYear()} Satwik K. Udupi · {contact.place}</span>
      <span className="a-label">Set in Instrument Serif, Hanken Grotesk & JetBrains Mono</span>
    </footer>
    <style>{`.ct-grid{grid-template-columns:1fr}@media(min-width:900px){.ct-grid{grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:80px}}`}</style>
  </section>
);
export default Contact;
