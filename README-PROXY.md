# Instructions pour le serveur proxy CORS

## Problème

L'API `https://teko-portfolio-cms.vercel.app` bloque les requêtes CORS depuis `localhost`, ce qui empêche le chargement des données dans le navigateur.

## Solution

Un serveur proxy local a été créé pour contourner cette restriction.

## Démarrage du serveur proxy

1. Ouvrez un terminal dans le dossier du projet
2. Exécutez la commande :

```bash
node proxy-server.js
```

Le serveur démarre sur `http://localhost:3001`

3. Gardez ce terminal ouvert pendant que vous travaillez sur votre portfolio

4. Rechargez votre page dans le navigateur - les données devraient maintenant s'afficher !

## Note

- Le serveur proxy est uniquement nécessaire pour le développement local
- En production (déployé sur un serveur), le code utilisera directement l'API sans proxy
- Le serveur proxy doit être démarré avant d'ouvrir le portfolio dans le navigateur
