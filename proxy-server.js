// Serveur proxy simple pour contourner CORS
const http = require('http');
const https = require('https');

const PORT = 3001;
const API_BASE = 'https://teko-portfolio-cms.vercel.app';

const server = http.createServer((req, res) => {
    // Gérer CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Proxy les requêtes vers l'API
    const apiPath = req.url;
    const apiUrl = `${API_BASE}${apiPath}`;

    console.log(`Proxying: ${apiUrl}`);

    https.get(apiUrl, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.writeHead(apiRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(data);
        });
    }).on('error', (err) => {
        console.error('Erreur proxy:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
    });
});

server.listen(PORT, () => {
    console.log(`Serveur proxy CORS démarré sur http://localhost:${PORT}`);
    console.log(`Utilisez http://localhost:${PORT}/api/portfolio/moi pour accéder à l'API`);
});

