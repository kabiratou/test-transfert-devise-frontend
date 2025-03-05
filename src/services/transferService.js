import api from './api';

export const transferMoney = async (transferData, token) => {
    try {
        console.log("Données avant requete:", transferData);

        const response = await api.post('/user/transfert', {
            compteSourceId: transferData.compteSourceId,
            compteCibleId: transferData.compteCibleId,
            montant: transferData.montant,
            deviseSource: transferData.deviseSource, // Ajout de deviseSource
            deviseCible: transferData.deviseCible,   // Ajout de deviseCible
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("Données:", response.data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getAllTransactions = async () => {
  try {
    const response = await api.get('/transactions/list');
    console.log('Réponse complète de getAllTransactions:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error.response?.data || error);
    throw error; // Laissez l'erreur remonter
  }
};
