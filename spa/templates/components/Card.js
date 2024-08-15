import CTA, { getUrl } from '../../components/CTA';

import A from '../../components/A';
import Img from '../../components/Img';
import PostCategories from '../../components/PostCategories';

const ConditionalWrapper = ({ ctaUrl, children }) => {
  return ctaUrl ? (
    <A className='Card-wrapper' href={ctaUrl}>
      {children}
    </A>
  ) : (
    <div className='Card-wrapper'>{children}</div>
  );
};

function Card(props) {
  const { supTitle, title, text, image, cta, created, categories, transparentBg } = props;
  const ctaUrl = getUrl(cta);

  let cardClassName = 'Card';

  if (transparentBg) cardClassName += ' transparent';

  return (
    <ConditionalWrapper ctaUrl={ctaUrl}>
      <div className='Card-wrapper'>
        <div className={cardClassName}>
          <div>
            <Img className='Card__image' image={image} />
            {categories && (
              <div className='Card__categories'>
                <PostCategories categories={categories} />
              </div>
            )}
          </div>
          <div className='Card__info'>
            {created ? <div>{new Date(created).toLocaleDateString('en-GB')}</div> : null}
            {supTitle && <div className='supTitle'>{supTitle}</div>}
            {title && <div className='title'>{title}</div>}
            {text && <div className='text' dangerouslySetInnerHTML={{ __html: text }} />}
            {ctaUrl && (
              <div className='btn-blue' href={ctaUrl}>
                {cta.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </ConditionalWrapper>
  );
}

export default Card;
