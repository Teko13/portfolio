// Fonction pour organiser les projets en slides de 4
const organizeProjectsIntoSlides = (projets) => {
  if (!projets || projets.length === 0) {
    // Retourner les données statiques par défaut si pas de projets
    return [
      {
        images: [
          { title: 'title', path: '/thumb1.jpg' },
          { title: 'title', path: '/thumb2.jpg' },
          { title: 'title', path: '/thumb3.jpg' },
          { title: 'title', path: '/thumb4.jpg' },
        ],
      },
      {
        images: [
          { title: 'title', path: '/thumb4.jpg' },
          { title: 'title', path: '/thumb1.jpg' },
          { title: 'title', path: '/thumb2.jpg' },
          { title: 'title', path: '/thumb3.jpg' },
        ],
      },
    ];
  }

  const slides = [];
  for (let i = 0; i < projets.length; i += 4) {
    const slideProjects = projets.slice(i, i + 4);
    // S'assurer qu'on a toujours exactement 4 images par slide
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
        // Laisser la case vide au lieu d'ajouter un placeholder
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
import { Pagination } from 'swiper';

// icons
import { BsArrowRight } from 'react-icons/bs';
// next image
import Image from 'next/image';

const WorkSlider = ({ projets = [] }) => {
  const slides = organizeProjectsIntoSlides(projets);

  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='h-[240px] sm:h-[400px]'
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className='grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer h-[200px] sm:h-[360px]'>
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
                                className='flex items-center gap-x-2 hover:text-accent transition-colors duration-300 bg-black/50 px-4 py-2 rounded-lg'
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
                                className='flex items-center gap-x-2 hover:text-accent transition-colors duration-300 bg-black/50 px-4 py-2 rounded-lg'
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
    </div>
  );
};

export default WorkSlider;

