import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground pt-24 pb-8 px-6 md:px-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24">
          <div className="text-2xl md:text-3xl font-medium mb-12 md:mb-0 text-foreground">
            Let's connect
          </div>
          
          <div className="flex gap-16 md:gap-32">
            <div className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <a href="#about" className="hover:text-foreground transition-colors">About</a>
              <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
              <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <a href="https://www.linkedin.com/in/satwik-udupi-37304a231" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="https://github.com/Satwik-1234" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="mailto:satwikudupi@gmail.com" className="hover:text-foreground transition-colors">Email</a>
              <a href="tel:+919834300849" className="hover:text-foreground transition-colors">Phone</a>
            </div>
          </div>
        </div>

        {/* Massive Text */}
        <div className="w-full mb-16 md:mb-24 overflow-hidden px-4">
          <Link to="/pravaha-tattva" className="flex flex-col justify-center items-center group cursor-pointer block">
            <h1 className="text-[13vw] md:text-[11vw] leading-none font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500 whitespace-nowrap select-none font-display text-center">
              PravahaTattva
            </h1>
            <p className="text-xl md:text-3xl font-bold text-foreground tracking-[0.2em] md:tracking-[0.4em] uppercase mt-2 md:mt-4 text-center group-hover:text-primary/80 transition-colors duration-500">
              Solutions
            </p>
            <p className="text-xs md:text-sm font-medium text-muted-foreground tracking-widest uppercase mt-6 text-center">
              Founded By Satwik K Udupi
            </p>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-muted-foreground">
          <div className="mb-6 md:mb-0 flex items-center gap-2 text-foreground font-semibold">
            <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-background rounded-full"></div>
            </div>
            Satwik Udupi
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <span>© {new Date().getFullYear()}</span>
            <Link to="/pravaha-tattva" className="hover:text-foreground transition-colors">Pravaha Tattva</Link>
            <a href="https://wa.me/919834300849" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
