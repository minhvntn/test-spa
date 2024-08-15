import { useContext } from 'react';
import Link from 'next/link';
import { spaRootNodePath } from '../utils/config';
import MagnoliaContext from '../utils/MagnoliaContext';

function A(props) {
  const { className, href, label, children, searchParams } = props;
  const magnoliaContext = useContext(MagnoliaContext);
  const isFallbackLocale = magnoliaContext.currentLanguage === 'en';
  let pathname = href.replace(new RegExp('(.*' + spaRootNodePath + '|.html|/$)', 'g'), '');

  if (isFallbackLocale) {
    pathname = pathname.replace('/de', '');
  } else {
    if (!pathname.includes('/de')) pathname = '/de' + pathname;
  }

  const [finalPathName, queryParams] = pathname.split('?');

  // Create a URLSearchParams instance
  const params = new URLSearchParams(queryParams);

  // Use reduce to build the query parameters object
  const finalQueryParams = Array.from(params.entries()).reduce((acc, [key, value]) => {
    // Check if the key already exists in the accumulator object
    if (acc[key]) {
      // If the key exists, convert it to an array and push the new value
      if (Array.isArray(acc[key])) {
        acc[key].push(value);
      } else {
        acc[key] = [acc[key], value];
      }
    } else {
      // Otherwise, add the key-value pair to the accumulator object
      acc[key] = value;
    }
    return acc;
  }, {});

  return (
    <Link
      href={{
        pathname: finalPathName,
        query: Object.assign(finalQueryParams, magnoliaContext.isMagnolia ? magnoliaContext.searchParams : null, searchParams),
      }}
    >
      <a className={className}>
        <span dangerouslySetInnerHTML={{ __html: label }}></span>
        {children}
      </a>
    </Link>
  );
}

export default A;
