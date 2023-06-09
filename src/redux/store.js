import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { contactsApi } from './contact_api';
import { setupListeners } from '@reduxjs/toolkit/query';

import { filterReducer, filterSlice } from './filterSlice';
// import { contactReducer } from './contactSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(contactsApi.middleware),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware),
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);
