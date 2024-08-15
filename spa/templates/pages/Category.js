import { HomeHeader } from './Home';
import { PostsTeasers } from './Blog';

function Blog(props) {
  const { title, results, total } = props;

  return (
    <div className='Blog'>
      <HomeHeader />
      <div className='text-center'>
        {title && (
          <div className='page-title'>
            {title} ({total})
          </div>
        )}
      </div>
      <PostsTeasers posts={results} />
    </div>
  );
}

export default Blog;
