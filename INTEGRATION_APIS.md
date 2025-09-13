# Intégration des APIs dans la Page d'Accueil

## Vue d'ensemble

La page d'accueil du portfolio a été modifiée pour utiliser les données dynamiques provenant des APIs au lieu du contenu en dur. Cette intégration permet de rendre le contenu plus flexible et facilement modifiable via le CMS.

## APIs Utilisées

### 1. Informations Personnelles

- **Endpoint**: `https://teko-portfolio-cms.vercel.app/api/portfolio/moi`
- **Utilisation**: Récupération du nom, prénom, titre professionnel et résumé
- **Intégration**: Remplacement du titre et sous-titre statiques

### 2. Galerie Photos

- **Endpoint**: `https://teko-portfolio-cms.vercel.app/api/portfolio/galerie`
- **Utilisation**: Récupération de la photo de profil avec le titre "photot_de_profil_sans_fond"
- **Intégration**: Remplacement de l'image avatar.png statique

## Composants Créés

### 1. Hook `usePortfolioData`

- **Fichier**: `hooks/usePortfolioData.js`
- **Fonctionnalités**:
  - Récupération des données des APIs
  - Gestion des états de chargement et d'erreur
  - Fonction de retry en cas d'échec
  - Fonction utilitaire pour récupérer des photos par titre

### 2. Composant `LoadingSpinner`

- **Fichier**: `components/LoadingSpinner.js`
- **Fonctionnalités**: Affichage d'un spinner de chargement élégant avec animation

### 3. Composant `ErrorMessage`

- **Fichier**: `components/ErrorMessage.js`
- **Fonctionnalités**: Affichage des erreurs avec possibilité de retry

## Modifications Apportées

### Page d'Accueil (`pages/index.js`)

- Import et utilisation du hook `usePortfolioData`
- Remplacement du titre statique par les données dynamiques
- Remplacement du sous-titre par le résumé professionnel
- Gestion des états de chargement et d'erreur
- Intégration de la photo de profil dynamique

### Composant Avatar (`components/Avatar.js`)

- Modification pour accepter une prop `profilePhoto`
- Fallback vers l'image par défaut si aucune photo n'est trouvée
- Gestion des cas d'erreur

## Gestion des Erreurs

1. **Erreurs de réseau**: Affichage d'un message d'erreur avec bouton de retry
2. **Données manquantes**: Fallback vers le contenu par défaut
3. **Photo de profil manquante**: Utilisation de l'image avatar.png par défaut

## Fallbacks et Contenu par Défaut

- **Titre**: "Transforming Ideas Into Digital Reality" si pas de données personnelles
- **Sous-titre**: Message générique sur le développement web
- **Photo**: Image avatar.png si pas de photo de profil trouvée

## Structure des Données

### Informations Personnelles

```json
{
  "prenom": "Fabrice",
  "nom": "Folly",
  "titre": "Développeur Web et Mobile web full-stack",
  "resume": "Résumé professionnel..."
}
```

### Galerie Photos

```json
{
  "photo_url": "https://example.com/photo.jpg",
  "titre": "photot_de_profil_sans_fond"
}
```

## Utilisation

1. Les données sont automatiquement récupérées au chargement de la page
2. En cas d'erreur, l'utilisateur peut cliquer sur "Réessayer"
3. Le contenu s'adapte automatiquement selon les données disponibles
4. Les fallbacks garantissent une expérience utilisateur cohérente

## Prochaines Étapes

- Intégration des autres APIs (compétences, projets, parcours)
- Mise en place d'un système de cache pour améliorer les performances
- Ajout d'animations de transition lors du chargement des données
- Gestion de la pagination pour la galerie photos
