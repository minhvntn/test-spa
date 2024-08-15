
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import Link from 'next/link';

function HomeLongTitle (props) {
    const { title } = props;
    
  return (
    <div className="cta-coloumn-headding">
        <h2>{title}</h2>
    </div>
  )
}

export default HomeLongTitle;

