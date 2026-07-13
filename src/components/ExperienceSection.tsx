import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

const experiences = [
  {
    title: "Project Associate",
    company: "Shramjivi Janata Sahayyak Mandal",
    type: "Full-time",
    duration: "Sep 2025 - Present · 4 mos",
    location: "Junnar, Maharashtra, India",
    project: "Resilient River Ghod Project",
    highlights: [
      "Supporting the Resilient River Ghod initiative with accurate documentation and coordination",
      "Documentation of CCTs, gabions, and loose boulder structures",
      "Mapping and documented plantations and structures in villages",
      "Preparing detailed reports on project structures and progress",
      "Maintaining data records for monitoring and evaluation"
    ]
  },
  {
    title: "Engineer Intern",
    company: "Government Of Maharashtra Revenue & Forest Department",
    type: "Internship",
    duration: "Mar 2025 - Apr 2025 · 2 mos",
    location: "Sahyadri Tiger Reserve Karad",
    highlights: [
      "📸 Worked on camera trap data to monitor wildlife activity patterns and movement frequencies",
      "📊 Cleaned and corrected animal time-series datasets for ecological interpretation",
      "🗺️ Contributed to spatial mapping of wildlife hotspots and created Study and Location Index maps of STR"
    ],
    skills: ["Data Mapping", "ArcMap"]
  },
  {
    title: "Engineer Intern",
    company: "Center For Climate Change and Sustainability Studies, Shivaji University, Kolhapur",
    type: "Internship",
    duration: "Aug 2024 - Dec 2024 · 5 mos",
    location: "Kolhapur, Maharashtra, India",
    highlights: [
      "🌧️ Developed hydrological models for Panchganga River Basin using HEC-HMS",
      "🌍 Performed spatial analysis and mapped land degradation in Western Ghats",
      "🛰️ Used Google Earth Engine to implement RUSLE for soil loss estimation",
      "📈 Analyzed vegetation and water indices (NDVI, NDWI, MNDWI, BSI, SAVI, EVI, UI)",
      "🏰 Generated high-resolution DSMs of Panhala Fort using Agisoft Metashape",
      "🌱 Supported climate research programs focusing on sustainability"
    ],
    skills: ["HEC-HMS", "HEC-RAS", "Google Earth Engine", "QGIS", "ArcGIS"]
  },
  {
    title: "Engineer Trainee",
    company: "Indo-German Tool Room",
    type: "Trainee",
    duration: "Jun 2024 - Jul 2024 · 2 mos",
    location: "Ahmedabad",
    highlights: [
      "⚙️ Executed static structural, thermal, and fluid-flow simulations on agricultural equipment",
      "🛠️ Modelled and analysed assemblies of transmissions, shafts, gears, and engines",
      "📊 Produced comprehensive technical reports translating simulation data into insights",
      "💡 Strengthened competencies in mechanical simulation and design validation"
    ],
    skills: ["SolidWorks CAE", "ANSYS Workbench", "CFD", "FEA"]
  },
  {
    title: "Engineer Trainee",
    company: "Central Farm Machinery Training and Testing Institute",
    type: "Trainee",
    duration: "Sep 2023 · 1 mo",
    location: "Budni, Madhya Pradesh, India",
    highlights: [
      "🚜 Completed 26-day hands-on training on farm machinery and equipment",
      "🧰 Gained knowledge of agricultural machinery including tractors and tillage implements",
      "🔧 Performed maintenance and repair of tractor components",
      "🛠️ Learned tractor calibration techniques for seed drills"
    ],
    skills: ["Agricultural Machinery", "Engine Maintenance"]
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
              Work{' '}
              <GradientText
                colors={['#213BA3', '#47A2F5', '#D6AE29']}
                animationSpeed={6}
                className="text-3xl md:text-4xl font-display font-bold inline-flex"
              >
                Experience
              </GradientText>
            </h2>
            <div className="section-divider" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-accent transform md:-translate-x-1/2" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background shadow-glow z-10" />

                  {/* Content Card */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass-card p-6 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-secondary font-medium">
                            <Building2 className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                          {exp.type}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Project Name if exists */}
                      {exp.project && (
                        <p className="text-sm font-medium text-accent mb-3">
                          🌊 {exp.project}
                        </p>
                      )}

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      {exp.skills && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                          {exp.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded bg-foreground/10 text-muted-foreground">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
