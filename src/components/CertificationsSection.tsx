import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, Calendar, ArrowRight } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  skills?: string[];
  category: 'gis' | 'hydrology' | 'cad' | 'other';
}

const certifications: Certification[] = [
  { name: "ArcGIS Online Basics", issuer: "Esri", date: "Aug 2025", category: "gis" },
  { name: "ArcGIS-Pro Basics", issuer: "Esri", date: "Aug 2025", category: "gis" },
  { name: "Flood Hazard and Exposure Mapping", issuer: "UNESCO", date: "Aug 2025", skills: ["QGIS", "LISEM"], category: "hydrology" },
  { name: "Application of AI/ML in Acreage Mapping of Crops", issuer: "IIRS, ISRO", date: "Jul 2025", category: "gis" },
  { name: "Resilient Rivers: Watershed-based Management", issuer: "FAO", date: "May 2025", category: "hydrology" },
  { name: "Guide to Developing Resilient Watershed Management Plan", issuer: "FAO", date: "Apr 2025", category: "hydrology" },
  { name: "Landslide Risk Assessment, Monitoring, and Forecasting", issuer: "UNESCO", date: "Apr 2025", category: "hydrology" },
  { name: "WaterShed Yatra Quiz Competition", issuer: "MoRD, GoI", date: "Apr 2025", skills: ["Watershed Planning"], category: "hydrology" },
  { name: "Beyond the Visible - Hyperspectral Remote Sensing", issuer: "EO College", date: "Feb 2025", category: "gis" },
  { name: "Course in GIS Analysis", issuer: "Geological Survey of India", date: "Feb 2025", category: "gis" },
  { name: "Fundamentals of GIS", issuer: "Geological Survey of India", date: "Feb 2025", category: "gis" },
  { name: "LAND IN FOCUS - Basics of Remote Sensing", issuer: "EO College", date: "Feb 2025", category: "gis" },
  { name: "Integrated Drought Management: Monitoring & Early Warning", issuer: "UNDP", date: "Oct 2024", category: "hydrology" },
  { name: "ANSYS FEA", issuer: "Indo-German Tool Room", date: "Jul 2024", category: "cad" },
  { name: "SOLIDWORKS", issuer: "Indo-German Tool Room", date: "Jul 2024", category: "cad" },
  { name: "ANSYS Static & Vibrational Analysis", issuer: "Skyy Skill Academy", date: "May 2024", category: "cad" },
  { name: "Industrial CAD Using NX", issuer: "Skyy Skill Academy", date: "May 2024", category: "cad" },
  { name: "Introduction to GIS", issuer: "GEO University", date: "May 2024", category: "gis" },
  { name: "Geospatial Data Analysis with ChatGPT and GEE", issuer: "UNU-INWEH", date: "Jan 2024", category: "gis" },
  { name: "Hydrologic Modeling with HEC-HMS", issuer: "UNESCO", date: "Dec 2023", category: "hydrology" },
  { name: "Academic Level Course (A-1)", issuer: "CFMTTI", date: "Oct 2023", category: "other" },
  { name: "MS-CIT", issuer: "MSBTE", date: "Jul 2018", category: "other" },
  { name: "Intermediate Grade Drawing Examination", issuer: "Govt. of Maharashtra", date: "Jul 2016", category: "other" },
];

const categories = [
  { id: 'all', label: 'All', count: certifications.length },
  { id: 'gis', label: 'GIS & Remote Sensing', count: certifications.filter(c => c.category === 'gis').length },
  { id: 'hydrology', label: 'Hydrology', count: certifications.filter(c => c.category === 'hydrology').length },
  { id: 'cad', label: 'CAD/CAE', count: certifications.filter(c => c.category === 'cad').length },
  { id: 'other', label: 'Other', count: certifications.filter(c => c.category === 'other').length },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCerts = activeFilter === 'all' 
    ? certifications 
    : certifications.filter(c => c.category === activeFilter);

  return (
    <section id="certifications" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Professional Development</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
              Licenses &{' '}
              <GradientText
                colors={['#213BA3', '#47A2F5', '#D6AE29']}
                animationSpeed={6}
                className="text-4xl md:text-5xl font-display font-bold inline-flex"
              >
                Certifications
              </GradientText>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continuous learning across GIS, hydrology, and engineering domains from globally recognized institutions.
            </p>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 mb-12 py-6 border-y border-border/30"
          >
            {categories.slice(1).map((cat, index) => (
              <div key={cat.id} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{cat.count}</div>
                <div className="text-sm text-muted-foreground">{cat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`group px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-card/50 text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === cat.id 
                      ? 'bg-background/20' 
                      : 'bg-muted'
                  }`}>
                    {cat.count}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.02 }}
                layout
                className="group relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-5 hover:bg-card/50 hover:border-primary/30 transition-all duration-300"
              >
                {/* Category indicator */}
                <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl`}>
                  <div className={`absolute top-2 -right-6 w-20 h-5 rotate-45 flex items-center justify-center text-[10px] font-medium ${
                    cert.category === 'gis' ? 'bg-primary/80 text-primary-foreground' :
                    cert.category === 'hydrology' ? 'bg-secondary/80 text-secondary-foreground' :
                    cert.category === 'cad' ? 'bg-accent/80 text-accent-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {cert.category.toUpperCase()}
                  </div>
                </div>

                <div className="pr-8">
                  <h4 className="font-semibold text-sm text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-secondary font-medium mb-3">{cert.issuer}</p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                  
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/30">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 text-[10px] rounded-md bg-primary/10 text-primary font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
