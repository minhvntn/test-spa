import { useEffect, useState } from 'react';
import React from 'react';
import { get, getImageUrl } from '../../utils';
import { baseUrl } from '../../utils/config';

function Event(props) {
  const [event, setEvent] = useState(0);

  useEffect(() => {
    const eventId = props.event;
    get(baseUrl + '/.rest/events/?@jcr:uuid=' + eventId).then((events) => {
      setEvent(events?.results[0]);
    });
  }, []);

  const { name, abstract, description, location, image, startDate = '' } = event;
  const style = {};

  if (image) style.backgroundImage = `url(${getImageUrl(image)})`;

  return (
    <div className='Story'>
      <div className='wrapper'>
        <div className='Story__visual cover' style={style}>
          <div className='Banner__inner wrapper text-center'>
            <div className='Banner__title '>{name}</div>
            <div className='Banner__subtitle'>{abstract}</div>
          </div>
        </div>
        <div className='Story__split'>
          <div>
            <div className='Story__splitLabel'>TIME</div>
            <div>{startDate ? new Intl.DateTimeFormat('en-GB').format(new Date(startDate)) : ''}</div>
            <div className='Story__splitLabel'>LOCATION</div>
            <div>{location}</div>
          </div>
          <div>
            <div
              className='Story__splitRichText Story__splitRichText__noPaddingBottom'
              dangerouslySetInnerHTML={{
                __html: description?.length > 150 ? description?.substring(0, 200) + '...' : description,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
