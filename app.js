// Fonction utilitaire pour obtenir l'URL de l'API
// Utilise le proxy local uniquement en développement (localhost)
function getApiUrl(endpoint) {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocalhost 
        ? 'http://localhost:3001/api/portfolio'  // Proxy local pour développement
        : 'https://teko-portfolio-cms.vercel.app/api/portfolio';  // API directe en production
    return `${baseUrl}/${endpoint}`;
}

// Fonction pour récupérer les parcours de formation
async function fetchParcours() {
    try {
        const parcoursUrl = getApiUrl('parcours');
        
        const response = await fetch(parcoursUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.success && result.data) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('Erreur lors de la récupération des parcours:', error);
        return [];
    }
}

// Fonction pour récupérer les compétences
async function fetchCompetences() {
    try {
        const competencesUrl = getApiUrl('competences');
        
        const response = await fetch(competencesUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.success && result.data) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('Erreur lors de la récupération des compétences:', error);
        return [];
    }
}

// Fonction pour récupérer la photo depuis la galerie
async function fetchPhotoFromGalerie() {
    try {
        const galerieUrl = getApiUrl('galerie');
        
        const response = await fetch(galerieUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.success && result.data) {
            // Chercher l'image avec le titre "moi_de_face"
            const photo = result.data.find(item => item.titre === 'moi_de_face');
            if (photo && photo.photo_url) {
                return photo.photo_url;
            }
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération de la galerie:', error);
        return null;
    }
}

// Fonction pour récupérer les projets
async function fetchProjets() {
    try {
        const projetsUrl = getApiUrl('projets');
        
        const response = await fetch(projetsUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.success && result.data) {
            // Trier les projets par index
            return result.data.sort((a, b) => a.index - b.index);
        }
        return [];
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        return [];
    }
}

// Fonction pour récupérer les réseaux sociaux
async function fetchReseaux() {
    try {
        const reseauxUrl = getApiUrl('reseau');
        
        const response = await fetch(reseauxUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.success && result.data) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('Erreur lors de la récupération des réseaux:', error);
        return [];
    }
}

// Fonction pour récupérer les données de l'API
async function fetchPortfolioData() {
    try {
        console.log('Début de la récupération des données...');
        
        // Utiliser getApiUrl pour obtenir l'URL correcte (proxy en localhost, direct en production)
        const apiUrl = getApiUrl('moi');
        
        console.log('URL utilisée:', apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Données reçues:', result);
        
        if (result.success && result.data) {
            const data = result.data;
            console.log('Données extraites:', data);
            console.log('Nom:', data.nom, 'Prénom:', data.prenom, 'Titre:', data.titre);
            
            // Mettre à jour le logo avec nom et prénom (supprimer les espaces)
            const logoElement = document.getElementById('logo-name');
            if (logoElement) {
                if (data.nom && data.prenom) {
                    // Supprimer les espaces et mettre en majuscules
                    const fullName = (data.prenom + data.nom).replace(/\s+/g, '').toUpperCase();
                    logoElement.textContent = fullName;
                    console.log('Logo mis à jour:', fullName);
                } else {
                    console.warn('Données nom/prénom manquantes:', { nom: data.nom, prenom: data.prenom });
                }
            } else {
                console.error('Élément logo-name non trouvé dans le DOM');
            }
            
            // Mettre à jour le titre dans la section hero (desktop)
            const heroTitleElement = document.getElementById('hero-title');
            if (heroTitleElement) {
                if (data.titre) {
                    const title = data.titre.toUpperCase();
                    heroTitleElement.textContent = title;
                    console.log('Titre hero mis à jour:', title);
                } else {
                    console.warn('Titre manquant dans les données');
                }
            } else {
                console.error('Élément hero-title non trouvé dans le DOM');
            }
            
            // Mettre à jour le titre dans la section hero (mobile)
            const heroTitleMobileElement = document.getElementById('hero-title-mobile');
            if (heroTitleMobileElement) {
                if (data.titre) {
                    const title = data.titre.toUpperCase();
                    heroTitleMobileElement.textContent = title;
                    console.log('Titre hero mobile mis à jour:', title);
                } else {
                    console.warn('Titre manquant dans les données pour mobile');
                }
            } else {
                console.error('Élément hero-title-mobile non trouvé dans le DOM');
            }
            
            // Mettre à jour le titre de la page
            const pageTitleElement = document.getElementById('page-title');
            if (pageTitleElement && data.nom && data.prenom) {
                pageTitleElement.textContent = `${data.prenom} ${data.nom} - Portfolio`;
                console.log('Titre de page mis à jour');
            }
            
            // Mettre à jour le résumé dans la section "À propos de moi"
            const aboutResumeElement = document.getElementById('about-resume');
            if (aboutResumeElement) {
                if (data.resume) {
                    aboutResumeElement.textContent = data.resume;
                    console.log('Résumé mis à jour');
                } else {
                    console.warn('Résumé manquant dans les données');
                    aboutResumeElement.textContent = 'Aucun résumé disponible.';
                }
            } else {
                console.error('Élément about-resume non trouvé dans le DOM');
            }
            
            // Mettre à jour la photo dans la section "À propos de moi" depuis la galerie
            const aboutPhotoElement = document.getElementById('about-photo');
            const splineViewerElement = document.getElementById('spline-viewer-about');
            if (aboutPhotoElement) {
                // Récupérer la photo depuis la galerie
                const photoUrl = await fetchPhotoFromGalerie();
                
                if (photoUrl) {
                    aboutPhotoElement.src = photoUrl;
                    aboutPhotoElement.alt = `Photo de ${data.prenom} ${data.nom}`;
                    
                    // Gérer le chargement de l'image
                    aboutPhotoElement.onload = function() {
                        aboutPhotoElement.style.display = 'block';
                        if (splineViewerElement) {
                            splineViewerElement.style.display = 'none';
                        }
                        console.log('Photo chargée avec succès depuis la galerie:', photoUrl);
                    };
                    
                    aboutPhotoElement.onerror = function() {
                        console.warn('Erreur lors du chargement de la photo:', photoUrl);
                        aboutPhotoElement.style.display = 'none';
                        if (splineViewerElement) {
                            splineViewerElement.style.display = 'block';
                        }
                    };
                    
                    console.log('Tentative de chargement de la photo depuis la galerie:', photoUrl);
                } else {
                    console.warn('Photo "moi_de_face" non trouvée dans la galerie');
                    // Garder le spline-viewer visible si pas de photo
                    aboutPhotoElement.style.display = 'none';
                    if (splineViewerElement) {
                        splineViewerElement.style.display = 'block';
                    }
                }
            } else {
                console.error('Élément about-photo non trouvé dans le DOM');
            }
            
            // Mettre à jour la liste des parcours de formation
            const parcoursListElement = document.getElementById('parcours-list');
            if (parcoursListElement) {
                const parcours = await fetchParcours();
                if (parcours && parcours.length > 0) {
                    parcoursListElement.innerHTML = '';
                    parcours.forEach(formation => {
                        // Extraire l'année de la date
                        const date = new Date(formation.obtenu_en);
                        const annee = date.getFullYear();
                        
                        const parcoursItem = document.createElement('div');
                        parcoursItem.className = 'parcours-item';
                        
                        const diplomeLink = formation.diplome_pdf_url 
                            ? `<a href="${formation.diplome_pdf_url}" target="_blank" class="diplome-link"><i class='bx bx-download'></i><span>Diplôme</span></a>`
                            : '';
                        
                        parcoursItem.innerHTML = `
                            <span class="parcours-annee">${annee}</span>
                            <span class="parcours-title">${formation.titre}</span>
                            ${diplomeLink}
                        `;
                        parcoursListElement.appendChild(parcoursItem);
                    });
                    console.log('Parcours mis à jour:', parcours.length);
                    
                    // Démarrer le scroll automatique si le contenu dépasse
                    startAutoScroll(parcoursListElement);
                } else {
                    parcoursListElement.textContent = 'Aucun parcours disponible.';
                    console.warn('Aucun parcours trouvé');
                }
            } else {
                console.error('Élément parcours-list non trouvé dans le DOM');
            }
            
            // Mettre à jour le bouton de téléchargement du CV
            const cvDownloadBtn = document.getElementById('cv-download-btn');
            if (cvDownloadBtn) {
                if (data.cv_url && data.cv_url.trim() !== '') {
                    cvDownloadBtn.href = data.cv_url;
                    cvDownloadBtn.style.display = 'inline-block';
                    console.log('Bouton CV mis à jour:', data.cv_url);
                } else {
                    console.warn('URL du CV manquante dans les données');
                    cvDownloadBtn.style.display = 'none';
                }
            } else {
                console.error('Élément cv-download-btn non trouvé dans le DOM');
            }
            
            // Créer les cards de compétences
            const competencesContainer = document.getElementById('competences-cards-container');
            const technosTitle = document.getElementById('technos-title');
            if (competencesContainer) {
                const competences = await fetchCompetences();
                if (competences && competences.length > 0) {
                    // Afficher le titre
                    if (technosTitle) {
                        technosTitle.style.display = 'block';
                    }
                    
                    competencesContainer.innerHTML = '';
                    competences.forEach((competence, index) => {
                        const competenceCard = document.createElement('div');
                        competenceCard.className = 'card competence-card';
                        competenceCard.setAttribute('data-aos', 'fade-up');
                        competenceCard.setAttribute('data-aos-duration', '1500');
                        
                        // Formater la description pour gérer les retours à la ligne
                        const description = competence.description.replace(/\n/g, '<br>');
                        
                        competenceCard.innerHTML = `
                            <h2 class="card-title">${competence.titre}</h2>
                            <p class="card-text">${description}</p>
                            <img src="images/gradient3&4.png" alt="" class="background-img">
                        `;
                        
                        competencesContainer.appendChild(competenceCard);
                    });
                    console.log('Cards de compétences créées:', competences.length);
                } else {
                    console.warn('Aucune compétence trouvée pour créer les cards');
                }
            } else {
                console.error('Élément competences-cards-container non trouvé dans le DOM');
            }
            
            // Charger les infos de contact
            await loadContactInfo(data);
        } else {
            console.warn('Réponse API invalide:', result);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        // Valeurs par défaut en cas d'erreur
        const logoElement = document.getElementById('logo-name');
        if (logoElement) logoElement.textContent = 'PORTFOLIO';
        
        const heroTitleElement = document.getElementById('hero-title');
        if (heroTitleElement) heroTitleElement.textContent = 'WEB DEVELOPER';
        
        const heroTitleMobileElement = document.getElementById('hero-title-mobile');
        if (heroTitleMobileElement) heroTitleMobileElement.textContent = 'WEB DEVELOPER';
    }
}

// Fonction pour le scroll automatique
function startAutoScroll(element) {
    if (!element) return;
    
    // Vérifier si le contenu dépasse la hauteur visible
    if (element.scrollHeight <= element.clientHeight) {
        return; // Pas besoin de scroller si tout est visible
    }
    
    let scrollDirection = 1; // 1 pour descendre, -1 pour monter
    let animationId = null;
    let isPaused = false;
    
    const scroll = () => {
        if (isPaused) {
            animationId = null;
            return;
        }
        
        const maxScroll = element.scrollHeight - element.clientHeight;
        const currentScroll = element.scrollTop;
        
        // Changer de direction si on atteint les limites
        if (currentScroll >= maxScroll - 1) {
            scrollDirection = -1; // Remonter
        } else if (currentScroll <= 1) {
            scrollDirection = 1; // Redescendre
        }
        
        // Scroller progressivement (vitesse lente)
        element.scrollTop += scrollDirection * 0.3;
        
        animationId = requestAnimationFrame(scroll);
    };
    
    // Pause au survol
    element.addEventListener('mouseenter', () => {
        isPaused = true;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });
    
    element.addEventListener('mouseleave', () => {
        isPaused = false;
        if (!animationId && element.scrollHeight > element.clientHeight) {
            scroll();
        }
    });
    
    // Démarrer le scroll après un court délai
    setTimeout(() => {
        if (element.scrollHeight > element.clientHeight && !isPaused) {
            scroll();
        }
    }, 1000);
}

// Fonction pour charger et afficher les projets
async function loadProjets() {
    try {
        const projets = await fetchProjets();
        const projectsList = document.getElementById('projects-list');
        const projectsSlider = document.getElementById('projects-slider');
        
        if (!projectsList || !projectsSlider) {
            console.error('Éléments projets non trouvés dans le DOM');
            return;
        }
        
        if (projets && projets.length > 0) {
            // Mettre à jour la quantité dans le slider
            projectsSlider.style.setProperty('--quantity', projets.length);
            
            // Vider la liste existante
            projectsList.innerHTML = '';
            
            // Créer les éléments de projet
            projets.forEach((projet, index) => {
                const item = document.createElement('div');
                item.className = 'item';
                item.style.setProperty('--position', index + 1);
                
                // Conteneur pour la vidéo
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                
                const video = document.createElement('video');
                video.id = `projectVideo${index + 1}`;
                video.loop = true;
                video.playsInline = true;
                video.src = projet.video_url || '';
                
                // Gérer le chargement de la vidéo
                video.addEventListener('loadeddata', () => {
                    console.log(`Vidéo du projet ${projet.titre} chargée`);
                });
                
                video.addEventListener('error', () => {
                    console.warn(`Erreur lors du chargement de la vidéo pour ${projet.titre}`);
                });
                
                videoContainer.appendChild(video);
                
                // Conteneur pour les infos du projet
                const projectInfo = document.createElement('div');
                projectInfo.className = 'project-info';
                
                // Catégorie
                const category = document.createElement('div');
                category.className = 'project-category';
                category.textContent = projet.category || '';
                
                // Titre
                const title = document.createElement('h4');
                title.className = 'project-title';
                title.textContent = projet.titre || '';
                
                // Description
                const description = document.createElement('p');
                description.className = 'project-description';
                description.textContent = projet.description || '';
                
                // Conteneur pour les liens
                const linksContainer = document.createElement('div');
                linksContainer.className = 'project-links';
                
                // Lien d'accès
                if (projet.acces_url) {
                    const accessLink = document.createElement('a');
                    accessLink.href = projet.acces_url;
                    accessLink.target = '_blank';
                    accessLink.rel = 'noopener noreferrer';
                    accessLink.className = 'project-link access-link';
                    accessLink.innerHTML = '<i class="bx bx-link-external"></i> Voir le projet';
                    linksContainer.appendChild(accessLink);
                }
                
                // Lien source
                if (projet.source_url) {
                    const sourceLink = document.createElement('a');
                    sourceLink.href = projet.source_url;
                    sourceLink.target = '_blank';
                    sourceLink.rel = 'noopener noreferrer';
                    sourceLink.className = 'project-link source-link';
                    sourceLink.innerHTML = '<i class="bx bxl-github"></i> Code source';
                    linksContainer.appendChild(sourceLink);
                }
                
                projectInfo.appendChild(category);
                projectInfo.appendChild(title);
                projectInfo.appendChild(description);
                projectInfo.appendChild(linksContainer);
                
                // Gérer les événements hover sur l'item entier
                item.addEventListener('mouseenter', function() {
                    video.play();
                    projectInfo.classList.add('show');
                });
                
                item.addEventListener('mouseleave', function() {
                    video.pause();
                    projectInfo.classList.remove('show');
                });
                
                item.appendChild(videoContainer);
                item.appendChild(projectInfo);
                projectsList.appendChild(item);
            });
            
            console.log('Projets chargés:', projets.length);
        } else {
            console.warn('Aucun projet trouvé');
            projectsList.innerHTML = '<div class="item"><p>Aucun projet disponible</p></div>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
}

// Fonction pour obtenir la classe d'icône selon le nom du réseau
function getIconClass(nom) {
    const nomLower = nom.toLowerCase();
    if (nomLower.includes('github')) {
        return 'bx bxl-github';
    } else if (nomLower.includes('linkedin')) {
        return 'bx bxl-linkedin-square';
    } else if (nomLower.includes('twitter')) {
        return 'bx bxl-twitter';
    } else if (nomLower.includes('youtube')) {
        return 'bx bxl-youtube';
    } else if (nomLower.includes('instagram')) {
        return 'bx bxl-instagram';
    } else if (nomLower.includes('facebook')) {
        return 'bx bxl-facebook';
    }
    return 'bx bx-link-external';
}

// Fonction pour charger les infos de contact
async function loadContactInfo(data) {
    try {
        // Mettre à jour l'email
        const contactEmail = document.getElementById('contact-email');
        if (contactEmail && data.email) {
            contactEmail.href = `mailto:${data.email}`;
            contactEmail.textContent = data.email;
        }
        
        // Mettre à jour le téléphone
        const contactPhone = document.getElementById('contact-phone');
        if (contactPhone && data.telephone) {
            contactPhone.href = `tel:${data.telephone.replace(/\s+/g, '')}`;
            contactPhone.textContent = data.telephone;
        }
        
        // Charger les réseaux sociaux dans la section contact
        const socialLinksContainer = document.getElementById('social-links-container');
        if (socialLinksContainer) {
            const reseaux = await fetchReseaux();
            if (reseaux && reseaux.length > 0) {
                socialLinksContainer.innerHTML = '';
                reseaux.forEach(reseau => {
                    const link = document.createElement('a');
                    link.href = reseau.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.textContent = reseau.nom;
                    socialLinksContainer.appendChild(link);
                });
                console.log('Réseaux sociaux chargés:', reseaux.length);
            } else {
                console.warn('Aucun réseau social trouvé');
                socialLinksContainer.innerHTML = '<p>Aucun réseau disponible</p>';
            }
            
            // Charger les réseaux sociaux dans le footer
            const footerSocialLinks = document.getElementById('footer-social-links');
            if (footerSocialLinks && reseaux && reseaux.length > 0) {
                footerSocialLinks.innerHTML = '';
                reseaux.forEach(reseau => {
                    const link = document.createElement('a');
                    link.href = reseau.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    
                    // Utiliser l'icône depuis l'API si disponible, sinon utiliser une icône par défaut
                    if (reseau.icon_url) {
                        const img = document.createElement('img');
                        img.src = reseau.icon_url;
                        img.alt = reseau.nom;
                        link.appendChild(img);
                    } else {
                        // Icônes par défaut selon le nom
                        const iconClass = getIconClass(reseau.nom);
                        const icon = document.createElement('i');
                        icon.className = iconClass;
                        link.appendChild(icon);
                    }
                    
                    footerSocialLinks.appendChild(link);
                });
                console.log('Réseaux sociaux du footer chargés:', reseaux.length);
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement des infos de contact:', error);
    }
}

// Fonction d'initialisation complète
function init() {
    console.log('Initialisation...');
    console.log('État du document:', document.readyState);
    
    // Vérifier si les éléments existent
    const logoElement = document.getElementById('logo-name');
    const heroTitleElement = document.getElementById('hero-title');
    const heroTitleMobileElement = document.getElementById('hero-title-mobile');
    console.log('Éléments trouvés:', { 
        logo: !!logoElement, 
        heroTitle: !!heroTitleElement,
        heroTitleMobile: !!heroTitleMobileElement
    });
    
    // Charger les données de l'API
    fetchPortfolioData();
    
    // Charger les projets
    loadProjets();

    // Minimal JS just for the spotlight effect
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Update CSS variables for the spotlight effect
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });
    
    // Fonction pour faire défiler vers une section
    function scrollToSection(selector, offset = 0) {
        const section = document.querySelector(selector);
        if (section) {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: sectionTop - offset,
                behavior: 'smooth'
            });
        }
    }
    
    // Bouton Contact - faire défiler vers la section contact
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            scrollToSection('.contact-section', 50);
        });
    }
    
    // Bouton scroll-down - faire défiler vers la section about
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            scrollToSection('.about-section', 50);
        });
        // Ajouter le style cursor pointer pour indiquer que c'est cliquable
        scrollDownBtn.style.cursor = 'pointer';
    }
}

// Charger les données au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM chargé via DOMContentLoaded');
        init();
    });
} else {
    // Le DOM est déjà chargé, exécuter immédiatement
    console.log('DOM déjà chargé, exécution immédiate');
    init();
}
