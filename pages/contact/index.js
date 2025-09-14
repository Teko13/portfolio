// components
import Circles from '/components/Circles';
import LoadingSpinner from '/components/LoadingSpinner';
import ErrorMessage from '/components/ErrorMessage';

// icons
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

// hooks
import { useState, useEffect } from 'react';

const Contact = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [reseauData, setReseauData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch personal info and reseau data in parallel
      const [personalResponse, reseauResponse] = await Promise.all([
        fetch('/api/portfolio/moi'),
        fetch('/api/portfolio/reseau')
      ]);

      if (!personalResponse.ok || !reseauResponse.ok) {
        throw new Error(`HTTP error! status: ${personalResponse.status || reseauResponse.status}`);
      }

      const [personalData, reseauData] = await Promise.all([
        personalResponse.json(),
        reseauResponse.json()
      ]);

      if (personalData.success && personalData.data) {
        setPersonalInfo(personalData.data);
      } else {
        throw new Error('Données personnelles non disponibles');
      }

      if (reseauData.success && reseauData.data) {
        setReseauData(reseauData.data);
      } else {
        throw new Error('Données de réseaux sociaux non disponibles');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const retry = () => {
    fetchData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }

  return (
    <div className='h-full bg-primary/30'>
      <Circles />
      <div className='container mx-auto py-0 md:py-32 text-center xl:text-left flex items-center justify-center h-full pt-0'>
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* title */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
            Contactez-<span className='text-accent'>moi</span>
          </motion.h2>
          
          {/* contact info */}
          <motion.div
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex flex-col gap-8 w-full mx-auto'
          >
            {/* email */}
            <div className='flex items-center justify-center xl:justify-start gap-4 p-6 bg-[rgba(65,47,123,0.15)] rounded-lg backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300'>
              <div className='text-accent text-2xl'>
                <FaEnvelope />
              </div>
              <div className='text-left'>
                <p className='text-sm text-white/70 mb-1'>Email</p>
                <a 
                  href={`mailto:${personalInfo?.email}`}
                  className='text-white hover:text-accent transition-colors duration-300'
                >
                  {personalInfo?.email}
                </a>
              </div>
            </div>

            {/* phone */}
            <div className='flex items-center justify-center xl:justify-start gap-4 p-6 bg-[rgba(65,47,123,0.15)] rounded-lg backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300'>
              <div className='text-accent text-2xl'>
                <FaPhone />
              </div>
              <div className='text-left'>
                <p className='text-sm text-white/70 mb-1'>Téléphone</p>
                <a 
                  href={`tel:${personalInfo?.telephone}`}
                  className='text-white hover:text-accent transition-colors duration-300'
                >
                  {personalInfo?.telephone}
                </a>
              </div>
            </div>

            {/* social links */}
            <div className='flex flex-col gap-4'>
              <p className='text-center xl:text-left text-white/70 mb-2'>Retrouvez-moi sur</p>
              <div className='flex justify-center xl:justify-start gap-6 flex-wrap'>
                {reseauData.map((reseau) => {
                  // Get icon based on network name
                  const getIcon = (nom) => {
                    const name = nom.toLowerCase();
                    if (name.includes('linkedin')) return <FaLinkedin />;
                    if (name.includes('github')) return <FaGithub />;
                    if (name.includes('twitter')) return <FaTwitter />;
                    if (name.includes('facebook')) return <FaFacebook />;
                    if (name.includes('instagram')) return <FaInstagram />;
                    return <FaGlobe />; // Default icon
                  };

                  return (
                    <a 
                      key={reseau.id}
                      href={reseau.url} 
                      target='_blank' 
                      rel='noopener noreferrer'
                      className='text-3xl text-white/70 hover:text-accent transition-colors duration-300'
                      title={reseau.nom}
                    >
                      {getIcon(reseau.nom)}
                    </a>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
