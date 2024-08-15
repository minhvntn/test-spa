import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { useEffect, useState, useContext } from 'react';
import MagnoliaContext from '../../utils/MagnoliaContext';

function HomeLongColumn (props) {
  const magnoliaContext = useContext(MagnoliaContext);
  const { card, card1 } =  props;

  let cls = 'col-2';
  if (magnoliaContext.isMagnoliaEdit) cls += ' isMgnlEdit'

  return (
    <div className="breakout-area cta-long-wrapper">
      <div className="cta-long-section l-padding">

        {card && <EditableArea className={cls} content={card} />} 
        {card1 && <EditableArea className={cls} content={card1} />} 
      </div>
    </div>
  );
}

export default HomeLongColumn;


