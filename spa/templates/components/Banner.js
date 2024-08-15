import Img from '../../components/Img';
import CTA from '../../components/CTA';

function Banner(props) {
  const { title, body, image } = props;

  return (
    <div className="hero-banner-container">
      <section className="hero-banner-section">
        <div className="l-padding show-on-full-width">
          <div className="content">
            <h2 className="hero-banner-heading">{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: body }} />

          </div>
          <div className="image-container">
            <div className="gradient-image"></div>
            <Img className='image' image={image} />
            <span className="vh"></span>
          </div>
        </div>
        <div className="l-padding show-on-mobile">
          <div className="image-container">
            <div className="gradient-image"></div>
            <Img className='image' image={image} />
            <span className="vh"></span>
          </div>
          <div className="content">
            <h2 className="hero-banner-heading">{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: body }} />

          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
