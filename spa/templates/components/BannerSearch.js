import { useContext } from 'react';
import MagnoliaContext from '../../utils/MagnoliaContext';
import Image from 'next/image';
import SearchEnabled from '../../images/icon-enabled-search.png';
import SearchDisabled from '../../images/icon-disabled-search.png';

const BannerSearch = () => {
  const magnoliaContext = useContext(MagnoliaContext);
  let bannerSearch = 'banner-search';
  if (magnoliaContext.isMagnoliaEdit) bannerSearch += ' isMgnlEdit';

  const handleOpenSearch = (e) => {
    const globalSearch = document.querySelector('.global-search');
    if (globalSearch) {
      globalSearch.classList.add('is-ready', 'is-active');
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div id="banner-search" className={bannerSearch} role="search">
      <div className="search-container l-padding">
        <div className="hero-serach-headding">
          <span className="search-box-headding">How can we help?</span>
        </div>
        <form id="search-form-submit" onClick={handleSubmit} noValidate method="#" action="#">
          <div id="search-input" className="search-input">
            <div id="search-input-box" className="search-input-box">
              <input
                id="banner-search-input"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                name="q"
                tabIndex="0"
                type="text"
                spellCheck="false"
                placeholder="Search icare"
                aria-label="Search"
                role="combobox"
                aria-haspopup="false"
                aria-autocomplete="list"
                dir="ltr"
                className="input-searchbox Tab"
                data-popover-id="global-search"
                required
                minLength="1"
                onClick={handleOpenSearch}
              />
            </div>
            <div className="search-button-container Tab" tabIndex="0">
              <button
                id="search-icon-legacy"
                className="search-button"
                aria-label="Search"
                data-popover-id="global-search"
                tabIndex="-1"
                onClick={handleOpenSearch}
              >
                <Image
                  className="image active-input hide-image"
                  src={SearchEnabled}
                  alt="Enabled Search Icon"
                />
                <Image
                  className="image disabled-input show-image"
                  src={SearchDisabled}
                  alt="Disabled Search Icon"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerSearch;