import { motion } from 'framer-motion';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className='bg-primary/60 h-full flex items-center justify-center'>
      <motion.div
        className='text-center max-w-md mx-auto p-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='text-red-400 text-6xl mb-4'>⚠️</div>
        <h2 className='text-white text-2xl font-bold mb-4'>
          Erreur de chargement
        </h2>
        <p className='text-gray-300 mb-6'>
          {error || 'Une erreur est survenue lors du chargement des données.'}
        </p>
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className='bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Réessayer
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorMessage;
