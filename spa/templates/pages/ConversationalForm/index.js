import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { HomeHeader } from '../Home';
import Img from '../../../components/Img';
import Text from './Text';
import Multi from './Multi';
import Range from './Range';
import Single from './Single';
import Date from './Date';
import Bsi from './Bsi';
import Submit from './Submit';
import { get, clone, replace } from '../../../utils';
import { formsApi } from '../../../utils/config';
import MagnoliaContext from '../../../utils/MagnoliaContext';

const Location = dynamic(() => import('./Location'), { ssr: false });
let replaceData = {};

function ConversationalForm(props) {
  const { formId, json } = props;
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState({});
  const [rules, setRules] = useState();
  const [conversation, setConversation] = useState([]);
  const bottomRefEl = useRef();
  const magnoliaContext = useContext(MagnoliaContext);

  useEffect(() => {
    bottomRefEl.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    function saveForm(formJson) {
      const { questions, sections, rules } = formJson;
      let allQuestions = [];

      if (questions?.length > 0) allQuestions = allQuestions.concat(questions);

      if (sections?.length > 0) {
        sections.forEach((section) => {
          if (section.questions?.length > 0) {
            allQuestions = allQuestions.concat(section.questions);
          }
        });
      }

      if (allQuestions?.length > 0) {
        allQuestions.sort((a, b) => a.orderIndex - b.orderIndex);
        setQuestions(allQuestions);
        setConversation([allQuestions[0].id]);
      }

      if (rules?.length > 0) setRules(rules);

      setForm(formJson);
    }

    async function getForm() {
      const formJson = await get(formsApi + '/' + formId + magnoliaContext.search);

      saveForm(formJson);
    }

    if (json) {
      saveForm(JSON.parse(json));
    } else if (formId) getForm();

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      replaceData.firstName = user.firstName;
    }
  }, []);

  function handleAnswersChange(id, value) {
    const questionRules = rules?.filter((item) => item.questionId === id);
    const questionIndex = questions.findIndex((item) => item.id === id);

    let newActive;
    if (questionRules?.length > 0) {
      questionRules.some((item) => {
        const itemValue = !isNaN(item.value) ? +item.value : item.value;
        const convertedValue = !isNaN(value) ? +value : value;

        if (
          (item.symbol === '=' && convertedValue === itemValue) ||
          (item.symbol === '>' && convertedValue > itemValue) ||
          (item.symbol === '<' && convertedValue < itemValue) ||
          (item.symbol === '>=' && convertedValue >= itemValue) ||
          (item.symbol === '<=' && convertedValue <= itemValue) ||
          item.symbol === '*'
        ) {
          newActive = item.jumpTo;
        }

        if (newActive === 'submit') newActive = -1;

        return newActive;
      });
    }

    if (!newActive) {
      if (questionIndex + 1 === questions.length) {
        newActive = -1;
      } else {
        newActive = questions[questionIndex + 1].id;
      }
    }

    setConversation((prev) => {
      const newConversation = clone(prev);

      newConversation.push(newActive);

      return newConversation;
    });

    setAnswers((prev) => {
      let newAnswers = clone(prev);

      newAnswers[id] = value;

      return newAnswers;
    });
  }

  const { title, description, image } = form;

  return (
    <>
      <HomeHeader />
      <div className='ConversationalForm'>
        <div className='ConversationalForm__info'>
          {image?.["@link"] && <Img className='ConversationalForm__infoImage' image={image}/>}
          {title && <div className='ConversationalForm__infoTitle'>{title}</div>}
          {description && (
            <div className='ConversationalForm__infoDescription'>{replace(description, replaceData)}</div>
          )}
        </div>
        {questions &&
          conversation.map((id, i, arr) => {
            const key = 'form' + i;

            if (id < 0) return <Submit key={key} {...form} formId={formId} answers={answers} />;

            const activeQuestion = questions.find((item) => item.id === id);
            const { questionType, title, question, image } = activeQuestion;

            return (
              <React.Fragment key={key}>
                <div className='ConversationalForm__question'>
                  <Img className='ConversationalForm__questionImage' image={image} />
                  <div>
                    {title && <div className='ConversationalForm__questionTitle'>{title}</div>}
                    {question && <>{question}</>}
                  </div>
                </div>
                <div className='ConversationalForm__answer' disabled={arr.length - 1 !== i}>
                  {questionType === 'text' && <Text {...activeQuestion} handleAnswersChange={handleAnswersChange} />}

                  {questionType === 'multi' && <Multi {...activeQuestion} handleAnswersChange={handleAnswersChange} />}
                  {questionType === 'range' && <Range {...activeQuestion} handleAnswersChange={handleAnswersChange} />}
                  {questionType === 'single' && (
                    <Single {...activeQuestion} handleAnswersChange={handleAnswersChange} />
                  )}
                  {questionType === 'date' && <Date {...activeQuestion} handleAnswersChange={handleAnswersChange} />}
                  {questionType === 'location' && (
                    <Location {...activeQuestion} handleAnswersChange={handleAnswersChange} />
                  )}
                  {questionType === 'bsi' && <Bsi {...activeQuestion} handleAnswersChange={handleAnswersChange} />}
                  {questionType === 'boolean' && (
                    <Single
                      {...{...activeQuestion, ...{answerOptions: [{label: 'Yes', value: true}, {label: 'No', value:false}]}}}
                      handleAnswersChange={handleAnswersChange}
                    />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        <div ref={bottomRefEl} />
      </div>
    </>
  );
}

export default ConversationalForm;
