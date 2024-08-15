function Footer() {
  let date = new Date();

  return (
    <footer>
      <div className='row'>
        <div className='row-responsive'>
          <div className='col-4'>
            <img
              className='footer-logo'
              src='https://www.magnolia-cms.com/.resources/demo-corporate/webresources/img/magnolia-logo.svg'
              alt='Magnolia Headless CMS'
            />
          </div>
          <div className='col-8'>
            <div className='row-responsive'>
              <div className='col-3'>
                <b>Switzerland HQ</b>
                <div>
                  +41 61 228 90 00 / <a href='mailto:contact@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' })}
                </div>
              </div>
              <div className='col-3'>
                <b>United States</b>
                <div>
                  +1 212 739 0834 / <a href='mailto:contact-us@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' })}
                </div>
              </div>
              <div className='col-3'>
                <b>United Kingdom</b>
                <div>
                  + 44 203 741 8083 / <a href='mailto:contact-uk@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })}
                </div>
              </div>
              <div className='col-3'>
                <b>Spain</b>
                <div>
                  +34 91 579 85 82 / <a href='mailto:contact-es@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })}
                </div>
              </div>
            </div>
            <div className='row-responsive'>
              <div className='col-3'>
                <b>Czech Republic</b>
                <div>
                  <a href='https://www.magnolia-cms.com/about/contact.html#offices'>More information</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' })}
                </div>
              </div>
              <div className='col-3'>
                <b>Singapore</b>
                <div>
                  <a href='https://api.whatsapp.com/send?phone=6588026237' target='_blank' rel='noreferrer'>
                    WhatsApp
                  </a>
                  &nbsp;/&nbsp;
                  <a href='mailto:contact-apac@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Singapore' })}
                </div>
              </div>
              <div className='col-3'>
                <b>China</b>
                <div>
                  <a
                    href='https://www.magnolia-cms.com/.imaging/default/dam/general/social-icons/WeChat_QR.jpeg/jcr:content.jpeg'
                    target='_blank'
                    rel='noreferrer'
                  >
                    WeChat
                  </a>
                  &nbsp;/&nbsp;
                  <a href='mailto:contact-apac@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'PRC' })}
                </div>
              </div>
              <div className='col-3'>
                <b>Hong Kong</b>
                <div>
                  <a href='https://api.whatsapp.com/send?phone=6588026237' target='_blank' rel='noreferrer'>
                    WhatsApp
                  </a>
                  &nbsp;/&nbsp;
                  <a href='mailto:contact-apac@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Hong_Kong' })}
                </div>
              </div>
            </div>
            <div className='row-responsive'>
              <div className='col-3'>
                <b>Vietnam</b>
                <div>+84 28 38 10 64 65</div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' })}
                </div>
              </div>
              <div className='col-3'>
                <b>Thailand</b>
                <div>
                  <a href='https://api.whatsapp.com/send?phone=6588026237' target='_blank' rel='noreferrer'>
                    WhatsApp
                  </a>
                  &nbsp;/&nbsp;
                  <a href='mailto:contact-apac@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Bangkok' })}
                </div>
              </div>
              <div className='col-3'>
                <b>Indonesia</b>
                <div>
                  <a href='https://api.whatsapp.com/send?phone=6588026237' target='_blank' rel='noreferrer'>
                    WhatsApp
                  </a>
                  &nbsp;/&nbsp;
                  <a href='mailto:contact-apac@magnolia-cms.com'>e-mail</a>
                </div>
                <div className='time'>
                  {date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })}
                </div>
              </div>
              <div className='col-3'></div>
            </div>
          </div>
        </div>
        <div className='copy'>
          <p>
            Magnolia is the world’s leading composable digital experience platform (DXP). Enterprise brands choose
            Magnolia because of its open and flexible headless architecture, combined with the ease of use for both
            developers and marketers.
          </p>
          <p>1997-2022 © Magnolia International Ltd. Some rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
