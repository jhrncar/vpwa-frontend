import { Channel, User } from 'src/components/models';

export interface MainStateInterface {
  selectedChannel: Channel;
  publicChannels: Channel[];
  privateChannels: Channel[];
  user: User;
}

function state(): MainStateInterface {
  return {
    selectedChannel: {
      label: '',
      id: 0,
      pendingInvite: false,
      messages: [],
      users: [],
    },
    publicChannels: [],
    privateChannels: [],
    user: {
      id: 0,
      fullname: '',
      username: '',
      status: '',
    },
  };
}

export default state;
