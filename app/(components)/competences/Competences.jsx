import React from 'react';
import './competences.css'
import { BsPatchCheckFill } from 'react-icons/bs';

const Competences = () => {
    const competences = [
    {
        tech: "PHP",
        experiences: [
            "Développement d'application web (sites dynamique, web services/APIs)",
            "Développement d'extension Wordpress",
            "Programmation orienté objet"
        ],
        framework: "Symfony"
    },
    {
        tech: "JavaScript (full-stack)",
        experiences: [
            "Intégration de services backend Développement d'interfaces utilisateurs optimisé",
            "Développement web app (web services/APIs, sites SPA)"
        ],
        framework: "React JS, Next JS, Node JS"
    },
    {
        tech: "WordPress",
        experiences: [
            "Création de site vitrine",
            "e-commerce",
            "blog",
            "Maîtrise d'Elementor",
            "Woocommerce",
            "Optimisation SEO et performance"
        ]
    },
    {
        tech: "HTML/CSS",
        experiences: [
            "Développement de pages web",
            "Responsive design",
            "Intégration de maquettes",
            "Animations CSS3",
            "Intégration JavaScript/CSS"
        ],
        framework: "Tailwind CSS"
    },
    {
        tech: "Sécurité",
        experiences: [
            "Gestion de l'authentification et des autorisation avec implémentation d'authentification sécurisée (OAuth, JWT) pour des applications web"
        ]
    },
    {
        tech: "Base de données",
        experiences: [
            "Ecriture de shema de base de données (SQL)",
            "Requête SQL",
            "Gestion de base de données MYSQL",
            "Gesion de base de données avec prisma"
        ]
    }
]

    return (
        <section id='competences' className='container'>
            <h5>Mes Competences</h5>
            <h2>Technique</h2>
            <div className=" flex flex-col w-full lg:w-[60%] mx-auto gap-5">
                {
                    competences.map((item) => (
                        <div className="flex flex-col items-start gap-2 rounded-lg bg-bg p-5 rounded-xl">
                            <h3 className="font-black text-sm inline bg-primary text-bg p-0 px-3 rounded-xl">
                                {item.tech}
                            </h3>
                            <ul className='pl-5 w-full'>
                                {
                                    item.experiences.map((exp) => (
                                        <li className='w-full grid grid-cols-[5%_93%] my-4 lg:my-1 gap-2 items-center'>
                                            <div className="mr-4 inline-block w-[7px] h-[7px] bg-primary"></div>
                                            <div>
                                                {exp}
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            {
                                item.framework !== undefined && (
                                    <div className="flex items-center gap-3">
                                <span>Framework</span>
                                <span className="font-black border-primary border-solid border-[2px] px-4 rounded-2xl ">
                                    {item.framework}
                                </span>
                            </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Competences;
