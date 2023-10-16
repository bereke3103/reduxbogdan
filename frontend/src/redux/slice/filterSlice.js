import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorutie: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  //при импортировании мы импортируем actionCreators
  reducers: {
    setTitleFilter: (state, action) => {
      //Только в новом подходе редаксе в createSlice мы можем напрямую изменять state, благодаря библиотеке Immer т.е таким образом
      state.title = action.payload;

      //! традиционный подход как в чистом Редаксе, так как они должны быть иммутабельны
      //! return { ...state, title: action.payload };
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setIsFavouriteBooks: (state) => {
      state.onlyFavorutie = !state.onlyFavorutie;
    },
    resetFilters: () => {
      //state.title = '';
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  setAuthorFilter,
  setIsFavouriteBooks,
  resetFilters,
} = filterSlice.actions; //если при вызове, допусти setTitleFilter("hello") = возвращается {type: "filter/setTitleFilter", payload: "hello"}

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorutie;

export default filterSlice.reducer;
