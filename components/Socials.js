// hooks
import { useState, useEffect } from 'react';

// icons
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiDribbbleLine,
  RiBehanceLine,
  RiPinterestLine,
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterLine,
  RiGlobeLine,
} from 'react-icons/ri';

const Socials = () => {
  const [reseauData, setReseauData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReseauData = async () => {
      try {
        const response = await fetch('/api/portfolio/reseau');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setReseauData(data.data);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des réseaux sociaux:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReseauData();
  }, []);

  // Fonction pour obtenir l'icône basée sur le nom du réseau
  const getIcon = (nom) => {
    const name = nom.toLowerCase();
    if (name.includes('linkedin')) return <RiLinkedinLine />;
    if (name.includes('github')) return <RiGithubLine />;
    if (name.includes('twitter')) return <RiTwitterLine />;
    if (name.includes('facebook')) return <RiFacebookLine />;
    if (name.includes('instagram')) return <RiInstagramLine />;
    if (name.includes('youtube')) return <RiYoutubeLine />;
    if (name.includes('dribbble')) return <RiDribbbleLine />;
    if (name.includes('behance')) return <RiBehanceLine />;
    if (name.includes('pinterest')) return <RiPinterestLine />;
    return <RiGlobeLine />; // Icône par défaut
  };

  if (loading) {
    return (
      <div className='flex items-center gap-x-5 text-lg'>
        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-x-5 text-lg'>
      {reseauData.map((reseau, index) => (
        <a
          key={index}
          href={reseau.url}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-accent transition-all duration-300'
          title={reseau.nom}
        >
          {getIcon(reseau.nom)}
        </a>
      ))}
    </div>
  );
};

export default Socials;