import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slice/booksSlice';
import filterReducer from './slice/filterSlice';
const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
});

export default store;
