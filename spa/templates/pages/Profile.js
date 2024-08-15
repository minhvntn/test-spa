import React, { useEffect, useState, useContext } from 'react';
import { HomeHeader } from './Home';
import { get, post } from '../../utils';
import { i18n, insuranceUsersApi, insuranceUsersPostApi } from '../../utils/config';
import MagnoliaContext from '../../utils/MagnoliaContext';

function Profile(props) {
  const { title, description, fields, checkboxes, editable } = props;
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [inputs, setInputs] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const magnoliaContext = useContext(MagnoliaContext);
  const isEditable = editable.field === 'true';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    setUser(storedUser);
  }, []);

  useEffect(() => {
    async function getInvoices() {
      const data = await get(insuranceUsersApi + magnoliaContext.search + '&@jcr:uuid=' + user.id);

      setUserData(data.results[0]);
    }

    if (user) getInvoices();
  }, [user]);

  const isBoolean = (val) => 'boolean' === typeof val;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!editable.securedSubmit || (editable.securedSubmit && currentPassword === userData.password)) {
      const url = insuranceUsersPostApi + userData['@path'];
      const data = { properties: [] };

      for (const key in inputs) {
        const value = inputs[key];
        const type = isBoolean(value) ? 'Boolean' : 'String';
        let property = {
          name: key,
          type: type,
          values: [value],
        };

        data.properties.push(property);
      }

      if (data.properties.length > 0) {
        const res = await post(url, data);

        if (res) {
          setIsUpdated(true);
        } else {
          setSubmitError(i18n.profileError);
        }
      } else {
        setSubmitError(i18n.profileNoData);
      }
    } else {
      const errorMessage = !currentPassword ? i18n.passRequired : i18n.passError;

      setSubmitError(errorMessage);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value ? event.target.value : event.target.checked;

    setIsUpdated(false);
    setCurrentPassword(null);
    setSubmitError(null);
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const renderField = (field, type) => {
    let value = userData[field];

    if (Array.isArray(value)) {
      value = value.map((val) => val['@name']);
    }

    return (
      <div key={field}>
        <label>{field}</label>
        <input
          name={field}
          type={type || (field === 'password' ? field : 'text')}
          autoComplete={field}
          value={inputs[field] || value}
          defaultChecked={type === 'checkbox' && value}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </div>
    );
  };

  return (
    <>
      <HomeHeader />
      <div className='box'>
        <div className='text-center'>
          {title && <div className='page-title'>{title}</div>}
          {description && <div className='text'>{description}</div>}
        </div>
        <form onSubmit={handleSubmit}>
          {userData && (
            <div>
              {fields && fields.map((field) => renderField(field))}
              {checkboxes && checkboxes.map((checkbox) => renderField(checkbox, 'checkbox'))}
            </div>
          )}
          {editable.securedSubmit && (
            <div key='currentPassword'>
              <label>{i18n.pass}</label>
              <input
                name='currentPassword'
                type='password'
                autoComplete='password'
                value={currentPassword || ''}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                  setSubmitError(null);
                }}
                placeholder={i18n.profilePassInfo}
              />
            </div>
          )}
          {submitError && <div className='error'>{submitError}</div>}
          {isEditable && (
            <button type='submit' className='btn-blue-full'>
              {i18n.submit}
            </button>
          )}
          {isUpdated && <div>{editable.confirmation ? editable.confirmation : i18n.profileSuccess}</div>}
        </form>
      </div>
    </>
  );
}

export default Profile;
