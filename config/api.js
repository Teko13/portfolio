// Configuration des APIs
export const API_CONFIG = {
  // URLs des APIs externes
  EXTERNAL: {
    BASE_URL: 'https://teko-portfolio-cms.vercel.app/api/portfolio',
    ENDPOINTS: {
      PERSONAL_INFO: '/moi',
      GALLERY: '/galerie',
      SKILLS: '/competences',
      PROJECTS: '/projets',
      EDUCATION: '/parcours',
      HOBBIES: '/loisirs',
      SOCIAL: '/reseau'
    }
  },
  
  // URLs des APIs locales (proxy)
  LOCAL: {
    BASE_URL: '/api/portfolio',
    ENDPOINTS: {
      PERSONAL_INFO: '/moi',
      GALLERY: '/galerie',
      SKILLS: '/competences',
      PROJECTS: '/projets',
      EDUCATION: '/parcours',
      HOBBIES: '/loisirs',
      SOCIAL: '/reseau'
    }
  }
};

// Fonction pour construire une URL complète
export const buildApiUrl = (base, endpoint) => `${base}${endpoint}`;

// Fonction pour obtenir l'URL d'une API locale
export const getLocalApiUrl = (endpoint) => buildApiUrl(API_CONFIG.LOCAL.BASE_URL, endpoint);

// Fonction pour obtenir l'URL d'une API externe
export const getExternalApiUrl = (endpoint) => buildApiUrl(API_CONFIG.EXTERNAL.BASE_URL, endpoint);
