"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FiCode, FiDatabase, FiShield } from 'react-icons/fi';
import { 
  SiWordpress, 
  SiHtml5, 
  SiJavascript, 
  SiPhp, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiMysql, 
  SiSymfony,
  SiCss3,
  SiGit,
  SiNpm,
  SiPrisma,
  SiElementor,
  SiWoo
} from 'react-icons/si';

const competences = [
  {
    tech: "PHP",
    icon: <SiPhp className="text-2xl text-accent" />,
    experiences: [
      "Création de sites web dynamiques et interactifs",
      "Personnalisation de sites WordPress avec des fonctionnalités sur mesure",
      "Développement structuré et maintenable"
    ],
    framework: "Symfony"
  },
  {
    tech: "JavaScript",
    icon: <SiJavascript className="text-2xl text-accent" />,
    experiences: [
      "Création d'applications web modernes et réactives",
      "Développement de sites web dynamiques qui s'actualisent en temps réel",
      "Expérience complète : du design à la mise en ligne"
    ],
    framework: "React JS, Next JS, Node JS"
  },
  {
    tech: "WordPress",
    icon: <SiWordpress className="text-2xl text-accent" />,
    experiences: [
      "Création de sites vitrines professionnels",
      "Mise en place de boutiques en ligne complètes",
      "Création de blogs personnalisés",
      "Design sur mesure avec Elementor",
      "Optimisation pour un meilleur référencement Google"
    ]
  },
  {
    tech: "Design Web",
    icon: <SiHtml5 className="text-2xl text-accent" />,
    experiences: [
      "Création de sites web esthétiques et modernes",
      "Adaptation parfaite sur tous les écrans (mobile, tablette, ordinateur)",
      "Intégration de designs créatifs",
      "Animations fluides et élégantes",
      "Design intuitif et agréable à utiliser"
    ],
    framework: "Tailwind CSS"
  },
  {
    tech: "Sécurité Web",
    icon: <FiShield className="text-2xl text-accent" />,
    experiences: [
      "Protection des données utilisateurs",
      "Mise en place de connexions sécurisées",
      "Sécurisation des comptes utilisateurs",
      "Respect des normes de confidentialité"
    ]
  },
  {
    tech: "Base de données",
    icon: <FiDatabase className="text-2xl text-accent" />,
    experiences: [
      "Organisation intelligente des données",
      "Gestion efficace des informations",
      "Optimisation des performances",
      "Sauvegarde et protection des données"
    ]
  }
];

const techIcons = [
  { icon: <SiHtml5 className="text-[#E34F26]" />, name: "HTML5" },
  { icon: <SiCss3 className="text-[#1572B6]" />, name: "CSS3" },
  { icon: <SiJavascript className="text-[#F7DF1E]" />, name: "JavaScript" },
  { icon: <SiPhp className="text-[#777BB4]" />, name: "PHP" },
  { icon: <SiReact className="text-[#61DAFB]" />, name: "React" },
  { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
  { icon: <SiNodedotjs className="text-[#339933]" />, name: "Node.js" },
  { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: "Tailwind" },
  { icon: <SiMysql className="text-[#4479A1]" />, name: "MySQL" },
  { icon: <SiSymfony className="text-white" />, name: "Symfony" },
  { icon: <SiWordpress className="text-[#21759B]" />, name: "WordPress" },
  { icon: <SiElementor className="text-[#92003B]" />, name: "Elementor" },
  { icon: <SiWoo className="text-[#96588A]" />, name: "WooCommerce" },
  { icon: <SiGit className="text-[#F05032]" />, name: "Git" },
  { icon: <SiNpm className="text-[#CB3837]" />, name: "NPM" },
  { icon: <SiPrisma className="text-white" />, name: "Prisma" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Competences = () => {
  return (
    <section id="competences" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h5 className="text-text-secondary text-xl mb-2">Mes Compétences</h5>
          <h2 className="heading-lg text-gradient">Techniques</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {competences.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-variant/30 to-bg-variant/10 backdrop-blur-sm border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon background effect */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {item.tech}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {item.experiences.map((exp, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-1.5 relative">
                        <div className="w-2 h-2 rounded-full bg-accent group-hover:bg-primary transition-colors duration-300" />
                        <div className="absolute inset-0 bg-accent/30 rounded-full blur group-hover:bg-primary/30 transition-colors duration-300" />
                      </div>
                      <p className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">{exp}</p>
                    </motion.li>
                  ))}
                </ul>

                {item.framework && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex items-center gap-3 flex-wrap"
                  >
                    <span className="text-text-secondary">Framework</span>
                    <div className="flex gap-2 flex-wrap">
                      {item.framework.split(', ').map((fw, i) => (
                        <span 
                          key={i}
                          className="px-4 py-1.5 rounded-full text-sm bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
                        >
                          {fw}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Slider */}
        <div className="mt-20 w-full overflow-hidden bg-gradient-to-r from-bg-variant/30 to-bg-variant/10 backdrop-blur-sm border-y border-primary/10">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="flex gap-12 py-8 whitespace-nowrap"
          >
            {/* Double the icons for seamless loop */}
            {[...techIcons, ...techIcons].map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {tech.icon}
                </div>
                <span className="text-xs text-text-secondary group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Competences;
