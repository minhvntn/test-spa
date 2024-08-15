import React, { useState, useEffect, useRef, useContext } from 'react';
import { get, clone, toggle } from '../../utils';
import { formsApi } from '../../utils/config';
import MagnoliaContext from '../../utils/MagnoliaContext';

function Text(props) {
  const { handleAnswersChange } = props;
  const inputTextEl = useRef();

  return <input ref={inputTextEl} className='Form__text' onChange={handleAnswersChange} />;
}

function Options(props) {
  const { id, answerOptions, handleAnswersChange } = props;

  return (
    <div className='Form__options'>
      {answerOptions.map((item, i) => {
        const { label, value } = item;

        return (
          <div className='Form__option' key={id + '-' + i} onClick={handleAnswersChange} data-value={value}>
            {label}
          </div>
        );
      })}
    </div>
  );
}

function Range(props) {
  const { rangeFrom, rangeFromLabel, rangeTo, rangeToLabel, handleAnswersChange } = props;
  const rangeValueEl = useRef();
  const min = rangeFromLabel || rangeFrom;
  const max = rangeToLabel || rangeTo;

  return (
    <div className='Form__range'>
      {min ? <div className='range-min'>{min}</div> : ''}
      <input
        type='range'
        min={rangeFrom}
        max={rangeTo}
        data-value=''
        onInput={(e) => {
          handleAnswersChange(e);
          rangeValueEl.current.textContent = e.target.value;
        }}
      />
      {max ? <div className='range-max'>{max}</div> : ''}
      <div ref={rangeValueEl} className='range-value'>
        -
      </div>
    </div>
  );
}

function Form(props) {
  const { formId, submitText } = props;
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState();
  const magnoliaContext = useContext(MagnoliaContext);

  useEffect(() => {
    async function getForm() {
      const formJson = await get(formsApi + '/' + formId + magnoliaContext.search);

      const { questions } = formJson;

      if (questions?.length > 0) {
        const newQuestions = questions.sort((a, b) => a.orderIndex - b.orderIndex);

        setQuestions(newQuestions);
      }
    }

    if (formId) getForm();
  }, []);

  function handleAnswersChange(id, value) {
    setAnswers((prev) => {
      let newAnswers = clone(prev);

      newAnswers[id] = value;

      return newAnswers;
    });
  }

  return (
    <form
      className='Form'
      onSubmit={(e) => {
        e.preventDefault();
        setShowResults(true);
      }}
    >
      {showResults ? (
        <>
          {Object.keys(answers).map((key, i) => {
            const question = questions?.find((item) => item.id == key);
            const value = Array.isArray(answers[key]) ? answers[key].join(', ') : answers[key];

            return (
              <div key={formId + 'result' + i}>
                <span className='Form__questionTitle'>{question.title}</span> {value}
              </div>
            );
          })}
        </>
      ) : (
        <>
          {questions?.map((question) => {
            const { id, questionType, title } = question;

            return (
              <React.Fragment key={formId + 'question' + id}>
                {title && <div className='Form__questionTitle'>{title}</div>}
                {questionType === 'text' && (
                  <Text
                    {...question}
                    handleAnswersChange={function (e) {
                      handleAnswersChange(id, e.target.value);
                    }}
                  />
                )}
                {questionType === 'range' && (
                  <Range
                    {...question}
                    handleAnswersChange={function (e) {
                      handleAnswersChange(id, e.target.value);
                    }}
                  />
                )}
                {questionType === 'single' && (
                  <Options
                    {...question}
                    handleAnswersChange={function (e) {
                      const target = e.target;
                      const parentElementChildren = target.parentElement.children;

                      for (let i = 0; i < parentElementChildren.length; i++) {
                        const element = parentElementChildren[i];

                        element.classList.remove('checked');
                      }

                      target.classList.add('checked');
                      handleAnswersChange(id, target.dataset.value);
                    }}
                  />
                )}
                {questionType === 'multi' && (
                  <Options
                    {...question}
                    handleAnswersChange={function (e) {
                      const target = e.target;

                      target.classList.toggle('checked');
                      handleAnswersChange(id, toggle(answers[id], target.dataset.value));
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
          <button className='btn-blue-full'>{submitText}</button>
        </>
      )}
    </form>
  );
}

export default Form;
