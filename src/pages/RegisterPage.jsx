import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { register } from "../services/authService";
import { createClient } from "../services/ClientService";
import { toast, ToastContainer } from 'react-toastify'; // Importation de react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importation du CSS de toastify


const Register = () => {
  const today = new Date().toISOString().split("T")[0];
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [date_creation, setDatecreation] = useState(today);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await createClient({ nom, email, password, date_creation });
        // Affichage d'un toast de succès si la requête réussit
        toast.success("Inscription réussie !", {
           position: "top-center",
        });
        // Attendre 2 secondes avant de rediriger
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirige vers la page d'accueil après connexion
    } catch (err) {
       // Affichage d'un toast d'erreur en cas de problème
       toast.error(err?.message || "Erreur lors de l'enregistrement", {
        position: "top-center",
      });
        setError(err?.message || "Erreur lors de la connexion");
    }
};

  return (
    <div className='min-h-screen bg-gray-900'>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-gray-50">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                TD
              </div>
              <h2 className="ml-2 text-2xl font-bold text-gray-800">Transfert par Devise</h2>         
            </div>
                      
            <h3 className="mt-6 text-xl font-bold text-center text-gray-800"></h3>
            
          
          </div>
          
          <div className="w-full md:w-1/2 p-8 bg-white">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">ENREGISTREMENT</h2>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form className="space-y-6" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="••••••••"
                />
              </div>
                
                <div>
                  <label htmlFor="date_creation" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de creation
                  </label>
                  <input
                    id="date_creation"
                    name="date_creation"
                    value={date_creation}
                    type="date"
                    onChange={(e) => setDatecreation(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    ENREGISTRER
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Deja un compte user?{' '}
                  <button 
                    onClick={() => navigate('/')} 
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                  Se connecter
                  </button>             
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;