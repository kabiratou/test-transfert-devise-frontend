// src/services/ClientService.js
import axios from 'axios';

const CLIENTS_API_URL = 'http://localhost:8383/api/user';

const apiClient = axios.create({
  baseURL: CLIENTS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Requête envoyée avec Authorization pour Clients:', config.headers.Authorization);
    } else {
      console.warn('Aucun Bearer Token trouvé dans localStorage pour Clients');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAllClients = async () => {
  try {
    const response = await apiClient.get('/list');
    console.log('Réponse complète de getAllClients:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error.response?.data || error);
    throw error; // Laissez l'erreur remonter
  }
};

export const createClient = async (client) => {
  try {
    const response = await apiClient.post('', client);
    console.log('Client créé:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du client:', error.response?.data || error);
    throw error.response?.data?.message || 'Erreur lors de la création du client';
  }
};

export const getClientById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erreur lors de la récupération du client';
  }
};

export const getClientByName = async (nom) => {
  try {
    const response = await apiClient.get(`/by-name/${nom}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Erreur lors de la récupération du client';
  }
};