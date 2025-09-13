// testimonial slider data
export const testimonialSlider = [
  {
    image: '/t-avt-1.png',
    name: 'Kevin Bonaparta',
    position: 'CLIENT',
    message:
      'Un collaborateur d\'une grande polyvalence et compétent, qui nous a été très utile dans la réalisation de l\'intranet de notre boîte.',
  },
  {
    image: '/t-avt-2.png',
    name: 'Jeanne KAMALOU',
    position: 'CLIENT',
    message:
      'Excellent travail sur notre boutique e-commerce ! Le site est parfaitement fonctionnel, moderne et répond exactement à nos besoins. Je recommande vivement ses services.',
  },
  {
    image: '/t-avt-3.png',
    name: 'Pierre Dubois',
    position: 'CLIENT',
    message:
      'Un professionnel très à l\'écoute et réactif. Son travail en équipe a été exemplaire et a grandement contribué au succès de notre projet. Une collaboration que je recommande.',
  },
];

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';

// icons
import { FaQuoteLeft } from 'react-icons/fa';
// next image
import Image from 'next/image';

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className='h-[400px]'
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center md:flex-row gap-x-8 h-full px-16'>
              {/* avatar, name, position */}
              <div className='w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0'>
                <div className='flex flex-col justify-center text-center'>
                  {/* avatar */}
                  <div className='mb-2 mx-auto'>
                    <Image src={person.image} width={100} height={100} alt='' />
                  </div>
                  {/* name */}
                  <div className='text-lg'>{person.name}</div>
                  {/* position */}
                  <div className='text-[12px] uppercase font-extralight tracking-widest'>
                    {person.position}
                  </div>
                </div>
              </div>
              {/* quote & message */}
              <div className='flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20'>
                {/* quote icon */}
                <div className='mb-4'>
                  <FaQuoteLeft className='text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0' />
                </div>
                {/* message */}
                <div className='xl:text-lg text-center md:text-left'>
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
