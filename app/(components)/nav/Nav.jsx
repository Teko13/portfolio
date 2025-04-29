"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { AiOutlineHome, AiOutlineUser, AiFillCode } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";

const navItems = [
  { href: "#header", icon: <AiOutlineHome className="text-xl" />, label: "Accueil" },
  { href: "#about", icon: <AiOutlineUser className="text-xl" />, label: "À propos" },
  { href: "#portfolio", icon: <AiFillCode className="text-xl" />, label: "Portfolio" },
  { href: "#footer", icon: <FiAtSign className="text-xl" />, label: "Contact" }
];

const Nav = () => {
  const [activeSection, setActiveSection] = useState("header");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.nav
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <m.div
          className="flex items-center gap-2 p-2 rounded-full glass-effect backdrop-blur-sm shadow-glow"
          whileHover={{ scale: 1.05 }}
        >
          {navItems.map((item, index) => (
            <m.a
              key={index}
              href={item.href}
              className={`relative p-3 rounded-full transition-all duration-300 group ${
                activeSection === item.href.substring(1)
                  ? "text-primary bg-primary/10"
                  : "text-text-secondary hover:text-primary"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-bg-variant/80 backdrop-blur-sm rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </m.a>
          ))}
        </m.div>
      </m.nav>
    </LazyMotion>
  );
};

export default Nav;
