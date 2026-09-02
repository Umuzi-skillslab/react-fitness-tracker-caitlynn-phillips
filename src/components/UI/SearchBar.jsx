import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Controlled search input — calls onSearch as the user types,
// and supports a clear button to reset the term
const SearchBar = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Access the event object directly to read the typed value
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      {searchTerm && (
        <button type="button" onClick={handleClear} className={styles.searchClear}>
          Clear
        </button>
      )}
      <button type="submit" className={styles.searchSubmit}>
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Search exercises...',
};

export default SearchBar;