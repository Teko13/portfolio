// --- 1. THREE.JS GLOBE (GITHUB STYLE) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Création d'un globe de points (Particules)
const geometry = new THREE.BufferGeometry();
const count = 2000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Spread aléatoire
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Matériau "Point bleu"
const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x2f81f7,
    transparent: true,
    opacity: 0.8
});

// Forme Sphérique plus structurée
const sphereGeo = new THREE.SphereGeometry(4, 64, 64);
const sphereMat = new THREE.PointsMaterial({
    color: 0x58a6ff,
    size: 0.02,
    transparent: true,
    opacity: 0.6
});
const globe = new THREE.Points(sphereGeo, sphereMat);
scene.add(globe);

// Ajout d'étoiles lointaines (Passion Astronomie)
const starGeo = new THREE.BufferGeometry();
const starCount = 1000;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 50;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, opacity: 0.3 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

camera.position.z = 10;
globe.position.x = 3; // Décalé à droite comme GitHub

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002;
    globe.rotation.x += 0.001;
    stars.rotation.y -= 0.0005;
    renderer.render(scene, camera);
};
animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 2. CURSOR GLOW EFFECT ---
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// --- 3. GSAP SCROLL ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Animer les sections à l'apparition
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
});

// Effet Parallaxe sur le globe au scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    globe.rotation.y = scrollY * 0.001;
    globe.position.y = -scrollY * 0.002;
});

// Menu mobile retiré - navigation uniquement sur desktop

// --- 5. CHARGEMENT DE L'URL DU CV ---
async function loadCVUrl() {
    try {
        const response = await fetch('https://teko-portfolio-cms.vercel.app/api/portfolio/moi');
        const result = await response.json();
        
        if (result.success && result.data && result.data.cv_url) {
            const cvDownloadBtn = document.getElementById('cv-download-btn');
            if (cvDownloadBtn) {
                cvDownloadBtn.href = result.data.cv_url;
                cvDownloadBtn.download = 'CV_Teko_Fabrice_Folly.pdf';
                cvDownloadBtn.target = '_blank';
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement de l\'URL du CV:', error);
    }
}

// Charger l'URL du CV au chargement de la page
loadCVUrl();

// --- 6. CHARGEMENT DES PROJETS ---
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

async function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Afficher les skeletons
    projectsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        projectsContainer.appendChild(createSkeletonProjectCard());
    }
    
    try {
        const response = await fetch('https://teko-portfolio-cms.vercel.app/api/portfolio/projets');
        const result = await response.json();
        
        if (result.success && result.data && Array.isArray(result.data)) {
            // Filtrer les projets avec index 1, 2, 3
            const projects = result.data
                .filter(projet => projet.index >= 1 && projet.index <= 3)
                .sort((a, b) => a.index - b.index)
                .slice(0, 3);
            
            // Remplacer les skeletons par les vraies données
            projectsContainer.innerHTML = '';
            
            projects.forEach(projet => {
                const projectCard = createProjectCard(projet);
                projectsContainer.appendChild(projectCard);
            });
        } else {
            // En cas d'erreur, garder les skeletons ou afficher un message
            projectsContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">Erreur lors du chargement des projets</p>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        projectsContainer.innerHTML = '<p class="text-gray-400 text-center col-span-full">Erreur lors du chargement des projets</p>';
    }
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
    title.className = 'text-lg md:text-xl font-bold mt-3 md:mt-4';
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

// Charger les projets au chargement de la page
loadProjects();

// --- 7. CONFIGURATION DU LIEN PORTFOLIO ---
// Définir le lien vers la page portfolio de manière dynamique
function setupPortfolioLink() {
    const portfolioLink = document.getElementById('portfolio-link');
    if (portfolioLink) {
        // Utiliser window.location pour obtenir l'URL de base dynamiquement
        // Si on est sur index.html, on va vers portfolio.html dans le même dossier
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        portfolioLink.href = `${basePath}/portfolio.html`;
    }
}

// Configurer le lien au chargement de la page
setupPortfolioLink();

// --- 8. CHARGEMENT DU PARCOURS ---
function createSkeletonParcoursItem() {
    const item = document.createElement('div');
    item.className = 'skeleton-parcours-item';
    
    const point = document.createElement('div');
    point.className = 'skeleton skeleton-parcours-point';
    item.appendChild(point);
    
    const title = document.createElement('div');
    title.className = 'skeleton skeleton-parcours-title';
    item.appendChild(title);
    
    const school = document.createElement('div');
    school.className = 'skeleton skeleton-parcours-school';
    item.appendChild(school);
    
    const mention = document.createElement('div');
    mention.className = 'skeleton skeleton-parcours-mention';
    item.appendChild(mention);
    
    return item;
}

async function loadParcours() {
    const parcoursContainer = document.getElementById('parcours-container');
    if (!parcoursContainer) return;
    
    // Afficher les skeletons (2 items)
    parcoursContainer.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        parcoursContainer.appendChild(createSkeletonParcoursItem());
    }
    
    try {
        const response = await fetch('https://teko-portfolio-cms.vercel.app/api/portfolio/parcours');
        const result = await response.json();
        
        if (result.success && result.data && Array.isArray(result.data)) {
            // Trier les parcours par date (du plus récent au plus ancien)
            const parcours = result.data.sort((a, b) => {
                const dateA = new Date(a.obtenu_en);
                const dateB = new Date(b.obtenu_en);
                return dateB - dateA; // Plus récent en premier
            });
            
            // Remplacer les skeletons par les vraies données
            parcoursContainer.innerHTML = '';
            
            if (parcours.length === 0) {
                parcoursContainer.innerHTML = '<p class="text-gray-400">Aucun parcours disponible</p>';
                    } else {
                parcours.forEach((item, index) => {
                    const parcoursItem = createParcoursItem(item, index);
                    parcoursContainer.appendChild(parcoursItem);
                });
            }
        } else {
            parcoursContainer.innerHTML = '<p class="text-gray-400">Erreur lors du chargement du parcours</p>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement du parcours:', error);
        parcoursContainer.innerHTML = '<p class="text-gray-400">Erreur lors du chargement du parcours</p>';
    }
}

function createParcoursItem(parcours, index) {
    const item = document.createElement('div');
    item.className = 'relative';
    
    // Point sur la timeline (premier en bleu, autres en gris)
    const point = document.createElement('span');
    point.className = `absolute -left-7 md:-left-11 top-1 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 md:border-4 border-gray-900 ${
        index === 0 ? 'bg-blue-600' : 'bg-gray-700'
    }`;
    item.appendChild(point);
    
    // Titre
    const title = document.createElement('h3');
    title.className = 'text-lg md:text-xl font-bold text-white';
    title.textContent = parcours.titre || 'Titre non disponible';
    item.appendChild(title);
    
    // École et année
    const date = new Date(parcours.obtenu_en);
    const year = date.getFullYear();
    const schoolYear = document.createElement('span');
    schoolYear.className = 'text-xs md:text-sm text-blue-400';
    schoolYear.textContent = `${parcours.ecole || 'École non disponible'} • ${year}`;
    item.appendChild(schoolYear);
    
    // Mention + lien de téléchargement
    const mentionContainer = document.createElement('div');
    mentionContainer.className = 'flex items-center gap-2 mt-1';
    
    const mention = document.createElement('span');
    mention.className = 'text-xs md:text-sm text-gray-500';
    // Utiliser mention si disponible, sinon un texte par défaut
    mention.textContent = parcours.mention || 'Télécharger diplôme';
    mentionContainer.appendChild(mention);
    
    // Lien de téléchargement si disponible
    if (parcours.diplome_pdf_url) {
        const downloadLink = document.createElement('a');
        downloadLink.href = parcours.diplome_pdf_url;
        downloadLink.target = '_blank';
        downloadLink.rel = 'noopener noreferrer';
        downloadLink.className = 'inline-flex items-center gap-1 text-xs md:text-sm text-blue-400 hover:text-blue-300 transition';
        downloadLink.title = 'Télécharger le diplôme';
        downloadLink.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        `;
        mentionContainer.appendChild(downloadLink);
    }
    
    item.appendChild(mentionContainer);
    
    return item;
}

// Charger le parcours au chargement de la page
loadParcours();

