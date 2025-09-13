# Migration vers Next.js 14

## Vue d'ensemble

Ce document décrit la migration du projet portfolio de Next.js 13 vers Next.js 14, la version stable la plus récente.

## Versions Installées

- **Next.js** : 14.2.5 (stable)
- **React** : 18.3.1 (dernière version 18.x stable)
- **React DOM** : 18.3.1

## Changements Effectués

### 1. Mise à jour des Dépendances

```bash
# Installation des nouvelles versions
npm install next@14.2.5 react@18.3.1 react-dom@18.3.1 --legacy-peer-deps

# Mise à jour d'eslint-config-next
npm install --save-dev eslint-config-next@14.2.5 --legacy-peer-deps

# Suppression de @next/font (intégré dans Next.js 14)
npm uninstall @next/font
```

### 2. Configuration Next.js

#### Avant (Next.js 13)

```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["example.com"],
    // ...
  },
};
```

#### Après (Next.js 14)

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
    ],
  },
};
```

**Changements :**

- Suppression de `reactStrictMode` (activé par défaut)
- Suppression de `swcMinify` (activé par défaut)
- Remplacement de `domains` par `remotePatterns` (plus sécurisé)

### 3. Nouveaux Fichiers de Configuration

#### `.babelrc`

```json
{
  "presets": ["next/babel"],
  "plugins": []
}
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  }
}
```

#### `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

## Avantages de Next.js 14

### 1. Performance

- **Turbopack** : Compilateur plus rapide (en beta)
- **Optimisations** : Meilleure gestion du bundle
- **Lazy Loading** : Chargement automatique des composants

### 2. Sécurité

- **remotePatterns** : Configuration plus stricte des images externes
- **Headers CORS** : Gestion améliorée des requêtes cross-origin
- **Validation** : Meilleure validation des props et des données

### 3. Développement

- **Fast Refresh** : Rechargement plus rapide en développement
- **ESLint** : Règles plus strictes et pertinentes
- **TypeScript** : Support natif amélioré

### 4. Production

- **Build** : Processus de build optimisé
- **Bundle** : Taille de bundle réduite
- **Runtime** : Performance d'exécution améliorée

## Compatibilité

### ✅ Compatible

- **Pages Router** : Support complet
- **API Routes** : Fonctionnement identique
- **Tailwind CSS** : Aucun changement requis
- **Framer Motion** : Compatible React 18
- **Swiper** : Compatible
- **React Icons** : Compatible

### ⚠️ Attention

- **@next/font** : Remplacé par `next/font` (intégré)
- **Images** : Utilisation de `remotePatterns` au lieu de `domains`

## Test de la Migration

### 1. Vérification des Versions

```bash
npm list next react react-dom
```

### 2. Test de Développement

```bash
npm run dev
```

### 3. Test de Build

```bash
npm run build
```

### 4. Test de Production

```bash
npm run start
```

## Résolution des Problèmes

### Erreur de Dépendances

```bash
# Utiliser --legacy-peer-deps pour résoudre les conflits
npm install --legacy-peer-deps
```

### Erreur de Build

```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

### Erreur de Runtime

```bash
# Vérifier la compatibilité des composants
npm run lint
```

## Prochaines Étapes

### 1. Migration vers App Router (Optionnel)

- Créer un dossier `app/`
- Migrer progressivement les pages
- Utiliser les nouvelles fonctionnalités

### 2. Optimisations

- Implémenter le streaming SSR
- Utiliser les nouvelles optimisations d'images
- Adopter les nouvelles conventions

### 3. Monitoring

- Surveiller les performances
- Vérifier la compatibilité des composants
- Tester sur différents navigateurs

## Ressources

- [Documentation Next.js 14](https://nextjs.org/docs)
- [Guide de Migration](https://nextjs.org/docs/upgrading)
- [Changelog](https://github.com/vercel/next.js/releases)
- [Discord Next.js](https://discord.gg/nextjs)
