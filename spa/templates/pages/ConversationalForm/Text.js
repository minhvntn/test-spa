import React, { useEffect, useRef } from 'react';

function Text(props) {
  const { id, handleAnswersChange } = props;
  const inputTextEl = useRef();

  function handleNext() {
    const value = inputTextEl.current?.value;
    const newInputTextEl = document.createElement('div');

    newInputTextEl.className = 'ConversationalForm__text checked';
    newInputTextEl.textContent = value;

    handleAnswersChange(id, value);
    inputTextEl.current?.replaceWith(newInputTextEl);
  }

  useEffect(() => {
    inputTextEl.current?.focus();

    function handleKeyup(e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        handleNext();
      }
    }

    inputTextEl.current?.addEventListener('keyup', handleKeyup);

    return () => {
      inputTextEl.current?.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return (
    <>
      <input ref={inputTextEl} type='text' className='ConversationalForm__text' />
      <div className='ConversationalForm__next' onClick={handleNext}>
        &#8594;
      </div>
    </>
  );
}

export default Text;
