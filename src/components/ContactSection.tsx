import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Mail, MapPin, Linkedin, Phone, MessageCircle,
  ExternalLink, ArrowUpRight, Send, Github
} from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import earthGif from '@/assets/revolving-earth.gif';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phoneNumber = '+919834300849';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=Hi%20Satwik,%20I'm%20interested%20in%20your%20GIS/Hydrology%20services`;
  const googleFormUrl = 'https://forms.gle/SCyQeFigrgsPft9D9';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Krishna+Canal+Saidapur+Road+Karad+415124+Maharashtra+India';

  return (
    <section id="contact" className="py-28 relative overflow-hidden" ref={ref}>
      {/* Earth Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${earthGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      />
      {/* Subtle overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-background/50 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
              Let's{' '}
              <GradientText
                colors={['#213BA3', '#47A2F5', '#D6AE29']}
                animationSpeed={6}
                className="font-bold text-4xl md:text-5xl inline-flex"
              >
                Connect
              </GradientText>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Ready to collaborate on GIS, hydrology, or agricultural engineering projects?
            </p>
          </div>

          {/* CTA Card */}
          <motion.a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="group block bg-card/40 backdrop-blur-sm border border-border/40 rounded-3xl p-8 md:p-10 text-center hover:border-primary/30 transition-all duration-300 mb-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground mb-5">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Start Your Project</h3>
              <p className="text-muted-foreground mb-5 max-w-sm mx-auto text-sm">
                Fill out the inquiry form and get a response within 24 hours
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all text-sm">
                Request Quote <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </motion.a>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-4 mb-10"
          >
            {/* Email */}
            <motion.a
              href="mailto:satwikudupi@gmail.com"
              className="group relative bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-semibold text-foreground">satwikudupi@gmail.com</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${phoneNumber}`}
              className="group relative bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-semibold text-foreground">+91 983 430 0849</p>
              </div>
            </motion.a>

            {/* Location - Google Maps */}
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                  <MapPin className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-semibold text-foreground">Krishna Canal, Saidapur Road</p>
                <p className="text-xs text-muted-foreground mt-0.5">Karad – 415124, Maharashtra</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open in Google Maps <ArrowUpRight className="w-3 h-3" />
                </p>
              </div>
            </motion.a>
          </motion.div>

          {/* Social Buttons - Rounded, animated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Github, label: 'GitHub', href: 'https://github.com/Satwik-1234', bg: 'bg-[#333] hover:bg-[#222]', external: true },
              { icon: MessageCircle, label: 'WhatsApp', href: whatsappUrl, bg: 'bg-[#25D366] hover:bg-[#20BD5A]', external: true },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/satwik-udupi-37304a231', bg: 'bg-[#0077B5] hover:bg-[#006699]', external: true },
              { icon: ExternalLink, label: 'Consulting', href: '/pravaha-tattva', bg: 'bg-primary hover:bg-primary/90', external: false },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`group inline-flex items-center gap-2.5 px-6 py-3 rounded-full ${link.bg} text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                >
                  {/* Shimmer on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* GitHub Contributions Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-col items-center mt-12 w-full max-w-4xl mx-auto overflow-hidden"
          >
            <h3 className="text-xl font-medium mb-4 text-foreground">My GitHub Contributions</h3>
            <div className="w-full overflow-x-auto pb-4">
              <div className="bg-card/30 p-4 rounded-xl border border-border/40 min-w-[700px]">
                <img
                  src="https://ghchart.rshah.org/216e39/Satwik-1234"
                  alt="Satwik's GitHub Contributions Chart"
                  className="w-full"
                />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Scroll &gt;&gt;</p>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-emerald-400">Available for new projects</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
