// src/components/products/ProductsTable.jsx
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react"; // Pas de Search utilisé pour l'instant

const ProductsTable = ({ clients = [] }) => {
  console.log('Clients reçus par ProductsTable:', clients);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Liste des Clients</h2>
        <div className='relative'>
          {/* Champ de recherche peut être ajouté ici si nécessaire */}
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Nom
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Date de création
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Nombre de Comptes
              </th>
              
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {clients.length > 0 ? (
              clients.map((client) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                    <img
                      src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
                      alt='Client img'
                      className='size-10 rounded-full'
                    />
                    {client.nom}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    {client.email}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    {new Date(client.dateCreate).toLocaleDateString('fr-FR')} {/* Corrigé de date_creation à dateCreate */}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    0 {/* À dynamiser si vous avez une API pour les comptes */}
                  </td>
                  
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">
                  Aucun client trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;