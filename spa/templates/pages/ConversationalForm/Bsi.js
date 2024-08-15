import { useState, useEffect } from 'react';
import { proxy } from '../../../utils';
import { bsiApiUser } from '../../../utils/config';

function Bsi(props) {
  const { id, answerOptions, handleAnswersChange } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const bsiCustomerNo = localStorage.getItem('bsiCustomerNo');

    async function getBsiCustomer() {
      const user = await proxy(bsiApiUser, {
        customerNo: bsiCustomerNo,
      });

      if (user.notes) {
        // setProducts(answerOptions.filter((option) => user.notes.includes(option.value)));
        setProducts(user.notes.split(',').filter(Boolean));
      }
    }

    getBsiCustomer();
  }, []);

  return (
    <>
      {products.map((item, i) => {
        return (
          <div
            className='ConversationalForm__option'
            key={id + '-' + i}
            onClick={(e) => {
              e.target.classList.toggle('checked');
              handleAnswersChange(id, item);
            }}
          >
            {item}
          </div>
        );
      })}
    </>
  );
}

export default Bsi;
