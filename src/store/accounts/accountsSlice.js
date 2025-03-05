import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as accountService from '../../services/account.service';

export const createAccount = createAsyncThunk(
  'accounts/createAccount',
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await accountService.createAccount(accountData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserAccounts = createAsyncThunk(
  'accounts/fetchUserAccounts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await accountService.getUserAccounts(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllUsersWithAccounts = createAsyncThunk(
  'accounts/fetchAllUsersWithAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.getAllUsersWithAccounts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  accounts: [],
  usersWithAccounts: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearAccountMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts.push(action.payload);
        state.successMessage = 'Compte créé avec succès';
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Échec de la création du compte';
      })
      .addCase(fetchUserAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchUserAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Échec du chargement des comptes';
      })
      .addCase(fetchAllUsersWithAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersWithAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersWithAccounts = action.payload;
      })
      .addCase(fetchAllUsersWithAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Échec du chargement des utilisateurs';
      });
  },
});

export const { clearAccountMessages } = accountsSlice.actions;
export default accountsSlice.reducer;