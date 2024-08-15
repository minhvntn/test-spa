
import Image from 'next/image';
import ArrowIcon from '../../images/arrow.png';
function HomeLongCard (content) {
  const { title, link } = content;
  let href = link?.linkType === 'external' ? link?.external : link?.internal;
  return (
    <a 
      className="faux-link Tab cta-long-redirection cta-long" 
      href={href ? href : '#'}
      target="_blank" 
      tabIndex="0"
    >
      <div tabIndex="-1">
        <div className="cta-content-headding">
          <span className="tile-headding">
            {title}
          </span>
        </div>
        <div className="cta-link">
          <div className="cta-image">
            <Image 
              src={ArrowIcon}
              alt="arrow icon" 
              className="imageArrow" 
            />
          </div>
        </div>
      </div>
    </a>
   
  )
}

export default HomeLongCard;

