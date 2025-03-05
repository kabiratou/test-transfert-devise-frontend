// src/context.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getCurrentUser } from "./services/authService"; // Corrigé de ../services à ./services

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setAuth({
        isAuthenticated: true,
        user: storedUser,
        token: localStorage.getItem("token"),
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginService(email, password);
      const userData = {
        isAuthenticated: true,
        user: response.data.data,
        token: response.data.token,
      };
      setAuth(userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return userData.user;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l’intérieur d’un AuthProvider");
  }
  return context;
};