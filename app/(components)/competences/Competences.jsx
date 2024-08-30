import React from 'react';
import './competences.css'
import { BsPatchCheckFill } from 'react-icons/bs';

const Competences = () => {
    const competences = ["PHP", "Symfony", "JavaScript", "Next.js", "React.js", "Node.js", "SQL", "My SQL", "WordPress", "HTML", "CSS", "Tailwinds"];
    return (
        <section id='competences'>
            <h5>Mes Competences</h5>
            <h2>Technique</h2>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 items-center lg:w-[70%] w-[95%] m-auto ">
                {
                    competences.map((items, index) => (
                        <div className="w-full py-[3rem] flex items-center justify-center text-center bg-bg-variant border-primary border-solid hover:bg-transparent transition-all duration-400 ease font-black rounded-[1rem] border-[1px] ">
                            {items}
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Competences;
