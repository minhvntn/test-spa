import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { proxy } from '../../utils';
import { bsiApiCrossSelling } from '../../utils/config';

function CrossSelling(props) {
  const [product, setProduct] = useState();

  useEffect(() => {
    const bsiCustomerNo = localStorage.getItem('bsiCustomerNo');

    async function getBsiCustomer() {
      const crossSellingProduct = await proxy(bsiApiCrossSelling, { customerNo: bsiCustomerNo });

      setProduct(() =>
        props.products?.['@nodes']
          .map((key) => props.products[key])
          .find((item) => item.category === crossSellingProduct.product || item.category === 'fallback')
      );
    }

    getBsiCustomer();
  }, []);

  return product && <Card {...product} />;
}

export default CrossSelling;
