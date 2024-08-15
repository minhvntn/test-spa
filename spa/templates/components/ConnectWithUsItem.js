
import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import Link from 'next/link';

function ConnectWithUsItem (props) {
    const { title, url, width, height } = props;
  return (
    <>
        <div><h3>{title}</h3></div>
        <div className="social-content">
            <iframe src={url} height={height?height:'960'} width={width?width:'504'} frameBorder="0" allowFullScreen="" title="Embedded post"
             style={{ border: 'none', overflow: 'hidden' }}
             scrolling="no"
             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            
            ></iframe>
        </div>
    </>
    
  )
}

export default ConnectWithUsItem;

