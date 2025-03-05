import React from "react";
import { useAuth } from "../../context.jsx";

export default function Header({ title }){
  const { logout, loading } = useAuth();
  const { auth } = useAuth();

  const user = auth.user || {};

  if (loading) return <span>Chargement...</span>; // Empêche d'afficher "Non connecté" par erreur


  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>   
        <div className="">
          <span>Bienvenue, {user?.nom} !</span>
        </div>
    
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
      </div>
    </header>
  );
};

