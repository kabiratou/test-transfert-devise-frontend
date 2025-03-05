import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as exchangeService from '../../services/exchange.service';

export const getExchangeRate = createAsyncThunk(
  'exchange/getExchangeRate',
  async ({ fromCurrency, toCurrency }, { rejectWithValue }) => {
    try {
      const response = await exchangeService.getExchangeRate(fromCurrency, toCurrency);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  rates: {},
  isLoading: false,
  error: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExchangeRate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getExchangeRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates[`${action.payload.deviseDe}-${action.payload.deviseVers}`] = action.payload;
      })
      .addCase(getExchangeRate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Échec de récupération du taux de change';
      });
  },
});

export default exchangeSlice.reducer;