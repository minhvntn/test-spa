
function IframeComp(props) {
  const { url, title } = props;

  return (
    <div className="cm-iframe"> 
      {url && <iframe 
        src={url}
        title={title}
        style={{ width: '100%', height: '1136px', minHeight: '500px', overflow: 'hidden' }}
        frameBorder="0"
        scrolling="no"
        id="iFrameResizer0"
        ></iframe>}
    </div>
  );
}

export default IframeComp;
