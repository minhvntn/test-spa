import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { useEffect, useState, useContext } from 'react';
import MagnoliaContext from '../../utils/MagnoliaContext';

function ConnectWithUs (props) {
  const magnoliaContext = useContext(MagnoliaContext);
  const { title, item, item1 } =  props;

  let cls = 'home-tile-wrapper';
  if (magnoliaContext.isMagnoliaEdit) cls += ' isMgnlEdit'

  return (
    <div className="content-hero has-alt-bg">
      <div className="l-padding">
        <div className="cm cm-story-module para is-large">
          <div className="sl">
            <div className="social-media-component">
              <div>
                <h1>{title||'Connect with us'}</h1>
              </div>
              <div className='socail-media-sections'>
                {item && <EditableArea className={'first-section'} content={item} />}
                {item1 && <EditableArea className={'second-section'} content={item1} />} 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ConnectWithUs;


