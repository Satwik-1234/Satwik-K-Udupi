import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

const education = [
  {
    degree: "Bachelor of Technology - BTech",
    field: "Agricultural Engineering",
    institution: "Mahatma Phule Krishi Vidyapeeth, Rahuri",
    college: "Sahyadri College of Agricultural Engineering and Technology, Yashwantnagar",
    duration: "Sep 2021 - May 2025",
    grade: "First Class with Distinction | CGPA: 8.27",
    activities: [
      "NSS volunteer",
      "In-plant training and placement coordinator",
      "Graphic designer for college events",
      "2nd place in poster competition"
    ],
    projects: [
      "Hydrological modeling and GIS mapping",
      "Flood-plain zonation and risk mapping",
      "Spatio-temporal analysis of Panchganga River and RUSLE soil loss estimation",
      "Dam Break Analysis of Koyna Dam",
      "Flood mapping of Panchganga, Godavari, Krishna, Mula-Mutha Rivers"
    ],
    coursework: [
      "Flood Control Measures",
      "Lift Irrigation Design",
      "Soil and Water Conservation Structures",
      "Computational Fluid Dynamics",
      "Drip & Sprinkler System Design",
      "Computer Aided Design",
      "Hydrology & GIS"
    ]
  },
  {
    degree: "HSC",
    field: "Science",
    institution: "Shri Venkateshwara Shikshan Trust Ramchandra Masu Mahadik College",
    location: "Peth Walwa",
    duration: "Feb 2018 - Feb 2020",
    grade: "First Class",
    achievements: [
      "JEE Paper 2: 90 Percentile",
      "MHT-CET 2021: 93 Percentile"
    ]
  },
  {
    degree: "SSC",
    field: "Science",
    institution: "Tilak Highschool Karad",
    duration: "Feb 2011 - Mar 2018",
    grade: "Distinction",
    achievements: [
      "Lance Corporal in NCC",
      "A Grade in Certificate and ATC Camp at Sangli",
      "Passed Government Drawing Elementary Intermediate Exam",
      "Winner in GK Olympiads"
    ]
  }
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <GradientText
                colors={['#213BA3', '#47A2F5', '#D6AE29']}
                animationSpeed={6}
                className="text-3xl md:text-4xl font-display font-bold"
              >
                Education
              </GradientText>
            </h2>
            <div className="section-divider" />
          </div>

          {/* Education Cards */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="glass-card p-8 hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0 shadow-button">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold text-foreground">
                          {edu.degree} - {edu.field}
                        </h3>
                        <p className="text-secondary font-medium">{edu.institution}</p>
                        {edu.college && (
                          <p className="text-muted-foreground text-sm">{edu.college}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{edu.duration}</p>
                        {edu.grade && (
                          <p className="text-sm font-medium text-primary">{edu.grade}</p>
                        )}
                      </div>
                    </div>

                    {/* Projects (for BTech) */}
                    {edu.projects && (
                      <div className="mb-4">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          Major Projects
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {edu.projects.map((project, i) => (
                            <div key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-secondary">▸</span>
                              <span>{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Coursework */}
                    {edu.coursework && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, i) => (
                            <span key={i} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Activities & Achievements */}
                    {(edu.activities || edu.achievements) && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                          <Award className="w-4 h-4 text-primary" />
                          {edu.activities ? 'Activities & Achievements' : 'Achievements'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(edu.activities || edu.achievements)?.map((item, i) => (
                            <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary/20 text-secondary">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
