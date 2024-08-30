"use client";
import React, { useState, useEffect } from 'react';
import './footer.css';
import ME_IMG from "../../(assets)/me.jpg";
import { FaWhatsapp } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import ISO_1 from "../../(assets)/iso.jpeg";
import ISO_2 from "../../(assets)/iso1.jpeg";
import { SiGmail } from "react-icons/si";
import ISO_3 from "../../(assets)/iso2.jpeg";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
    <>
      <footer id='footer' className='container'>
      <div className="profil-container">
        <div id="one" className="bg-container">
          <img src={ISO_1.src} alt="" />
        </div>
        <div id="two" className="bg-container">
          <img src={ISO_2.src} alt="" />
        </div>
        <div id="three" className="bg-container">
          <img src={ISO_3.src} alt="" />
        </div>
        <div className="photo-container">
          <div className="image-content">
            <img src={ME_IMG.src} alt="" />
          </div>
        </div>
        <div className="infos">
          <h2>Teko Fabrice FOLLY</h2>
        </div>
        <div className="contact">
          <div className="contact-infos">
            <div className="infos-content">
              <a href="mailto:ffabrice999@gmail.com" className="contact-link"><SiGmail className="link-logo" /></a>
              <a href="https://wa.me/33745178805" className="contact-link"><FaWhatsapp className="link-logo" /></a>
              <a href="tel:+33745178805" className="contact-link"><CiMobile1 className="link-logo" /></a>
            </div>
            <div className="personnal-contact">
              <ul>
                <li>Téléphone: +33 7 45 17 88 05</li>
                <li>E-mail: tekofabricefolly@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div className="visme_d" data-title="Responsive Contact Form" data-url="8r17qvrk-responsive-contact-form" data-domain="forms" data-full-page="false" data-min-height="300px" data-form-id="78378"></div>
    </>
  );
};

export default Footer;
