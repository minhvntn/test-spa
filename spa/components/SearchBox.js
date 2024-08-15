import React, { useState } from 'react';
import Ai12zComponent from './Ai12zComponent';
import Ai12zSearch from './Ai12zSearch';
const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      if (value.length >= 3) {
          // Fetch autocomplete results from API (this is a placeholder)
          fetch(`/api/autocomplete/search?q=${value}`)
              .then(response => response.json())
              .then(data => setAutocompleteResults(data.results))
              .catch(error => console.error('Error fetching autocomplete results:', error));
          setIsExpanded(true);
      } else {
          setAutocompleteResults([]);
          setIsExpanded(false);
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      // Implement the search logic or redirect to the search results page
      window.location.href = `/searchresults?q=${searchTerm}`;
  };

  const handleClear = () => {
      setSearchTerm('');
      setAutocompleteResults([]);
      setIsExpanded(false);
  };

  return (
      <div className="global-search " role="search" id="global-search" aria-modal="true">
        
            <Ai12zSearch />
          
    </div>
  );
};

export default GlobalSearch;