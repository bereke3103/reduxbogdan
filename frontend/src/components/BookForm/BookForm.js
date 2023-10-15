import { useState } from 'react';
import { useDispatch } from 'react-redux';
import booksData from '../../data/books.json';
import { createBookWithId } from '../../utils/createBookWithId';
import './BookForm.css';

import {
  addBook,
  // thunFunction,
  fetchBook,
} from '../../redux/slice/booksSlice';
const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, 'USUALLY')));
      setTitle('');
      setAuthor('');
    }
  };

  const handleRandomBook = () => {
    const indexBook = Math.floor(Math.random() * booksData.length);
    const itemBook = booksData[indexBook];

    dispatch(addBook(createBookWithId(itemBook, 'RANDOM')));
  };

  const handleRandomBookViaApi = async () => {
    //функция thunkFunction БЕЗ интеграции с redux
    // dispatch(thunFunction);

    //функция thunkFunction C интеграцией с redux
    dispatch(fetchBook());
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
          <button className="button" onClick={handleRandomBook}>
            Add Random Book
          </button>
          <button className="button" onClick={handleRandomBookViaApi}>
            Add Random Book via API
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
