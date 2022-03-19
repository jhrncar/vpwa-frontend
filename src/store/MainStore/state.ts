import { Channel, User } from 'src/components/models';

export interface MainStateInterface {
  selectedChannel: Channel;
  publicChannels: Channel[];
  privateChannels: Channel[];
  users: User[];
}

function state(): MainStateInterface {
  return {
    selectedChannel: { label: '', id: '', pendingInvite: false, messages: [] },
    publicChannels: [],
    privateChannels: [],
    users: [],
  };
}

export default state;
