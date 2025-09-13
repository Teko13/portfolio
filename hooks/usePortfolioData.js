import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = '/api/portfolio';

const usePortfolioData = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [competences, setCompetences] = useState([]);
  const [projets, setProjets] = useState([]);
  const [parcours, setParcours] = useState([]);
  const [loisirs, setLoisirs] = useState([]);
  const [reseau, setReseau] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour faire les appels API
  const fetchData = useCallback(async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (err) {
      console.error(`Erreur lors de la récupération de ${endpoint}:`, err);
      throw err;
    }
  }, []);

  // Fonction pour charger toutes les données
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        personalData,
        competencesData,
        projetsData,
        parcoursData,
        loisirsData,
        reseauData,
        galleryData
      ] = await Promise.allSettled([
        fetchData('moi'),
        fetchData('competences'),
        fetchData('projets'),
        fetchData('parcours'),
        fetchData('loisirs'),
        fetchData('reseau'),
        fetchData('galerie')
      ]);

      // Traiter les résultats
      if (personalData.status === 'fulfilled') {
        setPersonalInfo(personalData.value);
      }
      if (competencesData.status === 'fulfilled') {
        setCompetences(competencesData.value || []);
      }
      if (projetsData.status === 'fulfilled') {
        setProjets(projetsData.value || []);
      }
      if (parcoursData.status === 'fulfilled') {
        setParcours(parcoursData.value || []);
      }
      if (loisirsData.status === 'fulfilled') {
        setLoisirs(loisirsData.value || []);
      }
      if (reseauData.status === 'fulfilled') {
        setReseau(reseauData.value || []);
      }
      if (galleryData.status === 'fulfilled') {
        setGallery(galleryData.value || []);
      }

      // Vérifier s'il y a eu des erreurs critiques
      const criticalErrors = [
        personalData,
        competencesData,
        projetsData
      ].filter(result => result.status === 'rejected');

      if (criticalErrors.length > 0) {
        throw new Error('Erreur lors du chargement des données principales');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // Fonction pour récupérer une photo par titre
  const getPhotoByTitle = useCallback((title) => {
    return gallery.find(photo => photo.titre === title) || null;
  }, [gallery]);

  // Fonction pour vérifier si les données sont prêtes
  const isDataReady = useCallback(() => {
    return personalInfo && competences.length > 0 && projets.length > 0;
  }, [personalInfo, competences, projets]);

  // Fonction de retry
  const retry = useCallback(() => {
    loadAllData();
  }, [loadAllData]);

  // Charger les données au montage du composant
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    personalInfo,
    competences,
    projets,
    parcours,
    loisirs,
    reseau,
    gallery,
    loading,
    error,
    getPhotoByTitle,
    isDataReady,
    retry
  };
};

export { usePortfolioData };
