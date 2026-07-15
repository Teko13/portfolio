// =====================================================================
//  Composant header partagé — injecté à l'identique sur toutes les pages.
//  Monté dans <div id="site-header"></div> (fallback : début du <body>).
// =====================================================================
(function () {
    const path = window.location.pathname;
    const onHome = path === '/' || path.endsWith('/') || path.endsWith('/index.html') || path === '/index.html';
    // Depuis l'accueil : ancres internes. Depuis une autre page : on repointe vers index.html.
    const base = onHome ? '' : 'index.html';
    const brandHref = onHome ? '#home' : 'index.html';

    const links = [
        ['À Propos', 'about'],
        ['Compétences', 'stack'],
        ['Projets', 'projects'],
        ['Contact', 'contact'],
    ];

    const nav = document.createElement('nav');
    nav.innerHTML =
        `<a href="${brandHref}" class="site-brand">TEKO</a>` +
        `<div class="hidden md:flex gap-8 text-sm font-medium text-gray-400">` +
        links.map(([label, anchor]) =>
            `<a href="${base}#${anchor}" class="hover:text-white transition">${label}</a>`
        ).join('') +
        `</div>`;

    const mount = document.getElementById('site-header');
    if (mount) {
        mount.replaceWith(nav);
    } else {
        document.body.prepend(nav);
    }
})();
