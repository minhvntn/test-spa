
import Img from '../../components/Img';
import Image from 'next/image';
import ArrowIcon from '../../images/arrow.png';
function HomeTileCard (content) {
  const { title, link, image } = content;
  let href = link?.linkType === 'external' ? link?.external : link?.internal;
  return (
    <a 
      className="cm-home-tile faux-link Tab" 
      tabIndex="0" 
      href={href ? href : '#'}
      target="_blank" 
      rel="noopener noreferrer"
  >
      <div className="tab-content" tabIndex="-1">
          <Img image={image}/>
          <div className="main-tile-headding">
              <h2 className="tile-headding">{title}</h2>
          </div>
          <div className="home-tile-link">
              <span>  
                  <Image 
                      alt="arrow icon" 
                      className="imageArrow" 
                      src={ArrowIcon}
                  />
              </span>
          </div>
      </div>
  </a>  
  )
}

export default HomeTileCard;

