import { EditableArea } from '@magnolia/react-editor';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { HomeHeader } from './Home';

function PremiumCalculator(props) {
  const { title, description, main } = props;

  const [contactMe, setContactMe] = useState(false);
  const [contactMethod, setContactMethod] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const handleContactMeChange = (value) => {
    setContactMe(value === 'Yes');
  };

  const handleContactMethodChange = (e) => {
    setContactMethod(e.target.value);
  };

  const handleContactDetailsChange = (e) => {
    setContactDetails(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className='PremiumCalculator'>
      <HomeHeader />
      <div className='l-layout l-one-column cf'>
        <div className='l-content-container l-padding cf'>
          <article className='l-content-column'>
            <main id="main" tabIndex="-1" role="main" className='l-main'>
              <div className="sl">
                <div className="sl-list has-2-items has-feature-left">
                  <div className="sl-item">
                    <header className="content-header">
                      <h1>HBCF premium calculator</h1>
                      <p className="intro">Homeowners and builders can use our calculator to estimate the premium they will need to pay for a residential building project</p>
                    </header>
                    <div className="cm-rich-text is-medium">
                      <p>Our premium calculator can give you an estimated cost of the total insurance premium payable for your residential building project.</p>
                      <p>This includes base premium, GST, and stamp duty. All applications are processed through insurance brokers and are subject to additional fees for service, see Distributor fee schedule table below.</p>
                      <p>Note the icare <a href="/builders-and-homeowners/builders-and-distributors/eligibility/eligibility-guidelines">HBCF Eligibility Manual</a> is the primary reference when processing applications.</p>
                    </div>
                  </div>
                  <div className="sl-item">
                    <section className="cm cm-cta-module is-theme-purple">
                      <a href="https://www.icare.nsw.gov.au/builders-and-homeowners/homeowners/what-we-do" className="cm-image-block-link" target="_blank" rel="noopener noreferrer">
                        <div className="content">
                          <h3>How we care for homeowners</h3>
                          <p>Make sure you're covered</p>
                          <span className="faux-link"><span className="vh">Read more</span></span>
                        </div>
                      </a>
                    </section>
                  </div>
                </div>
              </div>
              
              {main && <EditableArea content={main} />}

            </main>
          </article>
        </div>
      </div>
    </div>
  );
}

export default PremiumCalculator;
