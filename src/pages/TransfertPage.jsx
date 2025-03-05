// TransfertPage.jsx
import { useRef, useState, useEffect } from 'react';
import Header from "../components/common/Header";
import OrdersTable from "../components/orders/OrdersTable";
import Sidebar from "../components/common/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { transferMoney } from "../services/transferService";
import { getAllComptes } from "../services/compteService";
import { useAuth } from "../context.jsx"; // Corrigé de ../context/AuthContext à ../context.jsx
import { useNavigate } from "react-router-dom";



const TransfertPage = () => {
    const [comptes, setComptes] = useState([]);
    const [compteSourceId, setcompteSourceId] = useState("");
    const [compteCibleId, setcompteCibleId] = useState("");
    const [montant, setMontant] = useState("");
    const [devise, setDevise] = useState("USD"); // Devise par défaut
    const modalRef = useRef();
    const token = localStorage.getItem('token');
    const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

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
    
      useEffect(() => {
        if (user.id) {
            setcompteSourceId(user.id);
        }
    }, [user.id]);

    useEffect(() => {
       
        const fetchComptes = async () => {
              try {
                const data = await getAllComptes(token);
                console.log('Comptes récupérés dans ComptesPage:', data);
                setComptes(data);
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
        if (token) fetchComptes();
        else toast.error("Veuillez vous connecter");
    }, [token]);

    const handleTransfert = async (e) => {
        e.preventDefault();
        if (!compteSourceId || !compteCibleId || !montant || !devise) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }
    
        try {
            await transferMoney({
                compteSourceId: compteSourceId,
                compteCibleId: compteCibleId,
                montant: parseFloat(montant),
                deviseSource: devise, // Passer deviseSource
                deviseCible: devise === "USD" ? "CAD" : "USD", // Définir deviseCible en fonction de devise
            }, token);
            toast.success("Transfert effectué avec succès");
            setcompteSourceId("");
            setcompteCibleId("");
            setMontant("");
            setDevise("USD"); // Réinitialisation à USD
            toggleModal(false);
        } catch (error) {
            toast.error("Erreur lors du transfert");
        }
    };

    return (
        <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
            <ToastContainer style={{ zIndex: 9999 }}/>
            <div className='fixed inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
                <div className='absolute inset-0 backdrop-blur-sm' />
            </div>
            <Sidebar />
            <div className='flex-1 overflow-auto relative z-10'>
                <Header title='Transferts' />
                <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                    <button onClick={() => toggleModal(true)} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mb-4'>
                        Effectuer un Transfert
                    </button>
                    <OrdersTable />
                </main>

                <dialog ref={modalRef} className="modal bg-transparent">
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Nouveau Transfert
                                </h3>
                                <button onClick={() => toggleModal(false)} className="text-gray-500 hover:text-gray-700">
                                    ✕
                                </button>
                            </div>
                            <hr className="mb-4" />
                            <form onSubmit={handleTransfert}>
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Sélection de l'expéditeur */}
                                    <select 
                                        name="from_compte_id"
                                        value={compteSourceId}
                                        onChange={(e) => setcompteSourceId(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required     
                                    >
                                       <option key={user.id} value={user.id}>{user.nom}</option>
                                    </select>

                                    {/* Sélection du destinataire */}
                                    <select 
                                        name="to_compte_id"
                                        value={compteCibleId}
                                        onChange={(e) => setcompteCibleId(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Sélectionner un destinataire</option>
                                        {comptes.map(compte => (
                                                        <option key={compte.id} value={compte.id}>
                                                            {compte.client.nom} {/* Affiche le nom du client */}
                                                        </option>
                                                    ))}
                                    </select>

                                    {/* Montant */}
                                    <input
                                        type="number"
                                        name="montant"
                                        placeholder="Montant"
                                        value={montant}
                                        onChange={(e) => setMontant(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required
                                    />

                                    {/* Sélection de la devise */}
                                    <select 
                                        name="devise"
                                        value={devise}
                                        onChange={(e) => setDevise(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required
                                    >
                                        <option value="USD">USD</option>
                                        <option value="CAD">CAD</option>
                                    </select>
                                </div>
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
export default TransfertPage;

