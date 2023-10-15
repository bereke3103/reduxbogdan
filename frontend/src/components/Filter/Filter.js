import {
  resetFilters,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
  selectTitleFilter,
  setAuthorFilter,
  setIsFavouriteBooks,
  setTitleFilter,
} from '../../redux/slice/filterSlice';
import './Filter.css';
import { useDispatch, useSelector } from 'react-redux';
const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavoriteFilter);

  const handleSelectFilter = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleSelectAuhtorFilter = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };
  const handleOnlyFavouriteFilter = () => {
    dispatch(setIsFavouriteBooks());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={titleFilter}
            onChange={handleSelectFilter}
            type="text"
            placeholder="Filter by title..."
          />
        </div>

        <div className="filter-group">
          <input
            value={authorFilter}
            onChange={handleSelectAuhtorFilter}
            type="text"
            placeholder="Filter by author..."
          />
        </div>
        <div className="filter-group">
          <label htmlFor="isFavourite">
            <input
              id="isFavourite"
              checked={onlyFavouriteFilter}
              onChange={handleOnlyFavouriteFilter}
              type="checkbox"
            />
            Favourite Books
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
