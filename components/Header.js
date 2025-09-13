// next link
import Link from 'next/link';

// components
import Socials from './Socials';

const Header = () => {
  return (
    <header className='absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* nom */}
          <Link href={'/'} className='text-white hover:text-accent transition-colors duration-300'>
            <h1 className='text-2xl font-semibold tracking-wide'>
              Teko Folly
            </h1>
          </Link>
          {/* socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
