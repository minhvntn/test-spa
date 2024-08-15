import React, { useEffect, useRef } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

function Location(props) {
  const { id, handleAnswersChange } = props;
  const inputTextEl = useRef();

  function handleNext() {
    const value = inputTextEl.current?.firstChild?.value;
    const newInputTextEl = document.createElement('div');

    newInputTextEl.className = 'ConversationalForm__text checked';
    newInputTextEl.textContent = value;

    handleAnswersChange(id, value);
    inputTextEl.current?.replaceWith(newInputTextEl);
  }

  useEffect(() => {
    new GeocoderAutocomplete(document.getElementById('autocomplete'), process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY);

    inputTextEl.current?.firstChild?.focus();
  }, []);

  return (
    <>
      <div ref={inputTextEl} id='autocomplete' className='autocomplete-container' />
      <div className='ConversationalForm__next' onClick={handleNext}>
        &#8594;
      </div>
    </>
  );
}

export default Location;
