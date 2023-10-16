import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slice/booksSlice';
import filterReducer from './slice/filterSlice';
import errorReducer from './slice/errorSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});

export default store;
