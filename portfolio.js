// =====================================================================
//  TEKO.DEV — Portfolio complet (design brutaliste, fond géré en CSS)
// =====================================================================

// --- 1. ANIMATION D'ENTREE (reveal brutaliste) ---
// Page à section unique, entièrement au-dessus de la ligne de flottaison :
// une simple animation au chargement (sans ScrollTrigger) — toujours jouée
// jusqu'au bout, jamais figée. Respecte prefers-reduced-motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    gsap.from('#portfolio > *', {
        y: 28,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "back.out(1.4)"
    });
}

// --- 2. CHARGEMENT DE TOUS LES PROJETS ---
async function loadAllProjects() {
    const projectsContainer = document.getElementById('all-projects-container');
    if (!projectsContainer) return;
    
    // Afficher les skeletons (6 items pour une grille)
    projectsContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        projectsContainer.appendChild(createSkeletonProjectCard());
    }
    
    try {
        const response = await fetch('https://teko-portfolio-cms.vercel.app/api/portfolio/projets');
        const result = await response.json();
        
        if (result.success && result.data && Array.isArray(result.data)) {
            // Trier tous les projets par index (du plus petit au plus grand)
            const projects = result.data
                .filter(projet => projet.index != null) // Filtrer les projets sans index
                .sort((a, b) => a.index - b.index);
            
            // Remplacer les skeletons par les vraies données
            projectsContainer.innerHTML = '';
            
            if (projects.length === 0) {
                projectsContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">Aucun projet disponible</p>';
            } else {
                projects.forEach(projet => {
                    const projectCard = createProjectCard(projet);
                    projectsContainer.appendChild(projectCard);
                });
            }
        } else {
            projectsContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">Erreur lors du chargement des projets</p>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        projectsContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">Erreur lors du chargement des projets</p>';
    }
}

function createSkeletonProjectCard() {
    const card = document.createElement('div');
    card.className = 'skeleton-project-card';
    
    const video = document.createElement('div');
    video.className = 'skeleton skeleton-project-video';
    card.appendChild(video);
    
    const title = document.createElement('div');
    title.className = 'skeleton skeleton-project-title';
    card.appendChild(title);
    
    const desc1 = document.createElement('div');
    desc1.className = 'skeleton skeleton-project-description';
    card.appendChild(desc1);
    
    const desc2 = document.createElement('div');
    desc2.className = 'skeleton skeleton-project-description';
    card.appendChild(desc2);
    
    const category = document.createElement('div');
    category.className = 'skeleton skeleton-project-category';
    card.appendChild(category);
    
    const links = document.createElement('div');
    links.className = 'skeleton-project-links';
    const link1 = document.createElement('div');
    link1.className = 'skeleton skeleton-project-link';
    const link2 = document.createElement('div');
    link2.className = 'skeleton skeleton-project-link';
    links.appendChild(link1);
    links.appendChild(link2);
    card.appendChild(links);
    
    return card;
}

function createProjectCard(projet) {
    const card = document.createElement('div');
    card.className = 'glass-card p-4 md:p-5 group';
    
    // Vidéo
    const videoContainer = document.createElement('div');
    videoContainer.className = 'relative';
    const video = document.createElement('video');
    video.className = 'project-video';
    // Utiliser video_url si disponible, sinon image_url
    const mediaUrl = projet.video_url || projet.image_url || '';
    if (mediaUrl) {
        video.src = mediaUrl;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('preload', 'auto');
        video.setAttribute('controls', false);
        // Gestion d'erreur si la vidéo ne peut pas être chargée
        video.onerror = function() {
            console.warn('Erreur de chargement de la vidéo:', mediaUrl);
        };
    }
    videoContainer.appendChild(video);
    card.appendChild(videoContainer);
    
    // Titre
    const title = document.createElement('h3');
    title.className = 'text-lg md:text-xl font-bold mt-3 md:mt-4 uppercase';
    title.textContent = projet.titre || 'Projet sans titre';
    card.appendChild(title);
    
    // Description
    const description = document.createElement('p');
    description.className = 'project-description text-xs md:text-sm text-gray-400 mt-2';
    description.textContent = projet.description || '';
    description.title = projet.description || ''; // Tooltip au hover
    card.appendChild(description);
    
    // Catégorie
    if (projet.category) {
        const category = document.createElement('span');
        category.className = 'project-category';
        category.textContent = projet.category;
        card.appendChild(category);
    }
    
    // Liens
    const linksContainer = document.createElement('div');
    linksContainer.className = 'project-links';
    
    if (projet.acces_url) {
        const accessLink = document.createElement('a');
        accessLink.href = projet.acces_url;
        accessLink.target = '_blank';
        accessLink.rel = 'noopener noreferrer';
        accessLink.className = 'project-link';
        accessLink.innerHTML = `
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span>Accès</span>
        `;
        linksContainer.appendChild(accessLink);
    }
    
    if (projet.source_url) {
        const sourceLink = document.createElement('a');
        sourceLink.href = projet.source_url;
        sourceLink.target = '_blank';
        sourceLink.rel = 'noopener noreferrer';
        sourceLink.className = 'project-link';
        sourceLink.innerHTML = `
            <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
        `;
        linksContainer.appendChild(sourceLink);
    }
    
    if (linksContainer.children.length > 0) {
        card.appendChild(linksContainer);
    }
    
    return card;
}

// Charger tous les projets au chargement de la page
loadAllProjects();

