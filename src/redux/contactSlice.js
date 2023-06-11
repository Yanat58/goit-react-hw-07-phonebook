import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { addContact } from './operations';
import { deleteContact } from './operations';

// const hendlePending = state => (state.isLoading = true);
// const hendleFulfilled = (state, action) => {
//   state.isLoading = false;
//   state.items = action.payload;
//   state.error = null;
// };
// const hendleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };
// const hendleAddFulfilled = (state, action) => {
//   state.isLoading = false;
//   // state.items.push(action.payload);
//   state.items = [action.payload, ...state.items];
//   state.error = null;
// };

// const hendleDeleteFulfilled = (state, action) => {
//   state.isLoading = false;
//   state.error = null;
//   state.items = state.items.filter(item => item.id !== action.payload);
// };

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchContacts.pending, hendlePending)
  //     .addCase(fetchContacts.fulfilled, hendleFulfilled)
  //     .addCase(fetchContacts.rejected, hendleRejected)
  //     .addCase(addContact.pending, hendlePending)
  //     .addCase(addContact.fulfilled, hendleAddFulfilled)
  //     .addCase(addContact.rejected, hendleRejected)
  //     .addCase(deleteContact.pending, hendlePending)
  //     .addCase(deleteContact.fulfilled, hendleDeleteFulfilled)
  //     .addCase(deleteContact.rejected, hendleRejected);
  // },

  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
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
      // state.items.push(action.payload);
      state.items = [action.payload, ...state.items];
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

export const contactReducer = contactSlice.reducer;
