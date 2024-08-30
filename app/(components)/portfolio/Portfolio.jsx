"use client";
import React from 'react';
import './portfolio.css'
import IMG1 from '../../(assets)/portfolio1.png';
import IMG2 from '../../(assets)/portfolio2.png';
import IMG3 from '../../(assets)/portfolio3.png';
import IMG4 from '../../(assets)/portfolio4.png';
import IMG5 from '../../(assets)/portfolio5.png';
import IMG6 from '../../(assets)/portfolio6.png';
import IMG7 from '../../(assets)/portfolio7.png';
import IMG8 from '../../(assets)/portfolio8.png';
import IMG9 from '../../(assets)/portfolio9.png';
import IMG10 from '../../(assets)/portfolio10.png';
import IMG11 from '../../(assets)/portfolio11.png';
import IMG12 from '../../(assets)/img_api.webp';
import IMG13 from '../../(assets)/img_todo.webp';
import IMG14 from '../../(assets)/img_ai.webp';
import IMG15 from "../../(assets)/le_jardin_enchante.png"
import IMG16 from "../../(assets)/mawuena.png";


import { useState } from 'react';

const Portfolio = () => {
    const [category, setCategory] = useState("main");
    const projectsMap = [
        {
            img: IMG16,
            title: "Mawuena Manucure Russe",
            gitSource: "",
            gitLive: "https://mawuena-manucure-russe.com/",
            category: ["main"]
        },
        {
            img: IMG1,
            title: "Booki",
            gitSource: "https://github.com/Teko13/booki",
            gitLive: "https://teko13.github.io/booki/",
            category: ["html/css/js"]
        },
        {
            img: IMG2,
            title: "OmyFood",
            gitSource: "https://github.com/Teko13/OmyFood",
            gitLive: "https://teko13.github.io/OmyFood/",
            category: ["html/css/js"]
        },
        {
            img: IMG3,
            title: "Audit et optimisation SEO",
            gitSource: "https://github.com/Teko13/La_Panthere",
            gitLive: "https://teko13.github.io/La_Panthere/",
            category: ["html/css/js"]
        },
        {
            img: IMG4,
            title: "Kanap",
            gitSource: "https://github.com/Teko13/Canap",
            gitLive: "",
            category: ["react/js"]
        },
        {
            img: IMG5,
            title: "Hot Takes (API)",
            gitSource: "https://github.com/Teko13/piquante",
            gitLive: "",
            category: ["node"]
        },
        {
            img: IMG6,
            title: "Groupomania",
            gitSource: "https://github.com/Teko13/groupomania.git",
            gitLive: "",
            category: ["react/js", "node"]
        },
        {
            img: IMG7,
            title: "CTECH",
            gitSource: "https://github.com/Teko13/CTECH",
            gitLive: "https://teko13.github.io/CTECH/",
            category: ["react/js"]
        },
        {
            img: IMG9,
            title: "Nyrvanah",
            gitSource: "",
            gitLive: "http://nyrvanah.com",
            category: ["main"]
        },
        {
            img: IMG15,
            title: "Le Jardin Enchanté",
            gitSource: "https://github.com/Teko13/jardin_enchante",
            gitLive: "https://jardin-enchante.vercel.app",
            category: ["main"]
        },
        {
            img: IMG10,
            title: "Les Etoiles sur le Podium",
            gitSource: "",
            gitLive: "http://assoc.nyrvanah.com",
            category: ["main"]
        },
        {
            img: IMG11,
            title: "Santé Metapress",
            gitSource: "https://github.com/teko13/sante",
            gitLive: "https://teko13.github.io/sante",
            category: ["main"]
        },
        {
            img: IMG12,
            title: "Bilmo",
            gitSource: "https://github.com/Teko13/BileMo/",
            gitLive: "",
            category: ["main"]
        },
        {
            img: IMG13,
            title: "ToDo & Co",
            gitSource: "https://github.com/Teko13/ToDoAndCo",
            gitLive: "",
            category: [""]
        },
        {
            img: IMG14,
            title: "AIGenius",
            gitSource: "https://github.com/Teko13/AIGenius",
            gitLive: "",
            category: ["main"]
        },
    ];
    return (
        <section id='portfolio'>
            <h5>Mes</h5>
            <h2>Projets</h2>
            <div className="category">
                <h3 onClick={() => {
                    setCategory("main")
                }} className={category === 'main' ? "selected" : ""}>Aperçue</h3>
                <h3 onClick={() => {
                    setCategory("all")
                }} className={category === "html/css/js" ? "selected" : ""} >Tout</h3>
            </div>
            <div className="container portfolio__container">
                {
                    projectsMap.map((project, index) => {
                        if (category === "all") {
                            return (
                                <article key={index} className="portfolio__item">
                                    <div className="portfolio__item-image">
                                        <img src={project.img.src} alt="project visual" />
                                    </div>
                                    <h3>{project.title}</h3>
                                    <div className="portfolio__links">
                                        {project.gitSource !== "" ? <a href={project.gitSource} className='btn' >Code source</a> : ""}
                                        {project.gitLive !== "" ? <a href={project.gitLive} className='btn btn-primary' >Live Demo</a> : ""}
                                    </div>

                                </article>
                            )
                        }
                        else if (project.category.find((cat) => cat === category)) {
                            return (
                                <article key={index} className="portfolio__item">
                                    <div className="portfolio__item-image">
                                        <img src={project.img.src} alt="project visual" />
                                    </div>
                                    <h3>{project.title}</h3>
                                    <div className="portfolio__links">
                                        {project.gitSource !== "" ? <a href={project.gitSource} className='btn' >Code source</a> : ""}
                                        {project.gitLive !== "" ? <a href={project.gitLive} className='btn btn-primary' >Live Demo</a> : ""}
                                    </div>

                                </article>
                            )

                        }
                    })
                }
            </div>
        </section>
    );
};

export default Portfolio;
