// next image
import Image from 'next/image';

// next link
import Link from 'next/link';

// icons
import { HiArrowRight } from 'react-icons/hi2';

const ProjectsBtn = () => {
  return (
    <div className='mx-auto xl:mx-0 z-10'>
      <Link
        href={'/work'}
        className='relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group'
      >
        <svg
          className='animate-spin-slow w-full h-full max-w-[141px] max-h-[148px]'
          viewBox='0 0 141 148'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <path
              id='circle'
              d='M 70.5, 74 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0'
            />
          </defs>
          <text
            className='fill-white'
            fontSize='16'
            fontFamily='Arial, sans-serif'
            fontWeight='600'
            textAnchor='middle'
          >
            <textPath href='#circle' startOffset='0%'>
              MES PROJETS • MES PROJETS • MES PROJETS • MES PROJETS • MES PROJETS • MES PROJETS •
            </textPath>
          </text>
        </svg>
        <HiArrowRight className='absolute text-4xl group-hover:translate-x-2 transition-all duration-300' />
      </Link>
    </div>
  );
};

export default ProjectsBtn;

