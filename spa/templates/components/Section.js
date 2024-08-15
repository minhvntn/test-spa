import CTA from '../../components/CTA';
import { EditableArea } from '@magnolia/react-editor';
import Img from '../../components/Img';
import MagnoliaContext from '../../utils/MagnoliaContext';
import { useContext } from 'react';

function Section(props) {
  const { supTitle, title, text, gradient, section, topImage, cta, fullWidth } = props;
  let sectionClassName = 'Section';
  let rowClassName = fullWidth ? 'row-responsive' : 'row';

  if (gradient) sectionClassName += ' box';

  return (
    <section className={sectionClassName}>
      <div className={rowClassName}>
        <div className='col-12'>
          <div className='text-center'>
            {supTitle && <div className='supTitle'>{supTitle}</div>}
            {title && <div className='title'>{title}</div>}
            {text && <div className='text'>{text}</div>}
          </div>
          <Img className='Section__image' image={topImage} />
          {section && <EditableArea content={section} />}
        </div>
      </div>

      {cta && (
        <div className='Section__cta'>
          <CTA className='btn-blue' cta={cta} />
        </div>
      )}
    </section>
  );
}

export default Section;
