// src/components/users/UsersTable.jsx
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

const UsersTable = ({ comptes = [] }) => {
  console.log("Comptes reçus par UsersTable oui:", comptes);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Comptes</h2> {/* Changé de "Users" à "Comptes" */}
        <div className='relative'>
          {/* Champ de recherche peut être ajouté ici si nécessaire */}
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Clients
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Devise
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Solde
              </th>
             
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {comptes.length > 0 ? (
              comptes.map((compte) => (
                <motion.tr
                  key={compte.id}
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
                    {compte.client?.nom || 'Inconnu'} {/* Gestion si client est absent */}
                  </td>
                  <td className='px-6 py-4 whitespace nowrap text-sm text-gray-300'>
                    {compte.devise || 'N/A'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    {compte.solde || '0'}
                  </td>
                  
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-4">
                  Aucun compte trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UsersTable;