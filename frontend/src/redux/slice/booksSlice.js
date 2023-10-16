import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWithId } from '../../utils/createBookWithId';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaApi: false,
};

//заместо thunkFunction мы можем использовать createAsyncThunk для создания своего action, где указано первым аргументом
export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const bookViaApi = await axios.get(url);
      return bookViaApi.data;
    } catch (error) {
      thunkAPI.dispatch(setError(`Произошла ошибка: ${error.message}`));

      //OPTION1
      //ВАРИАНТ 1
      // throw error;

      //OPTION2
      //ВАРИАНТ 2
      //этот вариант предпочтительнее
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },

    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },

    toggleIsFavourite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite;
        }
      });
    },
  },

  //OPTION1
  //ВАРИАНТ 1
  //через вычисляеиое свойство объекта
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaApi = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaApi = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaApi = false;
    },
  },

  //OPTION2
  //ВАРИАНТ 2
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.pending, (state) => {
  //     state.isLoadingViaApi = true;
  //   });
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.author && action.payload.title) {
  //       state.isLoadingViaApi = false;
  //       state.books.push(createBookWithId(action.payload, 'API'));
  //     }
  //   });
  //   builder.addCase(fetchBook.rejected, (state) => {
  //     state.isLoadingViaApi = false;
  //   });
  // },
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
export const selectedBooks = (state) => state.books.books;
export const selectIsLoadingViaApi = (state) => state.books.isLoadingViaApi;
export default booksSlice.reducer;
