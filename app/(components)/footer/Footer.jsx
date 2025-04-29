"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import ME_IMG from "../../(assets)/me.jpg";
import ISO_1 from "../../(assets)/iso.jpeg";
import ISO_2 from "../../(assets)/iso1.jpeg";
import ISO_3 from "../../(assets)/iso2.jpeg";

const socialLinks = [
  {
    icon: <SiGmail className="text-2xl" />,
    href: "mailto:ffabrice999@gmail.com",
    label: "Email",
    color: "hover:text-primary"
  },
  {
    icon: <FaWhatsapp className="text-2xl" />,
    href: "https://wa.me/33745178805",
    label: "WhatsApp",
    color: "hover:text-primary"
  },
  {
    icon: <FaLinkedin className="text-2xl" />,
    href: "https://www.linkedin.com/in/teko-fabrice-folly-708a28233",
    label: "LinkedIn",
    color: "hover:text-primary"
  },
  {
    icon: <FaGithub className="text-2xl" />,
    href: "https://github.com/Teko13",
    label: "GitHub",
    color: "hover:text-primary"
  }
];

const contactInfo = [
  {
    icon: <FiPhone className="text-xl" />,
    label: "Téléphone",
    value: "+33 7 45 17 88 05",
    href: "tel:+33745178805"
  },
  {
    icon: <FiMail className="text-xl" />,
    label: "Email",
    value: "tekofabricefolly@gmail.com",
    href: "mailto:tekofabricefolly@gmail.com"
  }
];

const BentoCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-bg-variant/30 backdrop-blur-sm border border-primary/10 p-6 rounded-xl ${className}`}
  >
    {children}
  </motion.div>
);

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer id="footer" className="relative py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne de gauche */}
          <div className="space-y-6">
            {/* Carte de profil */}
            <BentoCard>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-gradient">Teko Fabrice FOLLY</h2>
                <p className="text-text-secondary mb-6">Développeur Web Full Stack</p>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-bg-variant/30 backdrop-blur-sm border border-primary/10 transition-all duration-300 ${link.color}`}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Carte de contact */}
            <BentoCard delay={0.2}>
              <h3 className="text-xl font-semibold mb-4 text-gradient">Contact</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-3 p-3 rounded-lg bg-bg-variant/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {info.icon}
                    <div>
                      <div className="text-sm text-text-secondary">{info.label}</div>
                      <div className="text-text-primary">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Colonne de droite - Formulaire de contact */}
          <BentoCard delay={0.4} className="lg:h-full">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Envoyez-moi un message</h3>
            <div 
              className="visme_d bg-bg-variant/30 backdrop-blur-sm border border-primary/10 rounded-lg overflow-hidden h-full" 
              data-title="Responsive Contact Form" 
              data-url="8r17qvrk-responsive-contact-form" 
              data-domain="forms" 
              data-full-page="false" 
              data-min-height="400px" 
              data-form-id="78378"
            />
          </BentoCard>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
