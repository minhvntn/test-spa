import Link from 'next/link';
import Image from 'next/image';
import FooterLogo from '../../images/icare-logo-white.png';
const Footer = () => {
  return (
    <footer className="global-footer" role="contentinfo">
      <div className="l-padding">
        <h2 className="vh">Site footer</h2>
        <nav>
          <ul className="nav-footer has-4-items">
            <li>
              <Link href="/">
                <a>
                  <Image
                    className="nm-dont-invert"
                    src={FooterLogo}
                    width="120"
                    height="35"
                    alt="Home - icare logo in white"
                    aria-label="Home - icare logo in white"
                  />
                </a>
              </Link>
            </li>
            <li>
              <ul>
                <li>
                  <Link href="/news-and-stories">
                    <a title="View all of icare's news and stories">News &amp; stories</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about-us">
                    <a title="Read icare's story and see how we've grown">About us</a>
                  </Link>
                </li>
                <li>
                  <a
                    title="Careers"
                    href="https://careers.icare.nsw.gov.au/home?utm_source=footer&amp;utm_medium=referral&amp;utm_content=footerlink"
                    className="external-link-icon"
                  >
                    Careers <span className="vh">(external link)</span>
                  </a>
                </li>
                <li>
                  <Link href="/contact-us">
                    <a title="View ways to contact icare">Contact us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/icare-coronavirus-information">
                    <a title="Information on icare's coronavirus (COVID-19) response and changes to our services">COVID-19 response</a>
                  </Link>
                </li>
                <li>
                  <Link href="/crisis-support">
                    <a title="Crisis support information for icare customers">Crisis support</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us/feedback-and-complaints">
                    <a title="Contact icare to make a complaint">Complaints</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about-us/improvement-at-icare">
                    <a title="Improvement at icare">Improvement at icare</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>
                  <Link href="/disclaimer">
                    <a title="website content is provided for information purposes only, read more about our website disclaimer">Disclaimer</a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <a title="This page outlines the privacy policy that applies to all publicly accessible pages.">Privacy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/our-legislative-framework">
                    <a title="View a list of all relevant state legislation that guides our work">Law &amp; policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/access-to-information">
                    <a title="How we provide information under the Government information (public access) Act 2009.">Access to information</a>
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility-statement">
                    <a title="Accessibility statement">Accessibility statement</a>
                  </Link>
                </li>
                <li>
                  <Link href="/copyright">
                    <a title="Copyright of all materials on this website, unless stated, is vested in the state of NSW through icare, find out how these materials can be used.">Copyright</a>
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap/sitemap">
                    <a title="View the site map of www.icare.nsw.gov.au ">Sitemap</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-footer-social link-icons-disabled">
              <h3>Follow us</h3>
              <ul>
                <li>
                  <a
                    aria-label="Follow us on LinkedIn (external link)"
                    href="https://www.linkedin.com/company/insurance-and-care-nsw/"
                    target="_blank"
                    title="Follow us on LinkedIn"
                    className="external-link-icon"
                  >
                    <span className="social-icon linkedin" data-grunticon-embed=""></span>
                    <span className="vh">(external link)</span>
                  </a>
                </li>
                <li>
                  <a
                    aria-label="Follow us on Youtube (external link)"
                    href="https://www.youtube.com/channel/UCEEja9i9uXGNXope5Ymq4Ww"
                    target="_blank"
                    title="Follow us on Youtube"
                    className="external-link-icon"
                  >
                    <span className="social-icon youtube" data-grunticon-embed=""></span>
                    <span className="vh">(external link)</span>
                  </a>
                </li>
                <li>
                  <a
                    aria-label=""
                    href="http://www.facebook.com/icarensw/"
                    target="_blank"
                    title="Like us on Facebook"
                    className="external-link-icon"
                  >
                    <span className="social-icon facebook" data-grunticon-embed=""></span>
                    <span className="vh">(external link)</span>
                  </a>
                </li>
                <li>
                  <a
                    aria-label="Follow us on Twitter (external link)"
                    href="http://www.twitter.com/icareNSW"
                    target="_blank"
                    title="Tweet us on Twitter"
                    className="external-link-icon"
                  >
                    <span className="social-icon twitter" data-grunticon-embed=""></span>
                    <span className="vh">(external link)</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-copyright">
        <div className="l-padding">
          <p>© insurance &amp; care NSW 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;