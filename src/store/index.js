import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import usersReducer from './users/usersSlice';
import accountsReducer from './accounts/accountsSlice';
import transfersReducer from './transfers/transfersSlice';
import exchangeReducer from './exchange/exchangeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    accounts: accountsReducer,
    transfers: transfersReducer,
    exchange: exchangeReducer,
  },
});

export default store;