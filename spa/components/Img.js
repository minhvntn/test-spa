import { useEffect, useRef, useState } from 'react';

import { baseUrl } from '../utils/config';

const blurredSrc =
  'https://img.freepik.com/free-vector/white-blurred-background_1034-249.jpg?w=1480&t=st=1697704901~exp=1697705501~hmac=0f88c54c510d8185d8fa5c593f8da76b5365145f643917ffed0247fa14362e05';

function getImageSrc(image, imgEl) {
  let src = image?.['@link'] || blurredSrc;

  // if (image?.focal?.areas?.auto?.url) {
  //   src = image.focal.areas.auto?.url;
  // }

  if (imgEl?.current) {
    const width = imgEl.current.offsetWidth;
    const height = imgEl.current.offsetHeight;

    src = src.replace('_WIDTH_', width).replace('_HEIGHT_', height);
  }

  return src.startsWith('http') ? src : baseUrl + src;
}

function Img(props) {
  const { className, image, withCaption } = props;
  const [src, setSrc] = useState(blurredSrc);
  const imgEl = useRef(null);

  useEffect(() => {
    setSrc(getImageSrc(image, imgEl));
  }, []);

  if (!image) return null;

  const caption = image.metadata?.caption || image.metadata?.fileName;

  return src ? (
    <>
      <img ref={imgEl} className={className} src={src} alt={caption} />
      {withCaption && <div className='Img__caption'>{caption}</div>}
    </>
  ) : null;
}

export default Img;
