import React, { useEffect, useState, useContext } from 'react';
import { PostsTeasers } from '../pages/Blog';
import { get } from '../../utils';
import { storiesApi } from '../../utils/config';
import MagnoliaContext from '../../utils/MagnoliaContext';
import { i18n } from '../../utils/config';

function BlogTeaser(props) {
  const { title, text } = props;
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(props.categories);
  const magnoliaContext = useContext(MagnoliaContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && !categories) setCategories(user.products?.map((product) => product['@id']));
  }, []);

  useEffect(() => {
    async function getBlogPosts() {
      const newBlogPosts = await get(
        storiesApi + magnoliaContext.search + '&limit=3&categories=' + categories.join('%7C')
      );

      if (newBlogPosts?.results) setBlogPosts(newBlogPosts.results);
    }

    if (categories) getBlogPosts();
  }, [categories]);

  return blogPosts.length > 0 ? (
    <div className='BlogTeaser text-center'>
      {title && <div className='title'>{title}</div>}
      {text && <div className='text' dangerouslySetInnerHTML={{ __html: text }} />}
      <PostsTeasers posts={blogPosts} />
    </div>
  ) : (
    magnoliaContext.isMagnolia && (
        <div className='BlogTeaser text-center'>
          <div className='text'>
            <i>{i18n.autopopulatedContent}</i>
          </div>
        </div>
    )
  );
}

export default BlogTeaser;
