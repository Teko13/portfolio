import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectImage = ({ project }) => {
    const [isLongImage, setIsLongImage] = useState(false);
    const imageRef = useRef(null);

    const handleImageLoad = (e) => {
        const img = e.target;
        if (img.naturalHeight > img.naturalWidth * 1.2) {
            setIsLongImage(true);
        }
    };

    return (
        <div className="portfolio__item-image h-[160px] rounded-t-xl overflow-hidden">
            <Image
                ref={imageRef}
                src={project.img}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`transition-all duration-300 ${
                    isLongImage ? 'long-image' : 'group-hover:scale-105'
                }`}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'top center'
                }}
                onLoad={handleImageLoad}
            />
        </div>
    );
};

const ActionButton = ({ href, icon: Icon, text, primary }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md ${
            primary 
            ? 'bg-primary/10 text-primary hover:bg-primary/20' 
            : 'bg-white/5 text-white/80 hover:bg-white/10'
        } transition-all duration-300 text-xs font-medium`}
        whileHover={{ y: -2 }}
    >
        <Icon className="text-base" />
        <span>{text}</span>
    </motion.a>
);

const ProjectCard = ({ project, variants, onMouseEnter, onMouseLeave }) => {
    return (
        <motion.article
            variants={variants}
            className="portfolio__item group relative overflow-hidden rounded-xl bg-[#0f172a] transition-all duration-300"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ProjectImage project={project} />

            <div className="p-4 bg-[#0f172a]">
                <h3 className="text-sm font-semibold text-white mb-1.5">
                    {project.title}
                </h3>
                {project.description && (
                    <p className="text-xs text-white/70 mb-3 line-clamp-2">
                        {project.description}
                    </p>
                )}
                <div className="flex items-center gap-2">
                    {project.gitLive && (
                        <ActionButton
                            href={project.gitLive}
                            icon={FiExternalLink}
                            text="Demo"
                            primary
                        />
                    )}
                    {project.gitSource && (
                        <ActionButton
                            href={project.gitSource}
                            icon={FiGithub}
                            text="Code"
                        />
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard; 