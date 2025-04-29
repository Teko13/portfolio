"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './portfolio.css'
import ProjectCard from './ProjectCard';
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
import IMG15 from "../../(assets)/le_jardin_enchante.png";
import IMG16 from "../../(assets)/mawuena.png";

const categories = [
    { id: "main", label: "Aperçu" },
    { id: "all", label: "Tout" }
];

const projectsMap = [
    {
        img: IMG16,
        title: "Mawuena Manucure Russe",
        description: "Site vitrine professionnel pour services de manucure",
        gitSource: "",
        gitLive: "https://mawuena-manucure-russe.com/",
        category: ["main"]
    },
    {
        img: IMG1,
        title: "Booki",
        description: "Plateforme de réservation de logements",
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
        img: IMG14,
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

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Portfolio = () => {
    const [category, setCategory] = useState("main");
    const [hoveredProject, setHoveredProject] = useState(null);

    const filteredProjects = projectsMap.filter(project => 
        category === "all" || project.category.includes(category)
    );

    return (
        <section id="portfolio" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h5 className="text-text-secondary text-xl mb-2">Mes</h5>
                    <h2 className="heading-lg text-gradient">Projets</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center gap-4 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                category === cat.id
                                ? "bg-primary text-white shadow-glow"
                                : "bg-bg-variant/30 text-text-secondary hover:bg-primary/10"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
