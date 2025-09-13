import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Ordre des pages pour la navigation
const pageOrder = [
  '/',           // Accueil
  '/about',      // À propos
  '/competences', // Compétences
  '/work',       // Projets
  '/testimonials', // Témoignages
  '/contact'     // Contact
];

const useSwipeNavigation = () => {
  const router = useRouter();
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  // Fonction pour obtenir l'index de la page actuelle
  const getCurrentPageIndex = () => {
    return pageOrder.indexOf(router.pathname);
  };

  // Fonction pour naviguer vers la page suivante
  const goToNextPage = () => {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex < pageOrder.length - 1) {
      router.push(pageOrder[currentIndex + 1]);
    }
  };

  // Fonction pour naviguer vers la page précédente
  const goToPreviousPage = () => {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex > 0) {
      router.push(pageOrder[currentIndex - 1]);
    }
  };

  // Gestion des événements tactiles
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    isScrolling.current = false;
  };

  const handleTouchMove = (e) => {
    if (!touchStartY.current) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY.current - touchY;
    
    // Détecter si c'est un swipe vertical significatif
    if (Math.abs(diff) > 50) {
      isScrolling.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartY.current || !isScrolling.current) return;
    
    touchEndY.current = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    const now = Date.now();
    
    // Éviter les swipes trop rapides (debounce)
    if (now - lastScrollTime.current < 1000) return;
    
    // Swipe vers le haut (page précédente)
    if (diff > 100) {
      lastScrollTime.current = now;
      goToPreviousPage();
    }
    // Swipe vers le bas (page suivante)
    else if (diff < -100) {
      lastScrollTime.current = now;
      goToNextPage();
    }
    
    // Reset
    touchStartY.current = 0;
    touchEndY.current = 0;
    isScrolling.current = false;
  };

  // Gestion de la molette de la souris
  const handleWheel = (e) => {
    const now = Date.now();
    
    // Éviter les scrolls trop rapides (debounce)
    if (now - lastScrollTime.current < 1000) return;
    
    // Scroll vers le haut (page précédente)
    if (e.deltaY < -50) {
      lastScrollTime.current = now;
      e.preventDefault();
      goToPreviousPage();
    }
    // Scroll vers le bas (page suivante)
    else if (e.deltaY > 50) {
      lastScrollTime.current = now;
      e.preventDefault();
      goToNextPage();
    }
  };

  // Gestion des touches clavier
  const handleKeyDown = (e) => {
    const now = Date.now();
    
    // Éviter les touches trop rapides (debounce)
    if (now - lastScrollTime.current < 500) return;
    
    // Flèche vers le haut (page précédente)
    if (e.key === 'ArrowUp') {
      lastScrollTime.current = now;
      e.preventDefault();
      goToPreviousPage();
    }
    // Flèche vers le bas (page suivante)
    else if (e.key === 'ArrowDown') {
      lastScrollTime.current = now;
      e.preventDefault();
      goToNextPage();
    }
  };

  useEffect(() => {
    // Ajouter les event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router.pathname]);

  return {
    goToNextPage,
    goToPreviousPage,
    getCurrentPageIndex,
    pageOrder
  };
};

export { useSwipeNavigation };
