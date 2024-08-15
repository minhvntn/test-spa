import React from 'react';
import Img from '../../components/Img';
import { HomeHeader } from './Home';
import BlogTeaser from '../components/BlogTeaser';
import { i18n } from '../../utils/config';

function Post(props) {
  const { title, created, imagesource, lead, blocks, author, authorBio, authorImage, categories } = props;

  return (
    <>
      <HomeHeader />
      <div className='Post-wrapper'>
        <div className='Post'>
          <div className='text-center'>
            {created ? <div>{new Date(created).toLocaleDateString('en-GB')}</div> : null}
            {title && <div className='title'>{title}</div>}
            {lead && <section className='supTitle'>{lead}</section>}
            {categories && (
              <div className='text'>
                {categories.map((category) => (
                  <span key={category['@id']}>#{category.displayName || category['@name']}</span>
                ))}
              </div>
            )}
            <Img className='Post__image' image={imagesource} />
          </div>

          <div className='Post__blocks'>
            {blocks?.['@nodes']?.map((blockName) => {
              const { text, image } = blocks[blockName];

              return (
                <React.Fragment key={blocks[blockName]['@id']}>
                  {text && <section className='Post__text' dangerouslySetInnerHTML={{ __html: text }} />}
                  {image && (
                    <section className='Post__image-wrapper'>
                      <Img className='Post__image' image={image} withCaption={true} />
                    </section>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className='Author'>
            <Img className='Author__image' image={authorImage} />
            <div>
              {author && <div className='Author__fullName'>{author}</div>}
              {authorBio && <div className='Author__title'>{authorBio}</div>}
            </div>
          </div>
        </div>
      </div>
      <BlogTeaser title={i18n.furtherReadings} categories={categories?.map((category) => category['@id'])} />
    </>
  );
}

export default Post;
