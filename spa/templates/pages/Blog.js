import { useState, useEffect, useContext } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { HomeHeader } from './Home';
import Card from '../components/Card';
import { get } from '../../utils';
import { storiesApi, spaRootNodePath, i18n } from '../../utils/config';
import MagnoliaContext from '../../utils/MagnoliaContext';

export function PostsTeasers(props) {
  const { posts = [] } = props;

  return (
    <div className='row'>
      {posts.map((post) => {
        const { title, lead, imagesource, created, categories } = post;
        const cta = {
          link: {
            field: 'postLink',
            postLink: post['@path'],
          },
          label: i18n.readMore,
        };

        return (
          <div key={post['@id']} className='col-4'>
            <Card title={title} text={lead} image={imagesource} cta={cta} created={created} categories={categories} />
          </div>
        );
      })}
    </div>
  );
}

function Blog(props) {
  const { header, main, footer, title, description } = props;
  const [rows, setRows] = useState([]);
  const magnoliaContext = useContext(MagnoliaContext);

  useEffect(() => {
    async function getStories() {
      const storiesJson = await get(storiesApi + spaRootNodePath + magnoliaContext.search);

      if (storiesJson['@nodes']) {
        const stories = storiesJson['@nodes'].map((key) => storiesJson[key]);
        const newRows = [];

        for (let i = 0; i < stories.length; i += 3) {
          newRows.push(stories.slice(i, i + 3));
        }

        setRows(newRows);
      }
    }

    getStories();
  }, []);

  return (
    <div className='Blog'>
      <HomeHeader />
      <div className='text-center'>
        {title && <div className='page-title'>{title}</div>}
        {description && <div className='text'>{description}</div>}
      </div>
      {header && <EditableArea content={header} />}
      <PostsTeasers posts={rows[0]} />
      {main && <EditableArea content={main} />}
      <PostsTeasers posts={rows[1]} />
      {footer && <EditableArea content={footer} />}
      {rows.slice(2).map((row, i) => (
        <PostsTeasers key={'Blog' + i} posts={row} />
      ))}
    </div>
  );
}

export default Blog;
