import React from 'react';
import { motion } from 'framer-motion';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const socialLinks = [
  {
    id: 1,
    icon: <BsLinkedin className="text-2xl" />,
    url: "https://www.linkedin.com/in/teko-fabrice-folly-708a28233",
    label: "LinkedIn"
  },
  {
    id: 2,
    icon: <FaGithub className="text-2xl" />,
    url: "https://github.com/Teko13",
    label: "GitHub"
  }
];

const HeaderSocial = () => {
  return (
    <motion.div 
      className="flex justify-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1
          }}
        >
          <div className="relative p-3 rounded-full glass-effect group-hover:shadow-glow transition-all duration-300">
            {link.icon}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-text-secondary whitespace-nowrap">
              {link.label}
            </span>
          </div>
          <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default HeaderSocial;