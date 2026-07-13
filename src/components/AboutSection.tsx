import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Droplets, Layers, Mountain, ArrowUpRight, Sparkles } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import BorderGlow from '@/components/ui/BorderGlow';

const focus = [
  { 
    icon: Droplets, 
    title: 'Hydraulic Engineering', 
    description: 'Flood risk assessment, dam break analysis, and water resource infrastructure planning.',
    gradient: 'from-blue-500 to-cyan-400'
  },
  { 
    icon: Mountain, 
    title: 'Watershed Management', 
    description: 'Catchment analysis, runoff modeling, and sustainable land-water conservation strategies.',
    gradient: 'from-emerald-500 to-teal-400'
  },
  { 
    icon: Layers, 
    title: 'Geospatial Intelligence', 
    description: 'Remote sensing, LULC classification, and spatial data analysis for informed decisions.',
    gradient: 'from-violet-500 to-purple-400'
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About Me</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
            Agricultural Engineer with
            <br />
            <GradientText
              colors={['#213BA3', '#47A2F5', '#D6AE29']}
              animationSpeed={6}
              className="font-bold text-4xl md:text-5xl lg:text-6xl"
            >
              Water Resource Expertise
            </GradientText>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Combining field expertise with advanced geospatial tools to deliver data-driven solutions 
            for sustainable land and water management.
          </p>
        </motion.div>

        {/* Focus Areas - Modern Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {focus.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <BorderGlow
                borderRadius={16}
                glowRadius={30}
                backgroundColor="hsl(var(--card))"
                colors={[
                  item.gradient.includes('blue') ? '#3b82f6' : item.gradient.includes('emerald') ? '#10b981' : '#8b5cf6',
                  item.gradient.includes('cyan') ? '#06b6d4' : item.gradient.includes('teal') ? '#14b8a6' : '#a78bfa',
                  '#38bdf8'
                ]}
                glowIntensity={0.8}
                fillOpacity={0.3}
              >
                <div className="relative p-8 h-full overflow-hidden">
                  {/* Gradient hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} p-[1px] mb-6`}>
                      <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-foreground" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Left - Bio */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-8 glass-card">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                With a foundation in <span className="font-semibold text-primary">Agricultural Engineering</span> and specialized 
                training in GIS and hydrological modeling, I bridge the gap between field-level challenges and 
                technology-driven solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My work spans collaborative projects with Shivaji University, the Forest Department of Maharashtra, 
                and various research institutions—focusing on watershed conservation, flood risk assessment, and 
                sustainable agricultural practices.
              </p>
            </div>
          </div>

          {/* Right - Location & CTA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Card */}
            <div className="p-6 glass-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Based in</p>
                  <p className="text-lg font-semibold text-foreground">Karad, Maharashtra</p>
                  <p className="text-sm text-muted-foreground mt-2">Available for remote & on-site projects</p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="p-6 glass-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h4 className="text-foreground font-semibold mb-2">Looking to Collaborate?</h4>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                Open to consulting, research collaborations, and sustainable water projects.
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
              >
                Get in touch
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
