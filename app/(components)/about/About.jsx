"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaAward, FaGraduationCap } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import TypeString from '../auto_typing/TypeString';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './about.css';
import ME from '../../(assets)/me.jpg';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const imageContainerVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const About = () => {
  const [displayContent, setDisplayContent] = useState(false);
  
  const handelScrollView = (sectionId) => {
    if (sectionId !== undefined) {
      setDisplayContent(true);
    }
  };

  const PresentationText = "Dans l'ombre des octets, notre monde s'invente. Ma curiosité et ma créativité m'obligent, je ne peux qu'être acteur de cet orchestre qui épouse les possibilités de demain. Les projets ambitieux sont ce qui convertit le futur en présent. Quelle que soit leur nature, ils n'échapperont pas à cet orchestre où les 0 et 1 font la loi dans les partitions. Étant un harmoniste qui saurait harmoniser vos besoins avec grande habileté, je vous propose de composer ensemble !";

  const cards = [
    {
      icon: <FaGraduationCap className="text-3xl text-accent" />,
      title: "Diplômes",
      content: [
        "Titre RNCP niveau 6 (bac+3/4) Concepteur Développeur d'Application",
        "Titre RNCP niveau 5 (bac+2) Développeur Web"
      ]
    },
    {
      icon: <VscFolderLibrary className="text-3xl text-accent" />,
      title: "Projets",
      content: ["Plusieurs projets réalisés", "dans diverses technologies"]
    },
    {
      icon: <FiUser className="text-3xl text-accent" />,
      title: "Soft skills",
      content: ["Autonomie", "Curiosité", "Rigueur", "Persévérance"]
    }
  ];

  const activeSection = useScrollSpy(['about'], 100);
  const isActive = activeSection === 'about';

  return (
    <section id="about" className={isActive ? 'isCurrent' : ''}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h5 className="text-text-secondary text-xl mb-2">À Propos</h5>
          <h2 className="heading-lg text-gradient">De Moi</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div 
              className="relative w-full max-w-md mx-auto h-[500px] rounded-2xl overflow-hidden glass-effect"
              variants={imageContainerVariants}
              whileHover="hover"
            >
              <Image
                src={ME}
                alt="Ma photo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="transition-transform duration-500 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-lg text-text-primary">
              {displayContent && <TypeString text={PresentationText} typingdelay={30} />}
            </div>
            <motion.a
              href="#contact"
              className="btn inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me Contacter
              <span className="text-lg">→</span>
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card p-6 space-y-4"
            >
              <div className="flex items-center gap-4 mb-4">
                {card.icon}
                <h5 className="text-xl font-semibold text-text-primary">{card.title}</h5>
              </div>
              <div className="space-y-2">
                {card.content.map((item, i) => (
                  <div key={i} className="text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
