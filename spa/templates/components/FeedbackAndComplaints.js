import React from 'react';
import Image from 'next/image';
import FamilySunnyDay from '../../images/Family-sunny-day_2880x1062.webp';

const FeedbackAndComplaints = () => (
  <div className="l-content-container l-padding cf no-spaces">
    <div className="l-content-column">
      <main id="main" tabIndex="-1" role="main" className="l-main">
        <section className="breakout-area">
          {/* START Campaign Module */}
          <section className="cm cm-campaign-module is-large">
            <div className="sl">
              <div className="sl-list has-2-items">
                <div className="sl-item">
                  <div className="campaign-primary">
                    <h2 className="campaign-primary-heading">Feedback and complaints</h2>
                    <p>Your feedback provides us with an opportunity to improve the experience we provide to you and others, now and in the future.</p>
                    <a
                      className="cta is-secondary"
                      title="Learn more about feedback and complaints"
                      href="/contact-us/raise-a-complaint"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
                <div className="sl-item">
                  <a className="cm-image-block-link" href="/employer-lookup" target="">
                    <div className="campaign-secondary">
                      <h2 className="campaign-secondary-heading">Employer Lookup</h2>
                      <p>Need confirmation of your Workers Insurance policy? Use our Employer Lookup tool for instant confirmation of cover.</p>
                    </div>
                  </a>
                  <a className="cm-image-block-link" href="/about-us/statistics/icare-workers-insurance-performance-data" target="">
                    <div className="campaign-secondary">
                      <h2 className="campaign-secondary-heading">icare Workers Insurance performance data</h2>
                      <p>We publish a range of data, including COVID-19 claims, to provide transparency into the performance of the workers compensation scheme in NSW.</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* END Campaign Module */}
        </section>

        {/* START Story Module */}
        <section className="cm cm-story-module para is-large">
          <div className="sl">
            <div className="sl-list has-2-items" data-height-type="sl-list-has-2-items">
              <div className="sl-item">
                <div className="content-paralympic">
                  <h2 className="story-title">Paralympian Speakers Program</h2>
                  <div className="parent-left-image">
                    <Image
                      src={FamilySunnyDay}
                      alt=""
                      className="paralympic-left-image"
                    />
                  </div>
                  <span className="paralympic-text">
                    Raise awareness of workplace and road safety with Paralympian Speakers—free of charge.
                  </span>
                  <br />
                  <a className="cta" title="Paralympian Speakers Program" href="/icare-speakers-program">
                    Find out more
                  </a>
                </div>
              </div>
              <div className="sl-item paralympic-right">
                <div className="paralympic-right-section">
                  <div>
                    <Image
                      src={FamilySunnyDay}
                      alt=""
                      className="paralympic-right-image"
                    />
                  </div>
                  <div className="paralympic-multi-text">
                    <div className="paralympic-headline">Mental health resources</div>
                    <p>We have a range of resources to help employers, workers and industry support mentally-healthy workplaces.</p>
                    <p>
                      <a href="/employers/employer-obligations/injury-prevention/mental-health-resources">
                        <span className="faux-link">Find out more</span>
                      </a>
                    </p>
                  </div>
                </div>
                <hr className="paralympic-separation" />
                <div className="paralympic-right-section">
                  <div>
                    <Image
                      src={FamilySunnyDay}
                      alt=""
                      className="paralympic-right-image"
                    />
                  </div>
                  <div className="paralympic-multi-text">
                    <div className="paralympic-headline">Return to work programs</div>
                    <p>Understand your obligations and improve return to work outcomes.</p>
                    <p>
                      <a href="/employers/employer-obligations/return-to-work-programs/return-to-work-assistance" className="faux-link">
                        Find out more
                      </a>
                    </p>
                  </div>
                </div>
                <hr className="paralympic-separation" />
                <div className="paralympic-right-section">
                  <div>
                    <Image
                      src={FamilySunnyDay}
                      alt=""
                      className="paralympic-right-image"
                    />
                  </div>
                  <div className="paralympic-multi-text">
                    <div className="paralympic-headline">Employer, broker and industry events</div>
                    <p>Join our Mobile Engagement team for the latest updates about icare and the NSW workers compensation scheme.</p>
                    <p>
                      <a href="/employers/events-and-awards/mobile-engagement-team-events" className="faux-link">
                        Find out more
                      </a>
                    </p>
                  </div>
                </div>
                <hr className="paralympic-separation" />
              </div>
            </div>
          </div>
        </section>
        {/* END Story Module */}

        {/* Add reCAPTCHA logic here if necessary */}
        <section className="cm cm-floating-form close is-small" id="main-feedback">
          <div className="overlay-for-feedbackwidget" style={{ display: 'none' }}></div>
          <div className="js-tabs tabs-container" data-tabs-at="l">
            <div className="tabs-nav">
              <ul role="tablist">
                <li role="presentation">
                  <button
                    id="tabbutton-your-feedback"
                    role="tab"
                    aria-controls="your-feedback"
                    aria-selected="true"
                  >
                    <span className="tab-label">
                      <strong>Your</strong> feedback
                    </span>
                  </button>
                </li>
                <li role="presentation">
                  <button
                    id="tabbutton-give-complement"
                    role="tab"
                    aria-controls="give-complement"
                    aria-selected="false"
                  >
                    <span className="tab-label">
                      <img
                        src="https://www.icare.nsw.gov.au/-/media/icare/global-media/images/feedback-assist/svgs/icon-feedback-updated.svg"
                        alt="feedback icon active"
                      />
                    </span>
                  </button>
                </li>
                <li role="presentation">
                  <button
                    id="tabbutton-make-complain"
                    role="tab"
                    aria-controls="make-complain"
                    aria-selected="false"
                  >
                    <span className="tab-label">
                      <img
                        src="https://www.icare.nsw.gov.au/-/media/icare/global-media/images/feedback-assist/svgs/icon-complaint.svg"
                        alt="complaint icon"
                      />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="tabs">
              {/* Tab Content */}
              {/* Your feedback tab */}
              <div
                id="your-feedback"
                className="tab is-disabled your-feedback-btn is-active"
                role="tabpanel"
                aria-labelledby="tabbutton-your-feedback"
                aria-hidden="false"
                tabIndex="0"
              >
                <div id="your-feedback-ec" data-ec-at="1,m" data-ec-group="your-feedback"></div>
              </div>

              {/* Give a compliment tab */}
              <div
                id="give-complement"
                data-value="feedback"
                className="tab is-hidden"
                role="tabpanel"
                aria-labelledby="tabbutton-give-complement"
                aria-hidden="true"
                tabIndex="0"
                style={{ opacity: 0 }}
              >
                {/* Content for 'Give a compliment' */}
                {/* Omitted for brevity */}
              </div>

              {/* Make a complaint tab */}
              <div
                id="make-complain"
                data-value="complaint"
                className="tab is-hidden"
                role="tabpanel"
                aria-labelledby="tabbutton-make-complain"
                aria-hidden="true"
                tabIndex="0"
                style={{ opacity: 0 }}
              >
                {/* Content for 'Make a complaint' */}
                {/* Omitted for brevity */}
              </div>
            </div>
          </div>
        </section>
        <script>onload();</script>
        {/* Include reCAPTCHA script here */}
      </main>
    </div>
  </div>
);

export default FeedbackAndComplaints;