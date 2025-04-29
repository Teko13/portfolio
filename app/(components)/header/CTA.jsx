import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiMail } from 'react-icons/fi';
//import CV from '../../(assets)/cv.pdf'

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const CTA = () => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.a
        href="/cv/view"
        className="btn inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white shadow-glow"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.3 }}
      >
        <FiFileText className="text-xl" />
        <span>Voir mon CV</span>
        <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.a>

      <motion.a
        href="#footer"
        className="btn btn-outline inline-flex items-center gap-2"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FiMail className="text-xl" />
        <span>Mes Coordonnées</span>
        <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.a>
    </motion.div>
  );
};

export default CTA;
