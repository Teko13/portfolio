import React, { useState, useEffect } from 'react';

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper';

// components
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
  FaPhp,
  FaCode,
  FaDatabase,
  FaMobile,
  FaServer,
  FaGitAlt,
  FaDocker,
  FaNodeJs,
  FaVue,
  FaAngular,
  FaBootstrap,
  FaSass,
  FaGlobe,
  FaLock,
  FaPalette,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiSymfony,
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiAdobexd,
  SiAdobephotoshop,
} from 'react-icons/si';

import { RxArrowTopRight } from 'react-icons/rx';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

// Fonction pour obtenir l'icône correspondant à une compétence
const getCompetenceIcon = (competenceName) => {
  const name = competenceName.toLowerCase();
  
  // Icônes spécifiques selon les demandes
  if (name.includes('développeur') && name.includes('full-stack')) return <FaGlobe className="text-accent text-4xl" />;
  if (name.includes('cms') || name.includes('content management')) return <FaWordpress className="text-accent text-4xl" />;
  if (name.includes('base de données') || name.includes('database') || name.includes('données')) return <FaDatabase className="text-accent text-4xl" />;
  if (name.includes('performance') && name.includes('sécurité')) return <FaLock className="text-accent text-4xl" />;
  if (name.includes('ui/ux') || name.includes('design')) return <FaPalette className="text-accent text-4xl" />;
  
  // Icônes techniques spécifiques
  if (name.includes('html')) return <FaHtml5 className="text-accent text-4xl" />;
  if (name.includes('css')) return <FaCss3 className="text-accent text-4xl" />;
  if (name.includes('javascript') || name.includes('js')) return <FaJs className="text-accent text-4xl" />;
  if (name.includes('react') && !name.includes('native')) return <FaReact className="text-accent text-4xl" />;
  if (name.includes('next') || name.includes('next.js')) return <SiNextdotjs className="text-accent text-4xl" />;
  if (name.includes('wordpress')) return <FaWordpress className="text-accent text-4xl" />;
  if (name.includes('figma')) return <FaFigma className="text-accent text-4xl" />;
  if (name.includes('adobe') || name.includes('photoshop')) return <SiAdobephotoshop className="text-accent text-4xl" />;
  if (name.includes('adobe') || name.includes('xd')) return <SiAdobexd className="text-accent text-4xl" />;
  if (name.includes('node') || name.includes('node.js')) return <FaNodeJs className="text-accent text-4xl" />;
  if (name.includes('vue') || name.includes('vue.js')) return <FaVue className="text-accent text-4xl" />;
  if (name.includes('angular')) return <FaAngular className="text-accent text-4xl" />;
  if (name.includes('typescript') || name.includes('ts')) return <SiTypescript className="text-accent text-4xl" />;
  if (name.includes('sass') || name.includes('scss')) return <FaSass className="text-accent text-4xl" />;
  if (name.includes('tailwind')) return <SiTailwindcss className="text-accent text-4xl" />;
  if (name.includes('bootstrap')) return <FaBootstrap className="text-accent text-4xl" />;
  if (name.includes('git') || name.includes('github')) return <FaGitAlt className="text-accent text-4xl" />;
  if (name.includes('docker')) return <FaDocker className="text-accent text-4xl" />;
  if (name.includes('mongodb')) return <SiMongodb className="text-accent text-4xl" />;
  if (name.includes('mysql') || name.includes('sql')) return <SiMysql className="text-accent text-4xl" />;
  if (name.includes('php')) return <FaPhp className="text-accent text-4xl" />;
  if (name.includes('symfony')) return <SiSymfony className="text-accent text-4xl" />;
  if (name.includes('mobile') || name.includes('app')) return <FaMobile className="text-accent text-4xl" />;
  if (name.includes('server') || name.includes('backend')) return <FaServer className="text-accent text-4xl" />;
  if (name.includes('database') || name.includes('db')) return <FaDatabase className="text-accent text-4xl" />;
  
  // Icône par défaut
  return <FaCode className="text-accent text-4xl" />;
};

// Fonction pour tronquer le texte
const truncateText = (text, maxLength = 80) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const Competences = () => {
  const [competences, setCompetences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les compétences depuis l'API
  const fetchCompetences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/portfolio/competences');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        setCompetences(data.data);
      } else {
        throw new Error('Données de compétences non disponibles');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetences();
  }, []);

  const retry = () => {
    fetchCompetences();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }

  return (
    <div className='h-full bg-primary/30 py-12 md:py-36 flex items-start md:items-center'>
      <Circles />
      <div className='container mx-auto pt-8 md:pt-0'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          {/* text */}
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-6 md:mb-4 xl:mb-0'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h2 xl:mt-8'
            >
              Mes compétences <span className='text-accent'>.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='mb-6 md:mb-4 max-w-[400px] mx-auto lg:mx-0'
            >
              Découvrez mon expertise technique et mes compétences en détail.
            </motion.p>
          </div>

          {/* competences slider */}
          <motion.div
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full xl:max-w-[65%]'
          >
            <Swiper
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className='h-auto sm:h-[340px]'
            >
              {competences.map((competence, index) => {
                return (
                  <SwiperSlide key={competence.id}>
                    <div className='bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex flex-col gap-y-4 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 overflow-hidden items-center'>
                      {/* icon */}
                      <div className='text-4xl text-accent flex-shrink-0 text-center'>
                        {getCompetenceIcon(competence.titre)}
                      </div>
                      {/* title & desc */}
                      <div className='flex-1 text-center'>
                        <div className='mb-2 text-lg'>{competence.titre}</div>
                        <p className='max-w-[350px] leading-normal md:transition-all md:duration-300 md:group-hover:max-w-none'>
                          <span className='md:group-hover:hidden'>
                            {competence.description}
                          </span>
                          <span className='hidden md:group-hover:inline'>
                            {competence.description}
                          </span>
                        </p>
                      </div>
                      {/* arrow */}
                      <div className='text-3xl flex-shrink-0 text-center'>
                        <RxArrowTopRight className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300' />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Competences;
