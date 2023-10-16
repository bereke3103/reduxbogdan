import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import booksData from '../../data/books.json';
import { createBookWithId } from '../../utils/createBookWithId';
import './BookForm.css';
import { FaSpinner } from 'react-icons/fa';

import {
  addBook,
  // thunFunction,
  fetchBook,
  selectIsLoadingViaApi,
} from '../../redux/slice/booksSlice';
import { setError } from '../../redux/slice/errorSlice';
const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const isLoadingViaApi = useSelector(selectIsLoadingViaApi);
  // const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, 'USUALLY')));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You have to fill title and author'));
    }
  };

  const handleRandomBook = () => {
    const indexBook = Math.floor(Math.random() * booksData.length);
    const itemBook = booksData[indexBook];

    dispatch(addBook(createBookWithId(itemBook, 'RANDOM')));
  };

  //!здесь мы использовали для локального состояния useState isLoading
  // const handleRandomBookViaApi = async () => {
  //   try {
  //     setIsLoading(true);
  //     //функция thunkFunction БЕЗ интеграции с redux
  //     // dispatch(thunFunction);

  //     //функция thunkFunction C интеграцией с redux
  //     await dispatch(fetchBook('http://localhost:4000/random-book-delay'));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //!Здесь мы центролизвали в redux store isLoading
  const handleRandomBookViaApi = () => {
    //функция thunkFunction БЕЗ интеграции с redux
    // dispatch(thunFunction);

    //функция thunkFunction C интеграцией с redux
    dispatch(fetchBook('http://localhost:5000/random-book-delay'));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button type="submit">Add Book</button>
          <button className="button" type="button" onClick={handleRandomBook}>
            Add Random Book
          </button>
          <button
            className="button"
            type="button"
            disabled={isLoadingViaApi}
            onClick={handleRandomBookViaApi}
            style={{ cursor: isLoadingViaApi ? 'wait' : 'pointer' }}
          >
            {isLoadingViaApi ? (
              <>
                <span>
                  Loading book...
                  <FaSpinner className="spinner" />{' '}
                </span>
              </>
            ) : (
              ' Add Random Book via API'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
