import React from 'react';

const HTMLComp = ({text}) => (
    <div dangerouslySetInnerHTML={{ __html: text }} />
);

export default HTMLComp;