import { EditableArea } from '@magnolia/react-editor';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { homeHeaderApi } from '../../utils/config';

import MagnoliaContext from '../../utils/MagnoliaContext';
import { get } from '../../utils';
import Header from '../components/Header';

export const HomeHeader = React.memo(function HomeHeader({ portal = false }) {
  const [header, setHeader] = useState();
  const magnoliaContext = useContext(MagnoliaContext);

  useEffect(() => {
    async function getHeader() {
      const json = await get(homeHeaderApi + magnoliaContext.search);
      if (!json.error) setHeader(json);
    }

    getHeader();
  }, []);

  return header ? <EditableArea content={header} customView={() => Header({ content: header })} /> : null;
});


function Home(props) {
  const { header, main } = props;
  return (
    <div className='Home'>
      {header && <EditableArea content={header} customView={Header} />}
      
      {/* {header && <EditableArea content={header} customView={renderHomeHeader} />} */}
      {main && <EditableArea className={`skip-to-main`} content={main} />}
    </div>
  );
}

export default Home;
