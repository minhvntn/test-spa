import { EditableArea } from '@magnolia/react-editor';

function ManagedCampaign(props) {
  const { main } = props;

  return <div className='ManagedCampaign'>{main && <EditableArea content={main} />}</div>;
}

export default ManagedCampaign;
