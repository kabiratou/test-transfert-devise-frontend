// src/utils/authToken.js

// Fonction pour récupérer le token depuis le localStorage
export const getToken = () => {
    return sessionStorage.getItem('token');
  };
  
  // Fonction pour enregistrer le token dans le localStorage
  export const setToken = (token) => {
    sessionStorage.setItem('token', token);
  };
  
  // Fonction pour supprimer le token du localStorage
  export const removeToken = () => {
    sessionStorage.removeItem('token');
  };
  