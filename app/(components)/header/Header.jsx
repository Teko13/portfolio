import React from 'react';
import { motion } from 'framer-motion';
import { FiMousePointer, FiChevronDown } from 'react-icons/fi';
import CTA from './CTA';
import './header.css'
import ME from '../../(assets)/moi-sans-font.png'
import HeaderSocial from './HeaderSocial';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Header = () => {
    return (
        <section id="header" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20">
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden glass-effect bg-primary"
                >
                    <div className="w-full h-full relative">
                        <img 
                            src={ME.src} 
                            alt="Teko Fabrice" 
                            className="absolute w-full h-full object-cover object-top transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 pointer-events-none" />
                </motion.div>

                <motion.div
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 }
                    }}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-4"
                >
                    <h5 className="text-text-secondary text-xl">Hello Moi, c'est</h5>
                    <h1 className="heading-xl animate-glow">Teko Fabrice</h1>
                    <h5 className="text-text-secondary text-xl font-light">
                        Développeur d'Application Web
                    </h5>
                </motion.div>

                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                >
                    <HeaderSocial />
                </motion.div>

                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                >
                    <CTA />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
                <a
                    href="#footer"
                    className="text-text-secondary hover:text-primary transition-colors duration-300 animate-float"
                >
                    <div className="flex flex-col items-center space-y-2">
                        <FiMousePointer className="text-2xl" />
                        <FiChevronDown className="text-xl animate-bounce" />
                    </div>
                </a>
            </motion.div>

            {/* Effet de particules ou de gradient en arrière-plan */}
            <div className="absolute inset-0 bg-gradient-modern from-bg-variant/20 via-primary/5 to-bg-variant/20" />
        </section>
    );
};

export default Header;
