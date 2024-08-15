import React from 'react';
import { EditableComponent } from '@magnolia/react-editor';

const ManagedCampaign = (props) => {
  const tag = props.tag;
  const fallback = props.fallback;

  const main = typeof tag?.main === 'object' ? tag.main : fallback?.main;

  return typeof main === 'object' ? (
    <div>
      {main['@nodes'].map((node) => (
        <EditableComponent key={main[node]['@id']} content={main[node]} />
      ))}
    </div>
  ) : null;
};

export default ManagedCampaign;
