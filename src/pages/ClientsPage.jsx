import { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import ProductsTable from "../components/products/ProductsTable";
import { getAllClients, createClient } from "../services/ClientService";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [dateCreate, setDateCreate] = useState(today);
  const modalRef = useRef();
  const token = localStorage.getItem('token');

  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    const fetchClients = async () => {
      if (!token) {
        toast.error("Veuillez vous connecter");
        return;
      }
      try {
        const clientList = await getAllClients(token);
        console.log('Clients récupérés dans ClientsPage:', clientList);
        setClients(clientList || []);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.info("Accès interdit détecté. Utilisation de données simulées pour test.", {
            position: "top-center",
          });
        } else {
          toast.error("Erreur lors de la récupération des clients", {
            position: "top-center",
          });
        }
        console.error('Erreur capturée:', error.response || error);
      }
    };
    fetchClients();
  }, [token]);

  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!nom || !prenom || !email || !password) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        position: "top-center",
      });
      return;
    }

    try {
      const newClient = { nom, prenom, email, password, dateCreate };
      const createdClient = await createClient(newClient, token);
      toast.success("Client ajouté avec succès !", {
        position: "top-center",
        autoClose: 1500,
      });
      setClients([...clients, createdClient.data]);
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setDateCreate(today);
      toggleModal(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du client", {
        position: "top-center",
      });
      console.error("Erreur:", error);
    }
  };

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <ToastContainer style={{ zIndex: 9999 }} />
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Clients' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <button
            onClick={() => toggleModal(true)}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mb-4'
          >
            Ajouter un Client
          </button>

          <ProductsTable clients={clients} />
        </main>

        <dialog ref={modalRef} className="modal bg-transparent">
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Ajouter un Client</h3>
                <button onClick={() => toggleModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <hr className="mb-4" />
              <form onSubmit={handleSaveClient}>
                <div className="grid grid-cols-1 gap-4">
                  <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900" required />
                  <input type="text" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900" required />
                  <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900" required />
                  <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900" required />
                  <input type="date" name="dateCreate" value={dateCreate} onChange={(e) => setDateCreate(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900" required />
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button type="button" onClick={() => toggleModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Ajouter</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ClientsPage;