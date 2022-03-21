import { Channel, User } from 'src/components/models';

export interface MainStateInterface {
  selectedChannel: Channel;
  channels: Channel[];
  user: User;
}

function state(): MainStateInterface {
  return {
    selectedChannel: {
      label: '',
      id: 0,
      type: '',
      pendingInvite: false,
      messages: [],
      users: [],
    },
    channels: [],
    user: {
      id: 0,
      fullname: '',
      username: '',
      status: '',
    },
  };
}

export default state;
