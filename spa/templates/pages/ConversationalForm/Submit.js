import React, { useEffect, useState } from 'react';
import { id, replace } from '../../../utils';
import { formsApi, insuranceClaimsPostApi, i18n } from '../../../utils/config';
import Card from '../../components/Card';

const submits = {
  claim: function (props) {
    const { answers, questions } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    const name = id();
    const properties = [];

    const getType = (questionType) => {
      const types = {
        date: 'Date',
        boolean: 'Boolean',
      };
      return types[questionType] || 'String';
    };

    properties.push({ name: 'status', type: 'String', multiple: false, values: ['new'] });
    if (name) properties.push({ name: 'name', type: 'String', multiple: false, values: [name] });

    for (let question of questions) {
      const answer = answers[question.id];
      if (answer || typeof answer === 'boolean') {
        let property = {
          name: question.title || question.id,
          type: getType(question.questionType),
          multiple: false,
          values: [answer],
        };
        properties.push(property);
      }
    }

    if (user.id) {
      properties.push({ name: 'userNumber', type: 'String', multiple: false, values: [user.id] });
      properties.push({ name: 'bsiCustomerNo', type: 'String', multiple: false, values: [user.bsiCustomerNo] });

      fetch(insuranceClaimsPostApi, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          path: '/' + name,
          type: 'claim',
          properties,
        }),
      });
    }
  },
  quote: function () {
    alert('✉️ quote submitted!');
  },
  default: function (props) {
    const { formId, answers } = props;

    const payload = Object.keys(answers).reduce((acc, questionId) => {
      const value = answers[questionId];
      if (Array.isArray(value)) {
        value.forEach((item) => acc.push({ questionId, value: item }));
      } else {
        acc.push({ questionId, value });
      }
      return acc;
    }, []);

    fetch(formsApi + '/' + formId, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },
};

function Submit(props) {
  const { answers } = props;
  const { submit, submitRecommendations } = props.content || {};
  const [submitText, setSubmitText] = useState(props.content?.submitText);
  const recommendations = submitRecommendations ? JSON.parse(submitRecommendations) : null;

  useEffect(() => {
    submits[submit || 'default'](props);
  }, []);

  useEffect(() => {
    if (submitText) {
      setSubmitText(replace(submitText, { firstName: answers?.firstName }));
    }
  }, [answers, submitText]);

  return (
    <div className='fll-width'>
      <div className='ConversationalForm__submit' dangerouslySetInnerHTML={{ __html: submitText || i18n.thankYou }} />
      {recommendations && (
        <div className='ConversationalForm__recommendations'>
          <div className='row'>
            {recommendations.map((recom, i) => {
              return (
                <div key={i} className='col-4'>
                  <Card title={recom.title} text={recom.text} cta={{ href: recom.cta_link, label: recom.cta_label }} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Submit);
