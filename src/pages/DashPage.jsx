// src/pages/DashPage.jsx
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context.jsx"; // Corrigé de ../context/AuthContext à ../context.jsx

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import Sidebar from "../components/common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      toast.error("Veuillez vous connecter d'abord", {
        position: "top-center",
      });
      navigate("/");
    }
  }, [auth, navigate]);

  const user = auth.user || {};

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <ToastContainer style={{ zIndex: 9999 }} />
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={`Tableau de bord - Bienvenue ${user.nom || ""}`} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name="Utilisateurs" icon={Zap} value="0" color="#6366F1" />
            <StatCard name="Comptes" icon={Users} value="0" color="#8B5CF6" />
            <StatCard name="Devises" icon={ShoppingBag} value="0" color="#EC4899" />
            <StatCard name="Transferts" icon={BarChart2} value="0" color="#10B981" />
          </motion.div>
          <motion.div
            className="bg-gray-800 rounded-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Informations du profil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Nom</p>
                <p className="text-white">{user.nom}</p>
              </div>
              <div>
                <p className="text-gray-400">Courriel</p>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Statut</p>
                <p className="text-white">{user.etat ? "Actif" : "Inactif"}</p>
              </div>
              <div>
                <p className="text-gray-400">Date de création</p>
                <p className="text-white">
                  {new Date(user.dateCreate).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashPage;