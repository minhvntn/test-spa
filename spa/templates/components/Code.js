import React from 'react';

const Code = ({code}) => (
    <div dangerouslySetInnerHTML={{ __html: code }} />
);

export default Code;