import { useState } from 'react';
import { useDispatch } from 'react-redux';
import booksData from '../../data/books.json';
import { addBook } from '../../redux/books/actionCreators';
import { createBookWithId } from '../../utils/createBookWithId';
import './BookForm.css';
const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleRandomBook = () => {
    const indexBook = Math.floor(Math.random() * booksData.length);
    const itemBook = booksData[indexBook];

    dispatch(addBook(createBookWithId(itemBook)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author })));
      setTitle('');
      setAuthor('');
    }
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
            Random Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
