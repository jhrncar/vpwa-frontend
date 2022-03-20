import { Channel, User } from 'src/components/models';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StateInterface> = {
  setSelectedChannel(context, data: Channel) {
    context.commit('updateChannel', data);
  },
  getChannels(context) {
    const publicChannels: Channel[] = [
      {
        label: '# channel1',
        id: 1,
        pendingInvite: false,
        messages: [
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
        ],
        users: [
          {
            id: 2,
            fullname: 'Ruddy Jedrzej',
            username: 'xruddy',
            status: 'Online',
          },
          {
            id: 3,
            fullname: 'Mallorie Alessandrini',
            username: 'xmallorie',
            status: 'Online',
          },
          {
            id: 4,
            fullname: 'Elisabetta Wicklen',
            username: 'xelisabetta',
            status: 'DND',
          },
          {
            id: 5,
            fullname: 'Seka Fawdrey',
            username: 'xseka',
            status: 'Offline',
          },
        ],
      },
      {
        label: '# channel2',
        id: 2,
        pendingInvite: false,
        messages: [],
        users: [],
      },
      {
        label: '# channel3',
        id: 3,
        pendingInvite: false,
        messages: [],
        users: [],
      },
    ];

    const privateChannels: Channel[] = [
      {
        label: '# channel1',
        id: 4,
        pendingInvite: false,
        messages: [],
        users: [],
      },
      {
        label: '# channel2',
        id: 5,
        pendingInvite: false,
        messages: [],
        users: [],
      },
      {
        label: '# channel3',
        id: 6,
        pendingInvite: false,
        messages: [],
        users: [],
      },
    ];
    publicChannels.forEach((channel: Channel) => {
      context.commit('insertPublicChannel', channel);
    });
    privateChannels.forEach((channel: Channel) => {
      context.commit('insertPrivateChannel', channel);
    });
  },
  getUser(context) {
    const user: User = {
      id: 1,
      fullname: 'Logged User',
      username: 'xuser',
      status: 'Online',
    };
    context.commit('insertUser', user);
  },
  setStatus(context, status: string) {
    context.commit('updateStatus', status);
  },
};

export default actions;
