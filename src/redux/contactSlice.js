import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { addContacts } from './operations';
import { deleteContacts } from './operations';

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
    contacts: [],
    isLoading: false,
    error: null,
  },
  
  extraRedusers: {
    [fetchContacts.pending]: state => {
      state.isloading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
      state.error = null;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContacts.pending]: (state)=> {
      state.isLoading=true;
    },

    [addContacts.fulfilled]: (state,action)=> {
      state.isLoading = false;
      state.contacts = [action.payload, ...state.contacts];
      state.error = null;
    },
    [addContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContacts.pending]: (state)=> {
      state.isLoading=true;
    },

    [deleteContacts.fulfilled]: (state,action)=> {
      state.isLoading = false;
      state.error = null;
      const index = state.contacts.findIndex(
       contact=> contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
    },
    [deleteContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },



  },
});


export const contactReducer =  contactSlice.reducer;
