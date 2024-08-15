import Img from '../../components/Img';
import A from '../../components/A';
import { i18n } from '../../utils/config';

function BusinessCard(props) {
  const { title, fullName, text, image, email } = props;

  return (
    <div className='Card-wrapper'>
      <div className='Card'>
        <Img className='Card__image' image={image} />
        <div className='Card__info'>
          {title && <div className='BusinessCard__title'>{title}</div>}
          {fullName && <div className='supTitle'>{fullName}</div>}
          {text && <div className='text' dangerouslySetInnerHTML={{ __html: text }} />}
          {email && (
            <a className='btn-blue' href={'mailto:' + email}>
              {i18n.contact}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
