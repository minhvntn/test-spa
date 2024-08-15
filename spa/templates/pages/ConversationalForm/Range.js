import React, { useRef } from 'react';
import Img from '../../../components/Img';

function Range(props) {
  const { id, rangeFrom, rangeFromLabel, rangeFromImage, rangeTo, rangeToLabel, rangeToImage, handleAnswersChange } =
    props;
  const inputRangeEl = useRef();
  const inputOutputEl = useRef();

  return (
    <>
      <div className='ConversationalForm__rangeLabel'>
        <Img image={rangeFromImage} />
        <div>{rangeFromLabel || rangeFrom}</div>
      </div>
      <input
        ref={inputRangeEl}
        className='ConversationalForm__range'
        type='range'
        min={rangeFrom}
        max={rangeTo}
        onInput={function (e) {
          if (inputOutputEl.current) inputOutputEl.current.value = e.target.value;
        }}
      />
      <div className='ConversationalForm__rangeLabel'>
        <Img image={rangeToImage} />
        <div>{rangeToLabel || rangeTo}</div>
      </div>
      <output ref={inputOutputEl} className='ConversationalForm__rangeOutput' />
      <div
        className='ConversationalForm__next'
        onClick={() => {
          const value = inputRangeEl.current?.value;
          const newInputRangeEl = document.createElement('div');

          newInputRangeEl.className = 'ConversationalForm__text checked';
          newInputRangeEl.textContent = value;

          handleAnswersChange(id, value);
          inputRangeEl.current?.replaceWith(newInputRangeEl);
        }}
      >
        &#8594;
      </div>
    </>
  );
}

export default Range;
