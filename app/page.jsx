import React from 'react';
import About from './(components)/about/About';
import Bg from './(components)/bg/Bg';
import Competences from './(components)/competences/Competences';
import Nav from './(components)/nav/Nav';
import Footer from './(components)/footer/Footer';
import Header from './(components)/header/Header';
import Portfolio from './(components)/portfolio/Portfolio';
import Skills from './(components)/skills/Skills';
export default function Home() {
  return (
    <div>
            <Bg />
            <Header />
            <About />
            <Competences />
            
            <Portfolio />
            <Footer />
            <Nav />
        </div>
  );
}
