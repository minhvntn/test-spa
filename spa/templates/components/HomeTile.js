import { EditableArea, EditableComponent } from '@magnolia/react-editor';
import { useEffect, useState, useContext } from 'react';
import MagnoliaContext from '../../utils/MagnoliaContext';

function HomeTile (props) {
  const magnoliaContext = useContext(MagnoliaContext);
  const { card } =  props;

  let homeTitleWrapper = 'home-tile-wrapper';
  if (magnoliaContext.isMagnoliaEdit) homeTitleWrapper += ' isMgnlEdit'

  return (
    <section className="breakout-area all-category-home-tile-wrapper">
      <div className="cm cm-campaign-module cta-tile-wrapper l-padding is-large">
        {card && <EditableArea className={homeTitleWrapper} content={card} />} 
      </div>
    </section>
  );
}

export default HomeTile;


