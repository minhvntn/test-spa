import { useEffect, useState } from 'react';
import React from 'react';
import { get, getImageUrl } from '../../utils';
import { baseUrl } from '../../utils/config';

function Story(props) {
  const [story, setStory] = useState(0);

  useEffect(() => {
    const storyId = props.story;
    get(baseUrl + '/.rest/story/?@jcr:uuid=' + storyId).then((stories) => {
      setStory(stories?.results[0]);
    });
  }, []);

  const { title, lead, imagesource, author, created = '' } = story;
  const style = {};

  if (imagesource) style.backgroundImage = `url(${getImageUrl(imagesource)})`;

  return (
    <div className='Story'>
      <div className='wrapper'>
        <div className='Story__visual cover' style={style}>
          <div className='Banner__inner wrapper text-center'>
            <div className='Banner__title '>{title}</div>
            <div className='Banner__subtitle'>{lead}</div>
          </div>
        </div>
        <div className='Story__info'>
          <div className='Story__author'>{author}</div>
          <div className='Story__created'>{created ? new Intl.DateTimeFormat('en-GB').format(new Date(created)) : ''}</div>
        </div>
      </div>
    </div>
  );
}

export default Story;
