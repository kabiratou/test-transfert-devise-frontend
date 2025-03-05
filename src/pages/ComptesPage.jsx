// src/pages/ComptesPage.jsx
import { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import UsersTable from "../components/users/UsersTable";
import { createCompte, getAllComptes } from "../services/compteService";
import { getAllClients } from "../services/ClientService";
import { useAuth } from "../context.jsx"; // Corrigé de ../context/AuthContext à ../context.jsx


const ComptesPage = () => {
  const [comptes, setComptes] = useState([]);
  const [clients, setClients] = useState([]);
	const [clientId, setClientId] = useState(""); // Pour stocker le client sélectionné
	const [solde, setSolde] = useState("");
	const [devise, setDevise] = useState("");
	const modalRef = useRef();
	const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

	 const { auth } = useAuth();
	
	  const user = auth.user || {};

	  useEffect(() => {
        if (user.id) {
            setClientId(user.id);
        }
    }, [user.id]);
	
  useEffect(() => {
    const fetchClients = async () => {
		  try {
			const data = await getAllClients();
			setClients(data); // Supposons que data est un tableau d'objets clients
		  } catch (error) {
			console.error("Erreur lors du chargement des clients:", error);
		  }
		};
    const fetchComptes = async () => {
      try {
        const compteList = await getAllComptes();
        console.log('Comptes récupérés dans ComptesPage:', compteList);
        setComptes(compteList || []);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error("Accès interdit : permissions insuffisantes pour voir les comptes", {
            position: "top-center",
          });
        } else {
          toast.error("Erreur lors de la récupération des comptes", {
            position: "top-center",
          });
        }
        console.error('Erreur capturée:', error.response || error);
      }
    };
    fetchComptes();
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
		e.preventDefault();
	  
		if (!clientId || !devise || !solde) {
		  alert("Veuillez remplir tous les champs.");
		  return;
		}
	  
		const newCompte = {
		  client: { id: clientId },
		  devise,
		  solde
		};
	  
		try {
		  await createCompte(newCompte);
		  toast.success("Compte créé avec succès!", {
            position: "top-center",
            });       
		// Rafraîchir la liste des comptes avec la bonne structure
        const updatedComptes = await getAllComptes();
        if (updatedComptes && Array.isArray(updatedComptes.data)) {
            setComptes(updatedComptes.data);
        } else {
            console.error("Format inattendu des comptes après création :", updatedComptes);
        }

		  toggleModal(false);
		} catch (error) {
		  console.error("Erreur lors de la création du compte:", error);
		  alert("Une erreur s'est produite.");
		}
	  };

  const hasCompte = comptes.some(compte => compte.client.id === user.id);

	  

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <ToastContainer style={{ zIndex: 9999 }} />
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Comptes' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <button onClick={() => toggleModal(true)} disabled={hasCompte}  className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mb-4'>
						Créer un compte
					</button>
          <UsersTable comptes={comptes} />
        </main>
        {/* Modal */}
				 <dialog ref={modalRef} className="modal bg-transparent">
					<div className="fixed inset-0 flex items-center justify-center bg-black/50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
						{/* Header */}
						<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Nouveau Compte
						</h3>
						<button
							onClick={() => toggleModal(false)}
							className="text-gray-500 hover:text-gray-700"
						>
							✕
						</button>
						</div>

						<hr className="mb-4" />

						{/* Form */}
						<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 gap-4">
						<select 
									name="client_id" 
									value={clientId}
									onChange={(e) => setClientId(e.target.value)}
									className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
									required
									>
								    <option key={user.id} value={user.id}>{user.nom}</option>
									</select>
							<input
							type="number"
							 name="solde"
							 value={solde}
							 onChange={(e) => setSolde(e.target.value)}
							placeholder="Le Solde"
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							required
							/>
							<select 
									name="devise" 
									value={devise}
									onChange={(e) => setDevise(e.target.value)}
									className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
									required
									>
									<option value="">Sélectionner une devise</option>
									<option value="USD">USD</option>
									<option value="CAD">CAD</option>

							</select>
						</div>

						{/* Buttons */}
						<div className="mt-6 flex justify-end space-x-2">
							<button
							type="button"
							onClick={() => toggleModal(false)}
							className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
							>
							Annuler
							</button>
							<button
							type="submit"
							className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
							>
							Sauvegarder
							</button>
						</div>
						</form>
					</div>
					</div>
				 </dialog>
      </div>
    </div>
  );
};

export default ComptesPage;