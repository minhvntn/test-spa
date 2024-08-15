import { EditableArea } from '@magnolia/react-editor';
import { HomeHeader } from './Home';

function Basic(props) {
  const { title, description, main } = props;

  return (
    <div className='Basic'>
      <HomeHeader />
      <div className='text-center'>
        {title && <div className='page-title'>{title}</div>}
        {description && <div className='text'>{description}</div>}
      </div>
      {main && <EditableArea  content={main} />}
    </div>
  );
}

export default Basic;
