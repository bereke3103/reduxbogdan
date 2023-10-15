import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },

    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },

    toggleIsFavourite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite;
        }
      });
    },
  },
});

export const { addBook, deleteBook, toggleIsFavourite } = booksSlice.actions;
export const selectedBooks = (state) => state.books;
export default booksSlice.reducer;
