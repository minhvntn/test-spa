import { EditableComponent } from '@magnolia/react-editor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Img from '../../components/Img';
import React, { useContext, useEffect, useRef, useState } from 'react';
import NavSub from '../../components/navSubMenu';
import SearchIcon from '../../components/SearchIcon';
import { baseUrl } from '../../utils/config';
import GlobalSearch from '../../components/SearchBox';
import MagnoliaContext from '../../utils/MagnoliaContext';
import { languageLabels } from '../../utils/config';
import Image from 'next/future/image';
import LoginIcon from '../../images/Login-icon.png';

function Header({content}) {
  const { logo, nav } = content;
  const [navItems, setNavItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();
  const magnoliaContext = useContext(MagnoliaContext);
  const headerRef = useRef(null);
  const dropdownRef = useRef(null);
  const handleScroll = () => {
    if (headerRef.current) {
      const parentEl = headerRef.current.parentElement;
      const nextSibling = parentEl ? parentEl.nextElementSibling : null;
      if (window.scrollY > 0) {
        nextSibling.style.marginTop = `111px`;
        headerRef.current.classList.add('is-sticky');
      } else {
        nextSibling.style.marginTop = '0px';
        headerRef.current.classList.remove('is-sticky')
      }
    }
  };

  useEffect(() => {
    const debounceHandleScroll = () => {
      handleScroll();
    };

    window.addEventListener('scroll', debounceHandleScroll);
    return () => {
      window.removeEventListener('scroll', debounceHandleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    async function fetchNav() {
      if (nav) {
        const url = baseUrl + `/.rest/navigations?@jcr:uuid=${nav}`;
        const response = await fetch(url);
        const json = await response.json();
        const data = json.results[0];
        
        const menuData = data['@nodes'].map((nodeName) => {
          const menuNode = data[nodeName];

          if (!menuNode['@nodes']) return menuNode;

          // // Map child nodes to create sub-menu
          // const subMenu = menuNode['@nodes'].map((nodeChild) => menuNode[nodeChild]);

          // // Add sub-menu to the menuNode
          // menuNode.subMenu = subMenu;

          return menuNode;
        });
        setNavItems(menuData)
      }
    }
    
    fetchNav();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Click event handler function
  const handleClick = (event) => {
    event.preventDefault();
    const parent = event.target.parentElement;
    const nav = parent.closest('.nav');
    const allNavItem = nav.querySelectorAll('.nav-item');
   
    if (!parent.classList.contains('is-nav-active')) {
      allNavItem.forEach(node => {
        node.classList.remove('is-nav-active');
      });
      parent.classList.add('is-nav-active');
    } else {
      parent.classList.remove('is-nav-active');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(prevState => !prevState);
  };
  const handleLanguageChange = (language) => {
    router.push(language === 'en' ? '/' : '/' + language);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  return (
    <header ref={headerRef} className={`global-header global-header-full-width`}>
      <div className="l-padding">
        <div className="logo">
          {logo && (
            <a href='/'>
              <Img image={logo} />
            </a>
          )}
          
        </div>
        <ul className='header-links'>
          {content['@nodes'].map((nodeName) => (
            <li key={content[nodeName]['@id']} data-test="123">
              <EditableComponent content={{ ...content[nodeName] }} />
            </li>
          ))}
          
          <li className="multilingual-ui-panel">
            <button 
              type="button" 
              className="js-languages-button" 
              onClick={toggleDropdown}
            >
              <span>Languages</span>
            </button>
            <div 
              ref={dropdownRef}
              className={`js-multilingual-panel-dropdown multilingual-panel-dropdown ${
                isDropdownVisible ? '' : 'is-hidden'
              }`}
            >
              <div className="notranslate js-multilingual-panel-dropdown-list multilingual-panel-dropdown-list">
                {languageLabels.map((language, index) => (
                  <button
                    className={`${magnoliaContext.currentLanguage == language.value ? 'is-selected' : ''} language-option notranslate`}
                    key={index}
                    value={language.value}
                    onClick={() => handleLanguageChange(language.value)}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>
          </li>
          <li>
            <Link href="/accessibility-settings">Accessibility</Link>
          </li>
        </ul>
        <button className="link-icon search-toggle js-popover-toggle is-theme-blue" type="button" role="button" aria-label="Toggle search" data-popover-id="global-search">
        <span 
          className="icon svg-search-white"
          focusable="false"
          aria-hidden="true"
          style={{ backgroundImage: 'none' }}
        >
          <SearchIcon />
          </span>
        </button>

        <button className="cta login is-theme-blue" type="button" aria-label="Click to open the Login menu" aria-controls="login-options" aria-expanded="false">
          <Image 
            src={LoginIcon} 
            className="imgBack"
            width="19" 
            height="26" 
            alt="" 
            layout="raw" 
          />
          
          <span>Login</span>
        </button>
        <div className="overlay-for-nav"></div>
        <div id="login-options login-slide" className="login-options" role="region" aria-describedby="login-description" aria-hidden="true" tabIndex="-1">
          <p id="login-description" className="vh" tabIndex="-1">Login Menu Opened</p>
          <div className="login-top-link-section">
              <a className="login-top-link" href="/" target="_blank">Login</a>
              <button className="login-top-close-btn" />
          </div>
          <ul>
            
          </ul>
              
        </div>
      </div>

      {/* nav */}
      {navItems ?
        <nav id="nav" className='nav-onscreen js-onscreen primary-nav'>
          <ul className='nav'>
            {navItems.map((navItem, index) => (
              <li className='nav-item has-children' key={index}>
                <a className='nav-lvl1' role='button' aria-expanded="false" href={'#'} onClick={(e) => handleClick(e)}>{navItem.name}</a>
                <NavSub />
              </li>
            ))}
          </ul>
        </nav>
      : 
        ''
      }
      <GlobalSearch />
    </header>
  )
}

export default Header