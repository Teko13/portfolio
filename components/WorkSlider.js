// Fonction pour organiser les projets en slides pour mobile (2 projets par slide)
const organizeProjectsForMobile = (projets) => {
  if (!projets || projets.length === 0) {
    return [
      {
        images: [
          { title: 'title', path: '/thumb1.jpg' },
          { title: 'title', path: '/thumb2.jpg' },
        ],
      },
      {
        images: [
          { title: 'title', path: '/thumb3.jpg' },
          { title: 'title', path: '/thumb4.jpg' },
        ],
      },
    ];
  }

  const slides = [];
  for (let i = 0; i < projets.length; i += 2) {
    const slideProjects = projets.slice(i, i + 2);
    const images = [];
    for (let j = 0; j < 2; j++) {
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Choisir la fonction d'organisation selon la taille d'écran
  const slides = isMobile ? organizeProjectsForMobile(projets) : organizeProjectsForDesktop(projets);

  // Debug: afficher le nombre de slides
  console.log(`Nombre de slides: ${slides.length}, isMobile: ${isMobile}`);

  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={slides.length > 1 ? {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        modules={[Pagination, Autoplay]}
        className='h-[350px] md:h-[450px]'
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={`grid gap-4 cursor-pointer h-[350px] md:h-[410px] ${
                isMobile 
                  ? 'grid-cols-1 grid-rows-2' 
                  : 'grid-cols-2 grid-rows-2'
              }`}>
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
                        <div className='absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 md:group-hover:opacity-80 transition-all duration-700'></div>
                        {/* links */}
                        <div className='absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-all duration-300'>
                          <div className='flex flex-col gap-y-2 md:gap-y-3 text-[11px] md:text-[13px] tracking-[0.2em]'>
                            {/* Demo link */}
                            {image.acces_url && image.acces_url !== '#' && (
                              <a 
                                href={image.acces_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className='flex items-center gap-x-1 md:gap-x-2 hover:text-accent transition-colors duration-300 bg-black/50 px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm'
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className='delay-100'>DEMO</div>
                                <div className='text-lg md:text-xl translate-y-[500%] md:group-hover:translate-y-0 transition-all duration-300 delay-150'>
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
                                className='flex items-center gap-x-1 md:gap-x-2 hover:text-accent transition-colors duration-300 bg-black/50 px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm'
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className='delay-200'>CODE</div>
                                <div className='text-lg md:text-xl translate-y-[500%] md:group-hover:translate-y-0 transition-all duration-300 delay-250'>
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
    </div>
  );
};

export default WorkSlider;

