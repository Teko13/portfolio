// Fonction pour organiser les projets pour mobile (liste simple)
const organizeProjectsForMobile = (projets) => {
  if (!projets || projets.length === 0) {
    return [
      { title: 'Projet 1', path: '/thumb1.jpg', id: 1 },
      { title: 'Projet 2', path: '/thumb2.jpg', id: 2 },
      { title: 'Projet 3', path: '/thumb3.jpg', id: 3 },
      { title: 'Projet 4', path: '/thumb4.jpg', id: 4 },
    ];
  }

  return projets.map(projet => ({
    title: projet.titre,
    path: projet.image_url,
    description: projet.description,
    acces_url: projet.acces_url,
    source_url: projet.source_url,
    category: projet.category,
    id: projet.id
  }));
};

// Fonction pour organiser les projets en slides pour desktop (4 projets par slide)
const organizeProjectsForDesktop = (projets) => {
  if (!projets || projets.length === 0) {
    return [
      {
        images: [
          { title: 'title', path: '/thumb1.jpg' },
          { title: 'title', path: '/thumb2.jpg' },
          { title: 'title', path: '/thumb3.jpg' },
          { title: 'title', path: '/thumb4.jpg' },
        ],
      },
    ];
  }

  const slides = [];
  for (let i = 0; i < projets.length; i += 4) {
    const slideProjects = projets.slice(i, i + 4);
    const images = [];
    for (let j = 0; j < 4; j++) {
      if (slideProjects[j]) {
        images.push({
          title: slideProjects[j].titre,
          path: slideProjects[j].image_url,
          description: slideProjects[j].description,
          acces_url: slideProjects[j].acces_url,
          source_url: slideProjects[j].source_url,
          category: slideProjects[j].category,
          id: slideProjects[j].id
        });
      } else {
        images.push(null);
      }
    }
    slides.push({ images });
  }
  return slides;
};

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper';

// hooks
import { useState, useEffect } from 'react';
// icons
import { BsArrowRight } from 'react-icons/bs';
// next image
import Image from 'next/image';

const WorkSlider = ({ projets = [] }) => {
  // Utiliser des hooks pour détecter la taille d'écran
  const [isMobile, setIsMobile] = useState(false);
  // État pour gérer la sélection sur mobile
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      console.log(`Screen size check: ${window.innerWidth}px, isMobile: ${mobile}`);
      setIsMobile(mobile);
    };
    
    // Vérifier immédiatement
    checkScreenSize();
    
    // Ajouter un délai pour s'assurer que le DOM est prêt
    const timeoutId = setTimeout(checkScreenSize, 100);
    
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Choisir la fonction d'organisation selon la taille d'écran
  const mobileProjects = organizeProjectsForMobile(projets);
  const desktopSlides = organizeProjectsForDesktop(projets);

  // Debug: afficher le nombre de projets/slides
  console.log(`Mobile projects: ${mobileProjects.length}, Desktop slides: ${desktopSlides.length}, isMobile: ${isMobile}, projets: ${projets.length}`);

  // Fonction pour gérer le clic sur mobile
  const handleProjectClick = (projectId) => {
    if (isMobile) {
      setSelectedProject(selectedProject === projectId ? null : projectId);
    }
  };

  return (
    <div className='w-full'>
      {isMobile ? (
        // Mode mobile : liste verticale scrollable
        <div className='h-[400px] overflow-y-auto space-y-4 pr-2'>
          {mobileProjects.map((project) => {
            const isSelected = selectedProject === project.id;
            
            return (
              <div
                key={project.id}
                className='relative rounded-lg overflow-hidden group w-full h-[200px] cursor-pointer'
                onClick={() => handleProjectClick(project.id)}
              >
                <div className='relative w-full h-full overflow-hidden'>
                  {/* image */}
                  <Image 
                    src={project.path || '/thumb1.jpg'} 
                    fill
                    alt={project.title || 'Projet'} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = '/thumb1.jpg';
                    }}
                  />
                  {/* overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] transition-all duration-700 ${
                    isSelected ? 'opacity-80' : 'opacity-0'
                  }`}></div>
                  {/* links */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className='flex flex-col gap-y-2 text-[11px] tracking-[0.2em]'>
                      {/* Demo link */}
                      {project.acces_url && project.acces_url !== '#' && (
                        <a 
                          href={project.acces_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className='flex items-center gap-x-1 hover:text-accent transition-colors duration-300 bg-black/50 px-2 py-1 rounded-lg text-xs'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='delay-100'>DEMO</div>
                          <div className={`text-lg transition-all duration-300 delay-150 ${
                            isSelected ? 'translate-y-0' : 'translate-y-[500%]'
                          }`}>
                            <BsArrowRight />
                          </div>
                        </a>
                      )}
                      {/* Source link */}
                      {project.source_url && project.source_url !== '#' && (
                        <a 
                          href={project.source_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className='flex items-center gap-x-1 hover:text-accent transition-colors duration-300 bg-black/50 px-2 py-1 rounded-lg text-xs'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='delay-200'>CODE</div>
                          <div className={`text-lg transition-all duration-300 delay-250 ${
                            isSelected ? 'translate-y-0' : 'translate-y-[500%]'
                          }`}>
                            <BsArrowRight />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Mode desktop : carousel Swiper
        <Swiper
          spaceBetween={10}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
          className='h-[450px]'
        >
          {desktopSlides.map((slide, index) => {
            return (
              <SwiperSlide key={index}>
                <div className='grid gap-4 cursor-pointer h-[410px] grid-cols-2 grid-rows-2'>
                  {slide.images.map((image, imageIndex) => {
                    // Si l'image est null (case vide), afficher une div vide
                    if (!image) {
                      return (
                        <div
                          key={`empty-${imageIndex}`}
                          className='w-full h-full'
                        >
                          {/* Case vide */}
                        </div>
                      );
                    }
                    
                    return (
                      <div
                        className='relative rounded-lg overflow-hidden group w-full h-full'
                        key={image.id || imageIndex}
                      >
                        <div className='relative w-full h-full overflow-hidden'>
                          {/* image */}
                          <Image 
                            src={image.path || '/thumb1.jpg'} 
                            fill
                            alt={image.title || 'Projet'} 
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              e.target.src = '/thumb1.jpg';
                            }}
                          />
                          {/* overlay gradient */}
                          <div className='absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700'></div>
                          {/* links */}
                          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                            <div className='flex flex-col gap-y-3 text-[13px] tracking-[0.2em]'>
                              {/* Demo link */}
                              {image.acces_url && image.acces_url !== '#' && (
                                <a 
                                  href={image.acces_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className='flex items-center gap-x-2 hover:text-accent transition-colors duration-300 bg-black/50 px-4 py-2 rounded-lg text-sm'
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className='delay-100'>DEMO</div>
                                  <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150'>
                                    <BsArrowRight />
                                  </div>
                                </a>
                              )}
                              {/* Source link */}
                              {image.source_url && image.source_url !== '#' && (
                                <a 
                                  href={image.source_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className='flex items-center gap-x-2 hover:text-accent transition-colors duration-300 bg-black/50 px-4 py-2 rounded-lg text-sm'
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className='delay-200'>CODE</div>
                                  <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-250'>
                                    <BsArrowRight />
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default WorkSlider;

