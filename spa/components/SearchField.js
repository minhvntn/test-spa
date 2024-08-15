import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import A from './A';
import { proxy } from '../utils';
import { searchStaxSuggest } from '../utils/config';

function SearchField(props) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sanitizedSearchValue = searchParams.get('searchValue')?.replace(/<\/?[^>]+(>|$)/g, "") || '';
    setSearchValue(sanitizedSearchValue);
  }, [router.asPath]);

  const debouncedChangeHandler = useCallback(
    debounce((inputValue) => {
      proxy(searchStaxSuggest, { inputValue })
      .then((resJson) => {
        const suggestions = resJson?.suggest?.studio_suggestor_en[inputValue]?.suggestions ?? [];
        setSuggestions(suggestions);
      })
      .catch((error) => {
        console.error('Suggestions proxy error:', error);
      });
    }, 300),
    []
  );

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    debouncedChangeHandler(inputValue);
    setShowSuggestions(true);
    setHighlightedIndex(-1); // Reset highlighted index on input change
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        handleSuggestionClick(suggestions[highlightedIndex].term);
      } else {
        updateUrlSearchParam(searchValue);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleSuggestionClick = (term) => {
    setSearchValue(term);
    updateUrlSearchParam(term);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const updateUrlSearchParam = (searchValue) => {
    const sanitizedSearchValue = searchValue.replace(/<\/?[^>]+(>|$)/g, "");
    const newQuery = { searchValue: sanitizedSearchValue };
    const currentPath = router.pathname;

    if (currentPath === '/search') {
      router.push({
        pathname: currentPath,
        query: newQuery,
      }, undefined, { shallow: true });
    } else {
      router.push({
        pathname: '/search',
        query: newQuery,
      });
    }
    setShowSuggestions(false);
  };

  return (
    <div className='search-field-search-container' onBlur={handleBlur}>
      <input
        type='search'
        className='search-field-search-input'
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='Search...'
        onFocus={() => setShowSuggestions(true)}
      />
      {suggestions.length > 0 && showSuggestions && (
        <div className='search-field-suggestions-container'>
          {suggestions.map(({ term }, index) => (
            <A
              key={term}
              href={'/search?searchValue=' + term}
              label={term}
              className={`search-field-suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={() => handleSuggestionClick(term)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchField;