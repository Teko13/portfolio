import React, { useState, useEffect, useCallback } from 'react';

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
  FaPhp,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiAdobexd,
  SiAdobephotoshop,
  SiSymfony,
  SiReact,
} from 'react-icons/si';

import { FaDownload } from 'react-icons/fa';

// hooks
import { usePortfolioData } from '../../hooks/usePortfolioData';

// about data
export const aboutData = [
  {
    title: 'spécialités',
    info: [
      {
        title: 'Développement web',
        icons: [
          <FaJs />,
          <FaReact />,
          <SiNextdotjs />,
          <FaPhp />,
          <SiSymfony />,
          <FaWordpress />,
        ],
      },
      {
        title: 'Développement mobile',
        icons: [
          <SiReact />,
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [
          <FaHtml5 />,
          <FaCss3 />,
          <FaFigma />,
        ],
      },
    ],
  },
  {
    title: 'formation',
    info: [],
  },
  {
    title: 'cv',
    info: [],
  },
];

// Fonction pour obtenir l'icône appropriée selon le nom de la compétence
const getCompetenceIcon = (competenceName) => {
  const name = competenceName.toLowerCase();
  
  if (name.includes('html')) return <FaHtml5 />;
  if (name.includes('css')) return <FaCss3 />;
  if (name.includes('javascript') || name.includes('js')) return <FaJs />;
  if (name.includes('react')) return <FaReact />;
  if (name.includes('next') || name.includes('next.js')) return <SiNextdotjs />;
  if (name.includes('framer') || name.includes('motion')) return <SiFramer />;
  if (name.includes('wordpress')) return <FaWordpress />;
  if (name.includes('figma')) return <FaFigma />;
  if (name.includes('adobe xd') || name.includes('xd')) return <SiAdobexd />;
  if (name.includes('photoshop') || name.includes('ps')) return <SiAdobephotoshop />;
  if (name.includes('node') || name.includes('node.js')) return <FaJs />;
  if (name.includes('vue') || name.includes('vue.js')) return <FaJs />;
  if (name.includes('angular')) return <FaJs />;
  if (name.includes('typescript') || name.includes('ts')) return <FaJs />;
  if (name.includes('sass') || name.includes('scss')) return <FaCss3 />;
  if (name.includes('tailwind') || name.includes('bootstrap')) return <FaCss3 />;
  if (name.includes('git') || name.includes('github')) return <FaJs />;
  if (name.includes('docker') || name.includes('kubernetes')) return <FaJs />;
  if (name.includes('mongodb') || name.includes('sql')) return <FaJs />;
  if (name.includes('php')) return <FaPhp />;
  if (name.includes('symfony')) return <SiSymfony />;
  if (name.includes('react native') || name.includes('reactnative')) return <SiReact />;
  
  // Icône par défaut pour les compétences non reconnues
  return <FaJs />;
};

// Fonction pour formater les données des compétences
const formatCompetencesData = (competences) => {
  // Toujours retourner les icônes statiques originales
  return [
    {
      title: 'Développement web',
      icons: [
        <FaJs />,
        <FaReact />,
        <SiNextdotjs />,
        <FaPhp />,
        <SiSymfony />,
        <FaWordpress />,
    ],
  },
  {
      title: 'Développement mobile',
      icons: [
        <SiReact />,
      ],
    },
    {
      title: 'UI/UX Design',
      icons: [
        <FaHtml5 />,
        <FaCss3 />,
        <FaFigma />,
    ],
  },
];
};

// Fonction pour formater les données de parcours
const formatParcoursData = (parcours) => {
  if (!parcours || parcours.length === 0) {
    return [];
  }

  return parcours.map(parcour => ({
    title: parcour.titre,
    stage: new Date(parcour.obtenu_en).getFullYear().toString(),
    ecole: parcour.ecole,
    diplomeUrl: parcour.diplome_pdf_url
  }));
};

// Fonction pour formater les données du CV
const formatCVData = (personalInfo) => {
  if (!personalInfo || !personalInfo.cv_url) {
    return [];
  }

  return [{
    title: 'Mon CV',
    stage: '',
    cvUrl: personalInfo.cv_url
  }];
};

// components
import Avatar from '../../components/Avatar';
import Circles from '../../components/Circles';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const About = () => {
  const [index, setIndex] = useState(0);
  const { personalInfo, loading, error, retry } = usePortfolioData();
  const [parcours, setParcours] = useState([]);
  const [parcoursLoading, setParcoursLoading] = useState(true);
  const [parcoursError, setParcoursError] = useState(null);

  // Récupérer les données de parcours depuis l'API
  const fetchParcours = useCallback(async () => {
    try {
      setParcoursLoading(true);
      setParcoursError(null);
      const response = await fetch('/api/portfolio/parcours');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        setParcours(data.data);
      } else {
        throw new Error('Données de parcours non disponibles');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des parcours:', error);
      setParcoursError(error.message);
    } finally {
      setParcoursLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParcours();
  }, [fetchParcours]);

  // Récupérer les compétences depuis l'API
  const [competences, setCompetences] = useState([]);
  const [competencesLoading, setCompetencesLoading] = useState(true);

  // Fonction pour récupérer les compétences
  const fetchCompetences = async () => {
    try {
      const response = await fetch('/api/portfolio/competences');
      if (!response.ok) throw new Error('Erreur lors de la récupération des compétences');
      const data = await response.json();
      if (data.success) {
        setCompetences(data.data);
      }
    } catch (error) {
      console.error('Erreur compétences:', error);
    } finally {
      setCompetencesLoading(false);
    }
  };

  // Récupérer les compétences au chargement du composant
  React.useEffect(() => {
    fetchCompetences();
  }, []);

  // Formater les données des compétences, parcours et CV
  const competencesData = formatCompetencesData(competences);
  const parcoursData = formatParcoursData(parcours);
  const cvData = formatCVData(personalInfo);

  // Mettre à jour aboutData avec les données dynamiques
  const dynamicAboutData = [
    {
      title: 'spécialités',
      info: competencesData,
    },
    {
      title: 'formation',
      info: parcoursData,
    },
    {
      title: 'cv',
      info: cvData,
    },
  ];

  if (loading || competencesLoading || parcoursLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }

  return (
    <div className='h-full bg-primary/30 py-8 md:py-32 text-center xl:text-left'>
      <Circles />
      {/* avatar img */}
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden xl:flex absolute bottom-0 -left-[370px]'
      >
        <Avatar />
      </motion.div>
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 pt-4 md:pt-0'>
        {/* text */}
        <div className='flex-1 flex flex-col justify-center'>
          <motion.h2
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-4xl md:text-6xl xl:text-7xl'
          >
            Qui <span className='text-accent'>suis-je</span>
          </motion.h2>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-sm md:text-base'
          >
            {personalInfo?.resume || 'Développeur passionné créant des expériences numériques innovantes. Spécialisé dans le développement web et mobile avec une approche moderne et performante.'}
          </motion.p>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:max-w-[48%] h-[400px] md:h-[480px]'
        >
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {dynamicAboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
                  }  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className='py-1 md:py-2 xl:py-6 flex flex-col gap-y-1 md:gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {dynamicAboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className='flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60 text-sm md:text-base'
                >
                  {/* title */}
                  <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                  <div className='hidden md:flex'>-</div>
                  <div>{item.stage}</div>
                  
                  {/* Bouton de téléchargement pour la formation */}
                  {dynamicAboutData[index].title === 'formation' && item.diplomeUrl && (
                    <a
                      href={item.diplomeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='ml-4 inline-flex items-center gap-2 px-3 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded-md transition-colors duration-300 text-xs md:text-sm'
                    >
                      <FaDownload className='text-xs' />
                      Diplôme
                    </a>
                  )}
                  
                  {/* Bouton de téléchargement pour le CV */}
                  {dynamicAboutData[index].title === 'cv' && item.cvUrl && (
                    <a
                      href={item.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='ml-4 inline-flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-md transition-colors duration-300 text-xs md:text-sm font-medium'
                    >
                      <FaDownload className='text-sm' />
                      Télécharger mon CV
                    </a>
                  )}
                  
                  <div className='flex gap-x-4'>
                    {/* icons */}
                    {item.icons?.map((icon, iconIndex) => {
                      return <div key={iconIndex} className='text-xl md:text-2xl text-white'>{icon}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
