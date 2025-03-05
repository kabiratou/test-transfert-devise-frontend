// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8383/api/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    if (response.data.status) {
      return response.data;
    }
    throw new Error("Réponse invalide du serveur");
  } catch (error) {
    console.error("Erreur de connexion :", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Erreur lors de la connexion");
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur d'inscription :", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};