import Img from '../../../components/Img';

function Single(props) {
  const { id, answerOptions, handleAnswersChange } = props;

  return (
    <>
      {answerOptions.map((item, i) => {
        const { label, value, image } = item;

        return (
          <div
            className='ConversationalForm__option'
            key={id + '-' + i}
            onClick={(e) => {
              e.target.classList.toggle('checked');
              handleAnswersChange(id, value);
            }}
          >
            <Img className='ConversationalForm__optionImage' image={image} />
            {label}
          </div>
        );
      })}
    </>
  );
}

export default Single;
