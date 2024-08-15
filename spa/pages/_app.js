// import '../styles/grid.css';
// import '../styles/globals.css';
// import '../styles/desktop.css';
import '../styles/homepage.css';
import '../styles/custom.css';
import '../styles/library.css'
import '../styles/ai12zsearch.css';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Footer from '../templates/components/Footer';

const MyApp = ({ Component, pageProps }) => {
  // const [fontSelection, setFontSelection] = useState('Default');
  // const [highContrastMode, setHighContrastMode] = useState('false');

  useEffect(() => {
    // Add class to <html> element
    document.documentElement.classList.add('supports-js');

    const savedFont = Cookies.get('a11y-settings-font');
    if (savedFont) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        * {
          font-family: "${savedFont}", -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
      `;
      const container = document.querySelector('.css-override-container');
      if (container) {
        container.innerHTML = '';
        if (savedFont !== 'Default') {
          container.appendChild(styleElement);
        }
      }
    }

    const theme = Cookies.get('a11y-settings-high-contrast-mode');

    if (theme === 'true') {
      document.body.classList.add('high-contrast-mode');
    } else if (theme === 'Night Mode') {
      document.body.classList.add('night-mode');
    }
    return () => {
      document.documentElement.classList.remove('supports-js');
    };
  }, []); // Empty array means this runs only on mount and unmount

  return <React.Fragment>
          <div className="css-override-container"></div>
          <Component {...pageProps} />
          <Footer />
        </React.Fragment>;
};
export default MyApp;
