import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { addContact } from './operations';
import { deleteContact } from './operations';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const initialState = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
// };

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isloading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
      console.log(action.payload);
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContact.pending]: state => {
      state.isLoading = true;
    },

    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
      // state.items = [action.payload, ...state.items];
      state.error = null;
    },
    [addContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContact.pending]: state => {
      state.isLoading = true;
    },

    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    [deleteContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// const persistConfig = {
//   key: 'contacts',
//   storage,
// };

// export const ContactReducer = persistReducer(
//   persistConfig,
//   contactSlice.reducer
// );

export const contactReducer = contactSlice.reducer;
