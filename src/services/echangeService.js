import api from './api';

export const getTauxChange = async (fromCurrency, toCurrency) => {
  try {
    const response = await api.get(`/user/taux-change/${fromCurrency}${toCurrency}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du taux de change:", error);
    throw error;
  }
};