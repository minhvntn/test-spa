import React from 'react';

const NewsAndStories = () => (
  <section className="content-hero has-alt-bg">
    <div className="l-padding">
      <h2>News and stories</h2>
      <a className="cta is-secondary" href="/news-and-stories">See all news</a>

      <div className="sl">
        <div className="sl-list has-3-items has-feature-left">
          <div className="sl-item">
            {/* START Featured Content */}
            <section className="cm cm-featured-content-module is-medium">
              <a
                href="https://www.icare.nsw.gov.au/news-and-stories/2024/icare-welcomes-two-new-paralympians-to-the-paralympic-speakers-program"
                className="cm-image-block-link external-link-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="module-background"
                  style={{ backgroundImage: "url('/Home page featured story.webp')" }}
                ></div>
                <div className="content">
                  <p className="subheading subheading-news">
                    <strong className="content-type">Information</strong>
                    <span className="subtitle">28 Jun</span>
                  </p>
                  <h3>icare welcomes two new Paralympians to the Paralympic Speakers Program</h3>
                  <p>Clint Pickin and David Hall join the program</p>
                  <span className="faux-link">Read more</span>
                </div>
                <span className="vh">(external link)</span>
              </a>
            </section>
            {/* END Featured Content */}
          </div>

          <div className="sl-item">
            <section className="cm cm-content-tile">
              <a
                href="/news-and-stories/2024/icare-supports-australian-first-physiotherapy-guidelines-for-spinal-cord-injury"
                className="cm-image-block-link"
                target="_self"
              >
                <div className="content">
                  <p className="subheading subheading-news">
                    <strong className="content-type">Information</strong>
                    <span className="subtitle">22 Feb</span>
                  </p>
                  <h3>icare supports Australian First Physiotherapy Guidelines for Spinal Cord Injury</h3>
                  <p>
                    A spinal cord injury (SCI) impacts many areas of a person’s life, including their physical ability. Support from a physiotherapist is important in improving one’s recovery and quality of life.
                  </p>
                  <span className="faux-link">Read more</span>
                </div>
              </a>
            </section>
          </div>

          <div className="sl-item">
            <section className="cm cm-content-tile">
              <a
                href="/news-and-stories/2024/icare-supports-the-oz-day-10k-wheelchair-race"
                className="cm-image-block-link"
                target="_self"
              >
                <div className="content">
                  <p className="subheading subheading-news">
                    <strong className="content-type">News</strong>
                    <span className="subtitle">30 Jan</span>
                  </p>
                  <h3>icare supports the Oz Day 10K wheelchair race</h3>
                  <p>
                    Athletes and their supporters gathered at The Rocks on Australia Day to cheer on competitors taking part in one of the world’s best wheelchair races.
                  </p>
                  <span className="faux-link">Read more</span>
                </div>
              </a>
            </section>
          </div>
        </div>
      </div>
      
    </div>
  </section>
);

export default NewsAndStories;