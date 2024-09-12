"use client"
import React, { useEffect, useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiMobile4 } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa6";
import { RiCursorLine } from "react-icons/ri";
import { Righteous } from 'next/font/google';
import qrCode from "../(assets)/qr.jpeg";

function CV() {
    const [darkMode, setDarkMode] = useState(false);
    const handleTheme = () => {
        setDarkMode(!darkMode);
    }
    const [frontendIndice, setFrontendIndice] = useState([]);
    const loisirs = ["Technologie & Innovation", "Espace & Aéronautique", "Énigmes & Mystères"]
    const frontendLevel = 85;
    const [backendIndice, setBackendIndice] = useState([]);
    const backendLevel = 87;
    const [cmsIndice, setCmsIndice] = useState([]);
    const cmsLevel = 93;
    const levels = [
        {
            title: "Frontend",
            level: frontendIndice
        },
        {
            title: "Backend",
            level: backendIndice
        },
        {
            title: "CMS",
            level: cmsIndice
        }
    ];
    const projet = [
        {
            title: "Le Jardin Enchanté",
            url: "jardin-enchante.vercel.app"
        },
        {
            title: "Mawuena Manucure Russe",
            url: "mawuena-manucure-russe.com"
        },
        {
            title: "Nyrvanah",
            url: "www.nyrvanah.com"
        },
        {
            title: "BileMo",
            url: "github.com/Teko13/BileMo/"
        },
    ]
    const skills = ["PHP", "JavaScript", "HTML/CSS", "Tailwind", "React JS", "Next JS", "Node JS", "SQL", "MySQL", "Symfony", "WordPress", "Git"];
    const links = [
        {
            icon: <FaGithub />,
            title: "Github",
            content: "https://github.com/teko13"
        },
        {
            icon: <MdOutlineEmail />,
            title: "E-mail",
            content: "tekofabricefolly@gmail.com",
        },
        {
            icon: <CiMobile4 />,
            title: "Téléphone",
            content: "+33 7 45 17 88 05",
        },
    ]
    const education = [
        {
            title: "Titre RNCP niveau 6 (bac +3/4) - Développeur d'Application PHP/Symfony",
            school: "OpenClassRooms",
            date: "05/2024"
        },
        {
            title: "Titre RNCP niveau 5 (bac +2) - Développeur Web",
            school: "OpenClassRooms",
            date: "06/2022"
        }
    ]
    const name = "Teko Fabrice FOLLY";
    const title = "Développeur Web";
    const indice = (degre) => {
        const frameNumber = 10;
        const percentage = (degre * frameNumber)/100;
        const indiceMap = [];
        for(let i = 0; i < frameNumber; i++) {
            const fillIndicator = percentage - i;
            let framPercentage;
            if(fillIndicator >= 1) {
                framPercentage = 1;
            } else if(fillIndicator < 0) {
                framPercentage = 0;
            } else {
                framPercentage = fillIndicator;
            }
            indiceMap.push(<IndiceFrame fill={framPercentage * 100} />)
        }
        return indiceMap;
    }
    useEffect(() => {
       if(frontendIndice.length === 0) {
        setFrontendIndice(indice(frontendLevel)); 
       }
       if(cmsIndice.length === 0) {
        setCmsIndice(indice(cmsLevel));
       }
       if(backendIndice.length === 0) {
        setBackendIndice(indice(backendLevel))
       } 
        }, [])
  return (
        <div class={`w-[21cm] px-[1%] h-[29.7cm] mt-[2rem] m-auto ${darkMode && ("bg-bg text-white") || ("bg-white text-black")}`} >
            <div className={`w-full ${darkMode && ("border-primary") || ('border-black')} grid grid-cols-[60%_30%] mt-[4rem]  justify-between items-center border-solid border-[2px]`}>
                <div className="flex flex-col gap-5">
                    <div className={`flex ${darkMode && ("bg-bg border-primary") || ("bg-white border-black")} relative flex-col p-3 -mt-[3rem]   border-solid border-[2px]`}>
                        <h1 className=' m-0 font-black text-[1.5rem]'>
                            {name}
                        </h1>
                        <span className='font-light text-[1.1rem]'>
                            {title}
                        </span>
                        <RiCursorLine className={`absolute right-0 text-[3rem] ${darkMode && ("text-primary") || ("text-black")} top-0`} />
                    </div>
                    <div className="flex flex-col gap-2 p-3">
                        <div className='font-black'>
                            Toulouse
                        </div>
                        <div className=' inline-flex gap-3'>
                            <div className='font-black'>Age</div>
                            <div>24 ans</div>
                        </div>
                        {
                            links.map((item, key) => (
                                <div className="flex items-center gap-4">
                                    <div className={`text-[1.4rem] ${darkMode && "text-primary" || "text-black"}`} >
                                        {item.icon}
                                    </div>
                                    <div className=' mr-2 font-black'>
                                        {item.title}
                                    </div>
                                    <div>
                                        {item.content}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-[80%] flex flex-col items-center">
                    <img src={qrCode.src} alt="QR code de mon portflio" />
                    <span className=' text-primary text-nowrap flex-nowrap text-[0.8rem] '>
                        https://teko-fabrice.vercel.app/
                    </span>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 my-[3rem] gap-3">
                <div className={`${darkMode && "border-primary" || "border-black"} border-solid border-[2px]  flex flex-col p-2 justify-start`}>
                    <h2 className="text-white font-black text-[1.4rem] my-1">
                        COMPÉTENCES
                    </h2>
                    <div className="w-full grid gap-2 grid-cols-3 grid-rows-auto h-full pb-2">
                        {
                            skills.map((skill, key) => (
                                <div key={key} className={`${darkMode && "bg-primary" || "bg-transparent"} rounded-md flex items-center justify-center text-bg-variant font-black`}>
                                    {skill}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={`w-full ${darkMode && "border-primary" || "border-black"} p-2 border-solid border-[2px]`}>
                    <h2 className="text-white font-black text-[1.4rem] my-1">
                        FORMATIONS
                    </h2>
                    <div className="flex flex-col gap-4">
                        {
                            education.map((item, key) => (
                                <div className="flex items-stretch gap-4 rounded-md overflow-hidden relative">
                                    <div className={`w-[5px] ${darkMode && "bg-primary" || "bg-black"}`}></div>
                                    <div className='flex flex-col gap-1 justify-start items-center'>
                                        <div className="flex items-center gap-3">
                                            <div className="">
                                                <FaGraduationCap className={`${darkMode && "text-primary" || "text-black"}`} />
                                            </div>
                                            <div className='text-[0.9rem] font-black '> {item.title} </div>
                                        </div>
                                        <div className='text-[0.7]'>
                                            {item.school}
                                        </div>
                                        <div className='text-[0.6]'>
                                            {item.date}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 my-[3rem] gap-3">
                <div className={`${darkMode && ("border-primary") || "border-black"} border-solid gap-3 border-[2px]  flex flex-col p-2 justify-start pb-5`}>
                    <h3 className='font-black text-[1.4rem]'>
                        Évaluation de Compétences
                    </h3>
                    {
                        levels.map((item, key) => (
                            <div className="flex flex-col gap-1 items-start">
                                <h3 className="font-black text-md">
                                    {item.title}
                                </h3>
                                <div className="flex gap-3 items-center">
                                    {
                                        item.level.map((fram, key) => (
                                            <div>
                                                {fram}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={`${darkMode && "border-primary" || "border-black"} border-solid gap-1 border-[2px]  flex flex-col p-2`}>
                    <h2 className="font-black text-[1.4rem] ">
                        Quelques Projets
                    </h2>
                    {
                        projet.map((item, key) => (
                            <div key={key} className="flex flex-col gap-0 m-0 p-0">
                                <h5 className="text-sm font-black">
                                    {item.title}
                                </h5>
                                <div className={`${darkMode && "text-primary" || "text-black"} flex-nowrap text-nowrap`}>
                                    {item.url}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`${darkMode && "border-primary" || "border-black"} w-full border-solid border-[2px]  flex p-4 gap-3`}>
                <h3 className="tet-md font-black">
                    Loisirs
                </h3>
                <div className={`flex items-center w-full justify-around`}>
                    {
                        loisirs.map((item, key) => (
                            <div className="">
                                {item}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

const IndiceFrame = ({fill, darkModei}) => {
    const darkMode = false;
    return (
        <div className={`w-[20px] h-[20px] rounded-md ${darkMode && "bg-bg-variant" || ("bg-white border-solid border-black border-[1px]")} overflow-hidden`}>
            <div style={{width: `${fill}%`}} className={`h-full ${darkMode && "bg-primary" || "bg-black"}`}></div>
        </div>
    )
}

export default CV