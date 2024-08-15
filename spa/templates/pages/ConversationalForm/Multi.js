import React, { useState } from 'react';
import Img from '../../../components/Img';
import { toggle } from '../../../utils';

function Multi(props) {
  const { id, answerOptions, handleAnswersChange } = props;
  const [values, setValues] = useState([]);

  return (
    <>
      {answerOptions.map((item, i) => {
        const { label, value, image } = item;

        return (
          <div
            className='ConversationalForm__option'
            key={id + '-' + i}
            onClick={(e) => {
              const target = e.target;

              if (target.nodeName === 'IMG') {
                e.target.parentElement.classList.toggle('checked');
              } else {
                target.classList.toggle('checked');
              }

              setValues((prev) => toggle(prev, value));
            }}
          >
            <Img className='ConversationalForm__optionImage' image={image} />
            {label}
          </div>
        );
      })}
      <div
        className='ConversationalForm__next'
        onClick={() => {
          handleAnswersChange(id, values);
        }}
      >
        &#8594;
      </div>
    </>
  );
}

export default Multi;
