import './typing.css';
import React, { useState, useEffect } from 'react';

const TypeString = ({ text, typingdelay = 100, scroll = false, scrollAreaIdentifier = "", refElementIdentifier = "" }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const typeString = () => {
            if (currentIndex < text.length) {
                setCurrentText((prevCurrentText) => prevCurrentText + text[currentIndex]);
                setCurrentIndex((prevCureentIndex) => prevCureentIndex + 1);
                if (scroll) {
                    const area = document.querySelector(scrollAreaIdentifier);
                    const refElement = document.querySelector(refElementIdentifier);
                    area.scrollTo(0, area.scrollHeight);
                }
            }
        };
        const typingTimer = setInterval(typeString, typingdelay);

        return () => {
            clearInterval(typingTimer)
        }
    }, [currentIndex, text, typingdelay])

    return (
        <>
            <span className="text-content">{currentText}</span>
            <span className={currentIndex < text.length ? "cursor" : "cursor disabled"}></span>
        </>
    );
};

export default TypeString;
