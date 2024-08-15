import A from './A';

function PostCategories(props) {
  const { categories = [] } = props;

  return categories.map((category) => (
    <A key={category['@id']} href={'/life-blog/' + category['@name']} searchParams={{ id: category['@id'] }}>
      #{category.displayName || category['@name']}
    </A>
  ));
}

export default PostCategories;
