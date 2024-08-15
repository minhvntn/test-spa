import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { HomeHeader } from './Home';

function Setting(props) {
  const { title, description, main } = props;
  const [fontSelection, setFontSelection] = useState('Default');
  const [highContrastMode, setHighContrastMode] = useState(Cookies.get('a11y-settings-high-contrast-mode') || 'false');
  const [isSettingsSaved, setIsSettingsSaved] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryType = params.get("querytype") ? params.get("querytype").toLowerCase() : '';
    if (queryType !== '' && (queryType === 'feedback' || queryType === 'complaint')) {
      const mainElement = document.querySelector("#main");
      let innerHtml = mainElement.innerHTML;
      let caseNumber = params.get("caseNumber") || '';
      if (isNaN(caseNumber) || caseNumber.length > 12) {
        caseNumber = '';
      }
      const replacedHtml = innerHtml.replaceAll("$querytype", params.get("querytype")).replace('$caseNumber', caseNumber);
      mainElement.innerHTML = replacedHtml;
    }
  }, []);

  useEffect(() => {
    const savedFont = Cookies.get('a11y-settings-font');
    if (savedFont) {
      setFontSelection(savedFont);
    }
    if (highContrastMode === 'true') {
      document.body.classList.add('high-contrast-mode');
    } else if (highContrastMode === 'Night Mode') {
      document.body.classList.add('night-mode');
    }
  }, []);

  const handleChangeFontSelection = (value) => {
    setFontSelection(value);
    setIsSubmitDisabled(false);
    setIsResetDisabled(false);
  };

  const handleChangeHighContrastMode = (value) => {
    setHighContrastMode(value);
    setIsResetDisabled(false);
    setIsSubmitDisabled(false);
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();

    handleChangeFontSelection(fontSelection);
    handleChangeHighContrastMode(highContrastMode);

    document.body.classList.remove('high-contrast-mode');
    document.body.classList.remove('night-mode');

    if (highContrastMode === 'true') {
      document.body.classList.add('high-contrast-mode');
    } else if (highContrastMode === 'Night Mode') {
      document.body.classList.add('night-mode');
    }
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      * {
        font-family: "${fontSelection}", -apple-system, BlinkMacSystemFont, sans-serif !important;
      }
    `;
    const container = document.querySelector('.css-override-container');
    if (container) {
      container.innerHTML = '';
      if (fontSelection !== 'Default') {
        container.appendChild(styleElement);
      }
    }

    setIsSubmitDisabled(true);

    Cookies.set('a11y-settings-font', fontSelection, { expires: 365 });
    Cookies.set('a11y-settings-high-contrast-mode', highContrastMode, { expires: 365 });
    // Show success message
    setIsSettingsSaved(true);

  };

  const handleResetSettings = () => {
    setFontSelection('Default');
    setHighContrastMode('false');
    Cookies.remove('a11y-settings-font');
    Cookies.remove('a11y-settings-high-contrast-mode');
    setIsResetDisabled(true);
    setIsSettingsSaved(true);
    document.body.classList.remove('high-contrast-mode');
    document.body.classList.remove('night-mode');
    const container = document.querySelector('.css-override-container');
    if (container) {
      container.innerHTML = '';
    }
    // alert('Your settings have been reset.');
  };

  return (
    <React.Fragment>
      <HomeHeader />
      <div className="l-layout l-two-column-left cf">
      <div className="l-content-container l-padding cf">
        <article className="l-content-column">
          <main id="main" tabIndex="-1" role="main" className="l-main">
            <header className="content-header">
              <h1 aria-hidden="true">Accessibility settings</h1>
              <p className="intro">
                This page allows you to adapt our website to suit your needs. The settings you choose on this page will
                be saved for future visits. Should you wish to return to the standard settings, use the "Reset" button.
              </p>
            </header>

            <div className="cm cm-rich-text is-medium"></div>

            <form className="a11y-settings-form" onSubmit={handleSaveSettings}>
              <h2 className="h3">Choose your preferences</h2>
              <div className="ctrl-holder width-l">
                <label htmlFor="font_selection">Change the font</label>
                <div className="ctrl">
                  <select name="font_selection" id="font_selection"
                    value={fontSelection}
                    onChange={(e) => handleChangeFontSelection(e.target.value)}
                  >
                    <option value="Default">icare Default</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Arial">Arial</option>
                    <option value="System Default">Computer Default</option>
                    <option value="Open Dyslexic">Open Dyslexic</option>
                  </select>
                  <div className="status-msg"></div>
                </div>
              </div>

              <div className="ctrl-holder">
                <span className="label" id="idHigh_contrast_mode">High contrast</span>
                <div className="ctrl">
                  <fieldset>
                    <legend>
                      <span className="vh">Choose your preferences</span>
                    </legend>
                    <ul className="options" role="radiogroup" aria-labelledby="idHigh_contrast_mode">
                      <li className="option">
                        <input
                          id="high_contrast_mode-0"
                          aria-labelledby="labelHigh_contrast_mode_0"
                          name="high_contrast_mode"
                          value="true"
                          className="radio-button vh"
                          type="radio"
                          aria-required="true"
                          checked={highContrastMode === 'true'}
                          onChange={(e) => handleChangeHighContrastMode(e.target.value)}
                        />
                        <label htmlFor="high_contrast_mode-0" id="labelHigh_contrast_mode_0">Turn on</label>
                      </li>
                      <li className="option">
                        <input
                          id="high_contrast_mode-1"
                          aria-labelledby="labelHigh_contrast_mode_1"
                          name="high_contrast_mode"
                          value="false"
                          className="radio-button vh"
                          type="radio"
                          aria-required="true"
                          checked={highContrastMode === 'false'}
                          onChange={(e) => handleChangeHighContrastMode(e.target.value)}
                        />
                        <label htmlFor="high_contrast_mode-1" id="labelHigh_contrast_mode_1">Turn off</label>
                      </li>
                      <li className="option">
                        <input
                          id="high_contrast_mode-2"
                          aria-labelledby="labelHigh_contrast_mode_2"
                          name="high_contrast_mode"
                          value="Night Mode"
                          className="radio-button vh"
                          type="radio"
                          aria-required="true"
                          checked={highContrastMode === 'Night Mode'}
                          onChange={(e) => handleChangeHighContrastMode(e.target.value)}
                        />
                        <label htmlFor="high_contrast_mode-2" id="labelHigh_contrast_mode_2">Night mode</label>
                      </li>
                    </ul>
                  </fieldset>
                  <section className="grouped-highlight" style={{ marginTop: '-20px' }}>
                    <div>
                      Night mode makes text easier to read by inverting site colours. <br />
                      This feature does not work in Internet Explorer. This tool may distort some elements of icare's
                      website.
                    </div>
                  </section>
                  <div className="status-msg"></div>
                </div>
              </div>

              <div className={`form-summary is-success change-success-message no-margin-bottom ${
                  isSettingsSaved ? '' : 'hidden'
                }`} aria-live="polite">
                <p>Your settings have been saved.</p>
              </div>

              <div className="cta-container">
                <button type="submit" 
                className="cta js-submit-a11y-settings"
                  disabled={isSubmitDisabled}
                >Save settings</button>
                <button type="button" 
                  className="cta is-secondary js-reset-a11y-settings"
                  disabled={isResetDisabled}
                  onClick={handleResetSettings}
                >Reset settings</button>
              </div>
            </form>
          </main>

          <aside role="complementary" className="l-complementary">
            <section className="cm cm-cta-module is-theme-purple is-medium">
              <a href="https://www.icare.nsw.gov.au/accessibility-statement" className="cm-image-block-link">
                <div className="content">
                  <h3>Accessibility statement</h3>
                  <p>
                    Find out more about our accessibility features, shortcuts, and commitment to accessibility of our
                    publications.
                  </p>
                  <span className="faux-link">
                    <span className="vh">Read more</span>
                  </span>
                </div>
              </a>
            </section>
          </aside>
        </article>
      </div>
    </div>
    </React.Fragment>
    
  );
}

export default Setting;
