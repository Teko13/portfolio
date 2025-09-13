// fonts
import { Sora } from 'next/font/google';

// font settings
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

// components
import Nav from './Nav';
import Header from './Header';
import TopLeftImg from './TopLeftImg';

// hooks
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

const Layout = ({ children }) => {
  // Activer la navigation par swipe/scroll
  useSwipeNavigation();

  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      <TopLeftImg />
      <Nav />
      <Header />
      {children}
    </div>
  );
};

export default Layout;