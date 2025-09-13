// framer motion
import { motion } from 'framer-motion';

// Variants optimisés pour de meilleures performances
const transitionVariants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
};

const Transition = () => {
  return (
    <>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#2e2257]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ 
          delay: 0.15, 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart pour de meilleures performances
          type: 'tween' // Force l'utilisation de tween pour de meilleures performances
        }}
        style={{
          willChange: 'transform, width', // Optimisation GPU
          backfaceVisibility: 'hidden', // Optimisation GPU
          transform: 'translateZ(0)' // Force l'accélération matérielle
        }}
      />
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-[#3b2d71]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ 
          delay: 0.3, 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: 'tween'
        }}
        style={{
          willChange: 'transform, width',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      />
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-[#4b3792]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ 
          delay: 0.45, 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: 'tween'
        }}
        style={{
          willChange: 'transform, width',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      />
    </>
  );
};

export default Transition;

