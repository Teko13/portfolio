# Résolution du Problème CORS

## Problème Identifié

L'erreur `Failed to fetch` avec le message CORS indique que l'API externe `https://teko-portfolio-cms.vercel.app` n'autorise pas les requêtes depuis `localhost:3000`.

## Solutions Implémentées

### 1. API Routes Next.js (Solution Principale)

Création de routes API locales qui font le proxy vers l'API externe :

#### `/api/portfolio/moi.js`

```javascript
export default async function handler(req, res) {
  // Récupère les données depuis l'API externe
  const response = await fetch(
    "https://teko-portfolio-cms.vercel.app/api/portfolio/moi"
  );
  const data = await response.json();
  res.status(200).json(data);
}
```

#### `/api/portfolio/galerie.js`

```javascript
export default async function handler(req, res) {
  // Récupère les données depuis l'API externe
  const response = await fetch(
    "https://teko-portfolio-cms.vercel.app/api/portfolio/galerie"
  );
  const data = await response.json();
  res.status(200).json(data);
}
```

### 2. Configuration CORS dans next.config.js

Ajout de headers CORS pour permettre les requêtes cross-origin :

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: '*',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization',
        },
      ],
    },
  ];
}
```

### 3. Configuration Centralisée des APIs

Fichier `config/api.js` pour gérer les URLs des APIs de manière centralisée :

```javascript
export const API_CONFIG = {
  EXTERNAL: {
    BASE_URL: "https://teko-portfolio-cms.vercel.app/api/portfolio",
    // ... endpoints
  },
  LOCAL: {
    BASE_URL: "/api/portfolio",
    // ... endpoints
  },
};
```

### 4. Composant de Diagnostic

Composant `ApiStatus` pour tester et diagnostiquer les problèmes d'API en temps réel.

## Avantages de cette Approche

1. **Résout le problème CORS** : Les requêtes passent par le serveur Next.js
2. **Meilleure sécurité** : Possibilité d'ajouter de l'authentification côté serveur
3. **Cache possible** : Mise en cache des réponses API
4. **Gestion d'erreur centralisée** : Logs et monitoring côté serveur
5. **Flexibilité** : Possibilité de transformer les données avant de les envoyer au client

## Structure des Fichiers

```
pages/
  api/
    portfolio/
      moi.js          # Proxy API infos personnelles
      galerie.js      # Proxy API galerie
  index.js            # Page d'accueil avec intégration des APIs

hooks/
  usePortfolioData.js # Hook pour récupérer les données

components/
  ApiStatus.js        # Composant de diagnostic
  LoadingSpinner.js   # Spinner de chargement
  ErrorMessage.js     # Gestion des erreurs

config/
  api.js              # Configuration centralisée des APIs
```

## Test et Vérification

1. **Redémarrez le serveur** Next.js après les modifications
2. **Vérifiez la console** pour les erreurs
3. **Utilisez le composant ApiStatus** pour diagnostiquer
4. **Testez les routes API** directement : `/api/portfolio/moi`

## Prochaines Étapes

- Créer les autres routes API (compétences, projets, etc.)
- Implémenter un système de cache
- Ajouter de la validation des données
- Mettre en place un monitoring des APIs
