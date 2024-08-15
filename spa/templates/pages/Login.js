import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { HomeHeader } from './Home';
import { get, proxy } from '../../utils';
import { i18n, insuranceUsersApi, insuranceUsersPostApi, bsiApiUser, bsiApiCrossSelling } from '../../utils/config';
import { useRouter } from 'next/router';

function Login(props) {
  const { title, description } = props;
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputs.username && inputs.password) {
      const response = await get(
        insuranceUsersApi + '?name="' + inputs.username + '"&password="' + inputs.password + '"'
      );

      if (response.results.length > 0) {
        const result = response.results[0];
        const { name, firstName, lastName, email, products = [] } = result;
        let user = {
          id: result['@id'],
          name,
          firstName,
          products,
        };

        // Create bsi user
        const bsiCustomerNo = localStorage.getItem('bsiCustomerNo') || result['@id'];
        const bsiRes = await proxy(bsiApiUser, {
          customerNo: bsiCustomerNo,
          firstName,
          lastName,
          email,
          notes: products.map((item) => item['@name']).join(','),
        });

        if (bsiRes.customerNo) {
          // Update user saved in Magnolia with BSI customer no
          fetch(insuranceUsersPostApi + '/' + name, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              properties: [{ name: 'bsiCustomerNo', type: 'String', multiple: false, values: [bsiRes.customerNo] }],
            }),
          });

          user.bsiCustomerNo = bsiRes.customerNo;
          localStorage.setItem('bsiCustomerNo', bsiRes.customerNo);

          // Get product recommendation from BSI
          const crossSellingProduct = await proxy(bsiApiCrossSelling, { customerNo: bsiRes.customerNo });

          Cookies.set('crossSellingProduct', crossSellingProduct.product);
        }

        localStorage.setItem('user', JSON.stringify(user));
        router.push(router.query.returnUrl || '/');
      } else {
        setErrors({ login: i18n.loginError });
      }
    } else {
      const newErrors = {
        username: inputs.username ? null : i18n.nameRequired,
        password: inputs.password ? null : i18n.passRequired,
      };
      setErrors(newErrors);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
    if (errors[name]) {
      setErrors((prevState) => ({ ...prevState, [name]: null }));
    }
    if (errors.login) {
      setErrors((prevState) => ({ ...prevState, login: null }));
    }
  };

  return (
    <div>
      <HomeHeader />
      <div className='text-center'>
        {title && <div className='page-title'>{title}</div>}
        {description && <div className='text'>{description}</div>}
      </div>
      <div className='box-small'>
        <form onSubmit={handleSubmit}>
          <label>{i18n.name}</label>
          {errors.username && <div className='error'>{errors.username}</div>}
          <input
            name='username'
            type='text'
            autoComplete='username'
            value={inputs.username || ''}
            onChange={handleChange}
          />
          <label>{i18n.pass}</label>
          {errors.password && <div className='error'>{errors.password}</div>}
          <input
            name='password'
            type='password'
            autoComplete='current-password'
            value={inputs.password || ''}
            onChange={handleChange}
          />
          <div className='error'>{errors.login}</div>
          <button type='submit' className='btn-blue-full'>
            {i18n.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
