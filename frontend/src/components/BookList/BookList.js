import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBook,
  toggleIsFavourite,
} from '../../redux/books/actionCreators';
import {
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
  selectTitleFilter,
} from '../../redux/slice/filterSlice';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books); //название редюсера, где мы указали в store
  const selectedTitle = useSelector(selectTitleFilter);
  const selectedAuthor = useSelector(selectAuthorFilter);
  const selectedOnlyFavourite = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleIsFavourite = (id) => {
    dispatch(toggleIsFavourite(id));
  };

  const filteredBooks = books.filter((book) => {
    console.log({ book });
    const matchesTitle = book.title
      .toLowerCase()
      .includes(selectedTitle.toLowerCase());

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(selectedAuthor.toLowerCase());

    const matchesOnlyFavourite = selectedOnlyFavourite
      ? book.isFavourite
      : true;
    return matchesTitle && matchesAuthor && matchesOnlyFavourite;
  });

  const hightLightMatch = (text, filter) => {
    // console.log({ bookTitle: text });
    //text = имеющиейся книги или автор
    //filter = текущие значения из редакса
    // console.log({ selectedTitle: filter });
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');
    console.log({ regex });

    return text.split(regex).map((substring, i) => {
      console.log({ substring });
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }

      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {hightLightMatch(book.title, selectedTitle)} by{' '}
                <strong>{hightLightMatch(book.author, selectedAuthor)}</strong>
              </div>
              <div className="book-actions" style={{ cursor: 'pointer' }}>
                <span onClick={() => handleIsFavourite(book.id)}>
                  {book.isFavourite ? (
                    <BsHeartFill className="star-icon" />
                  ) : (
                    <BsHeart className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
