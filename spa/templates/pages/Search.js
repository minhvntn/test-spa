import { HomeHeader } from './Home';
import { useEffect, useState } from 'react';
import A from '../../components/A';
import { proxy, proxyWithoutResponse } from '../../utils';
import { searchStaxSearch } from '../../utils/config';
import { searchStaxAnalytics } from '../../utils/config';
import { useRouter } from 'next/router';

function Search(props) {
  const {title, description} = props;
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultsTotal, setResultsTotal] = useState(0);
  const [filteredResultsTotal, setFilteredResultsTotal] = useState(0);
  const [resultRows, setResultRows] = useState([5, 10]);
  const [facets, setFacets] = useState({});
  const [facetValue, setFacetValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const params = new URLSearchParams(new URL(url, window.location.origin).search);
      const sanitizedSearchValue = params.get('searchValue')?.replace(/<\/?[^>]+(>|$)/g, "") || '';
      setSearchValue(sanitizedSearchValue);
      setFacetValue('');
      setCurrentPage(1);
    };

    handleRouteChange(window.location.href);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (searchValue) {
      const queryParams = {searchValue, start: (currentPage - 1) * rowsPerPage, rows: rowsPerPage};

      // Fetch the unfiltered results and facet counts
      proxy(searchStaxSearch, queryParams)
      .then((resJson) => {
        setResults(resJson.response.docs);
        setResultsTotal(resJson.response.numFound);
        setSuggestions(resJson.spellcheck.suggestions[1].suggestion);

        const facetResults = resJson?.facet_counts?.facet_fields?.searchType_s;
        if (facetResults) {
          setFacets(Object.fromEntries(facetResults.reduce((acc, val, i, array) => i % 2 === 0 ? [...acc, [val, array[i + 1]]] : acc, [])));
        }
        handleSearchEvent();
      })
      .catch((error) => {
        console.error('Search proxy error:', error);
      });

      // Fetch the filtered results if a facet is selected
      if (facetValue) {
        queryParams.fq = encodeURIComponent(`searchType_s:"${facetValue}"`);

        proxy(searchStaxSearch, queryParams)
        .then((resJson) => {
          setFilteredResults(resJson.response.docs);
          setFilteredResultsTotal(resJson.response.numFound);
        })
        .catch((error) => {
          console.error('Search proxy error:', error);
        });
      }
    }
  }, [searchValue, facetValue, currentPage, rowsPerPage]);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(parseInt(rows, 10));
    setCurrentPage(1); // Reset to first page when rows per page change
  };

  const totalPages = facetValue
    ? Math.ceil(filteredResultsTotal / rowsPerPage)
    : Math.ceil(resultsTotal / rowsPerPage);

  const handleFacetClick = (facet) => {
    setFacetValue(facet);
    setCurrentPage(1); // Reset to first page when facet is selected
  };

  const handleResetFilter = () => {
    setFacetValue('');
    setFilteredResults([]);
    setFilteredResultsTotal(0);
    setCurrentPage(1); // Reset to first page when filter is reset
  };

  const handleSearchEvent = () => {
    const searchClickObj = {
      "event": "_search",
      "properties": {
        "query": searchValue,
      }
    }
    proxyWithoutResponse(searchStaxAnalytics, {data: btoa(JSON.stringify(searchClickObj))});
  }

  const handleSearchResultOnClick = (item, index) => {
    const searchClickObj = {
      "event": "_searchclick",
      "properties": {
        "query": searchValue,
        "cDocId": item.uri,
        "cDocTitle": item.title_t,
        "position": ((currentPage - 1) * rowsPerPage) + (index + 1),
      }
    }
    proxyWithoutResponse(searchStaxAnalytics, {data: btoa(JSON.stringify(searchClickObj))});
  }

  const displayResults = facetValue ? filteredResults : results;

  return (
    <div className='Basic'>
      <HomeHeader/>
      <div className='text-center'>
        {title && <div className='page-title'>{title}</div>}
        {description && <div className='text'>{description}</div>}
      </div>
      <div className="search-container">
        <div className='text-center'>
          <h1>Search results:</h1>
        </div>
        <div className='text-right'>
          <h3>Total: {facetValue ? filteredResultsTotal : resultsTotal}</h3>
        </div>
        <div className='result-container'>
          <div className='result-filter-container'>
            <h3>Filter:</h3>
            {facets && (
              <ul style={{listStyleType: 'none', padding: 0}} className="facet-list">
                {Object.entries(facets).map(([key, value]) => (
                  <div key={key} style={{marginBottom: '10px'}}>
                    <label style={{display: 'flex', alignItems: 'center'}}>
                      <input className='result-filter-radio'
                             type="radio"
                             name="facet"
                             value={key}
                             onChange={() => handleFacetClick(key)}
                             checked={facetValue === key}
                      />
                      {key} ({value})
                    </label>
                  </div>
                ))}
              </ul>
            )}
            {facetValue && (
              <button onClick={handleResetFilter} style={{marginTop: '10px'}}>
                Reset Filter
              </button>
            )}
          </div>
          <div className='search-result-container'>
            {displayResults.length > 0
              ? displayResults.map((item, index) => {
                const {id, title_t, content_t, uri} = item;
                return (
                  <div key={id} className='search-result'>
                    <A href={uri} className='search-result-title' onClick={() => handleSearchResultOnClick(item, index)}>
                      {title_t}
                    </A>
                    <div className='search-result-content'>{truncateText(content_t, 200)}</div>
                  </div>
                );
              })
              : <div>
                Did you mean:
                {suggestions.map((suggestion, index) => (
                  <span key={index}>
                    <A href={`/search?searchValue=${encodeURIComponent(suggestion.word)}`}>{suggestion.word}</A>
                      {index !== suggestions.length - 1 && ', '}
                    </span>
                ))}
              </div>}
          </div>
        </div>
        <div className='pagination'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
            <span style={{margin: '0 10px'}}>
                Page {currentPage} of {totalPages}
              </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className='rows-per-page'>
            <span style={{marginRight: '10px'}}>Rows per page:</span>
            {resultRows.map((rows) => (
              <button
                key={rows}
                onClick={() => handleRowsPerPageChange(rows)}
                disabled={rowsPerPage === rows}
              >
                {rows}
              </button>
            ))}
          </div>
      </div>
    </div>
  );
}

export default Search;
