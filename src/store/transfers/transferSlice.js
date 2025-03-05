import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as transferService from '../../services/transfer.service';

export const executeTransfer = createAsyncThunk(
  'transfers/executeTransfer',
  async (transferData, { rejectWithValue }) => {
    try {
      const response = await transferService.executeTransfer(transferData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  transfers: [],
  currentTransfer: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    clearTransferMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setCurrentTransfer: (state, action) => {
      state.currentTransfer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(executeTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transfers.push(action.payload);
        state.successMessage = 'Transfert effectué avec succès';
        state.currentTransfer = null;
      })
      .addCase(executeTransfer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Échec du transfert';
      });
  },
});

export const { clearTransferMessages, setCurrentTransfer } = transfersSlice.actions;
export default transfersSlice.reducer;