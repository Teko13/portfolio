"use client";

import React from 'react';
import { LazyMotion, domAnimation, m as motion } from 'framer-motion';
import About from './(components)/about/About';
import Bg from './(components)/bg/Bg';
import Competences from './(components)/competences/Competences';
import Nav from './(components)/nav/Nav';
import Footer from './(components)/footer/Footer';
import Header from './(components)/header/Header';
import Portfolio from './(components)/portfolio/Portfolio';
import Skills from './(components)/skills/Skills';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen bg-bg overflow-hidden">
        <Bg />
        
        <motion.main
          initial="initial"
          animate="animate"
          className="relative z-10"
        >
          <motion.div {...fadeInUp} className="mb-16">
            <Header />
          </motion.div>

          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.2 }}
            className="section"
          >
            <About />
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="section bg-bg-variant/30 backdrop-blur-sm"
          >
            <Competences />
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="section"
          >
            <Portfolio />
          </motion.div>

          <motion.footer 
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <Footer />
          </motion.footer>
        </motion.main>

        <Nav />
      </div>
    </LazyMotion>
  );
}
