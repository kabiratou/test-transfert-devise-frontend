// src/services/compteService.js
import axios from 'axios';

const COMPTES_API_URL = 'http://localhost:8383/api/compte';

const apiClient = axios.create({
  baseURL: COMPTES_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Requête envoyée avec Authorization pour Comptes:', config.headers.Authorization);
    } else {
      console.warn('Aucun Bearer Token trouvé dans localStorage pour Comptes');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAllComptes = async () => {
  try {
    const response = await apiClient.get('/list');
    console.log('Réponse complète de getAllComptes:', response.data);
    if (response.data.status && response.data.data) {
      return response.data.data; // Retourne uniquement la liste des comptes
    } else {
      throw new Error(response.data.message || 'Aucune donnée disponible');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes:', error.response?.data || error);
    throw error.response?.data?.message || 'Erreur lors de la récupération des comptes';
  }
};

export const createCompte = async (compte) => {
  try {
    const response = await apiClient.post('/save', compte);
    console.log('Compte créé:', response.data);
    if (response.data.status && response.data.data) {
      return response.data.data; // Retourne le compte créé
    } else {
      throw new Error(response.data.message || 'Erreur lors de la création');
    }
  } catch (error) {
    console.error('Erreur lors de la création du compte:', error.response?.data || error);
    throw error.response?.data?.message || 'Erreur lors de la création du compte';
  }
};