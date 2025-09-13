// next image
import Image from 'next/image';

// components
import ParticlesContainer from '../components/ParticlesContainer';
import ProjectsBtn from '../components/ProjectsBtn';
import Avatar from '../components/Avatar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../variants';

// hooks
import { usePortfolioData } from '../hooks/usePortfolioData';

const Home = () => {
  const { personalInfo, gallery, loading, error, getPhotoByTitle, isDataReady, retry } = usePortfolioData();
  
  // Récupérer la photo de profil depuis la galerie
  const profilePhoto = getPhotoByTitle('photot_de_profil_sans_fond');

  // Fonction pour couper le titre en deux lignes
  const formatTitle = (title) => {
    if (!title) return 'Développeur Web Full-Stack';
    
    const words = title.split(' ');
    if (words.length <= 3) return title;
    
    const midPoint = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, midPoint).join(' ');
    const secondLine = words.slice(midPoint).join(' ');
    
    return (
      <>
        <span className='text-accent text-2xl md:text-3xl xl:text-4xl block'>{firstLine}</span>
        <span className='text-accent text-2xl md:text-3xl xl:text-4xl block mt-0'>{secondLine}</span>
      </>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }

  // Si pas de données, afficher un message
  if (!isDataReady()) {
    return (
      <div className='bg-primary/60 h-full flex items-center justify-center'>
        <div className='text-white text-xl text-center'>
          <p>Aucune donnée disponible</p>
          <p className='text-sm mt-2'>Veuillez réessayer plus tard</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-primary/60 h-full'>
      {/* text */}
      <div className='w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10'>
        <div className='text-center flex flex-col justify-center pt-20 md:pt-32 xl:pt-40 xl:text-left h-full container mx-auto px-4 md:px-0'>
          {/* title */}
            <motion.h1
              variants={fadeIn('down', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='h1'
            >
            {personalInfo?.prenom && personalInfo?.nom ? (
              <>
                {personalInfo.prenom} {personalInfo.nom} <br />
                <span className='text-accent'>
                  {formatTitle(personalInfo.titre)}
                </span>
              </>
            ) : (
              <>
                Transforming Ideas <br />
                <span className='text-accent'>Into Digital Reality</span>
              </>
            )}
          </motion.h1>
          {/* subtitle */}
            <motion.p
              variants={fadeIn('down', 0.3)}
              initial='hidden'
              animate='show'
              exit='hidden'
              className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-6 md:mb-10 xl:mb-16 px-2 md:px-0'
            >
            Développeur web et mobile, je conçois des projets complets avec des solutions claires et performantes. En quête constante de nouvelles technologies pour optimiser l'expérience utilisateur.
          </motion.p>
          {/* btn */}
          <div className='flex justify-center xl:hidden relative'>
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex'
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className='w-[1200px] h-full absolute right-0 bottom-0'>
        {/* bg img */}
        <div className='bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0'></div>
        {/* particles */}
        <ParticlesContainer />
        {/* avatar img */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial='hidden'
          animate='show'
          exit='hidden'
          transition={{ duration: 1, ease: 'easeInOut' }}
          className='w-full h-full max-w-[600px] max-h-[550px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]'
        >
          <Avatar profilePhoto={profilePhoto} />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
