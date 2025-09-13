import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className='bg-primary/60 h-full flex items-center justify-center'>
      <div className='text-center'>
        <motion.div
          className='w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4'
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          className='text-white text-xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Chargement en cours...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
