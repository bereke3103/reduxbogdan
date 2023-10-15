import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithId } from '../../utils/createBookWithId';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

//заместо thunkFunction мы можем использовать createAsyncThunk для создания своего action, где указано первым аргументом
export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
  const bookViaApi = await axios.get('http://localhost:4000/random-book');

  console.log({ bookViaApi });
  return bookViaApi.data;
});

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

//ЭТА АСИНХРОННАЯ ФУНКЦИЯ БЕЗ ИНТЕГРАЦИИ В REDUX, но он рабочий, для того, чтобы у него был отдельный action, мы можем можем использоваться CreateAsyncThunk, в котором первым аргументом функции мы указываем action, который должен совпадать с name reducer
export const thunFunction = async (dispatch, getState) => {
  // console.log(getState()); //таким Образом мы можем проверить состояние ДО
  try {
    const bookViaApi = await axios.get('http://localhost:4000/random-book');

    if (bookViaApi?.data?.author && bookViaApi?.data?.title) {
      dispatch(addBook(createBookWithId(bookViaApi.data, 'API')));
    }
  } catch (error) {
    console.log(`Axios Error: ${error}`);
  }
  // console.log(getState()); //таким Образом мы можем проверить состояние ПОСЛЕ
};

export const { addBook, deleteBook, toggleIsFavourite } = booksSlice.actions;
export const selectedBooks = (state) => state.books;
export default booksSlice.reducer;
