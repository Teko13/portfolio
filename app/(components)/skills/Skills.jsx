"use client";
import React, { useState } from 'react';
import './skills.css'
import { motion } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { BiCheck } from 'react-icons/bi';
import TypeString from '../auto_typing/TypeString';

const Skills = () => {
    const [displayContent, setDisplayContent] = useState(false);
    const activeSection = useScrollSpy(['skills'], 100);
    const isActive = activeSection === 'skills';

    const handelScrollView = (sectionId) => {
        if (sectionId !== undefined) {
            setDisplayContent(true)
        }
    }
    return (
        <div>
            <section id="skills" className={isActive ? 'isCurrent' : ''}>
                <h5>Mes</h5>
                <h2>Savoir - Faire</h2>
                <div className="container skills__container">
                    <article className="skill">
                        <div className="skill__head">
                            <h3>Frontend</h3>
                        </div>
                        <ul className="skill__list">
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Applications frontend"} typingdelay={100} /> : ""} </p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Intégration APIs"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Responsive Web Design"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Maquette site web"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Migration de technos"} typingdelay={100} /> : ""}</p>
                            </li>
                        </ul>
                    </article>
                    <article className="skill">
                        <div className="skill__head">
                            <h3>Backend</h3>
                        </div>
                        <ul className="skill__list">
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Application Backend"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"APIs REST"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Migration de technos/BDD"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Mailing"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Documentation"} typingdelay={100} /> : ""}</p>
                            </li>
                        </ul>
                    </article>
                    <article className="skill">
                        <div className="skill__head">
                            <h3>Général</h3>
                        </div>
                        <ul className="skill__list">
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Wordpress"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Audit technique"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"SEO"} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Automatisation IA (API OPENAI) "} typingdelay={100} /> : ""}</p>
                            </li>
                            <li>
                                <BiCheck className='skill__list-icon' />
                                <p>{displayContent === true ? <TypeString text={"Test unitaire/fonctionnelle"} typingdelay={100} /> : ""}</p>
                            </li>
                        </ul>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default Skills;
