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
        id: '1',
        pendingInvite: false,
        messages: [
          {
            text: 'Hey Daniel! How are u doing? Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
        ],
      },
      { label: '# channel2', id: '2', pendingInvite: false, messages: [] },
      { label: '# channel3', id: '3', pendingInvite: false, messages: [] },
    ];

    const privateChannels: Channel[] = [
      { label: '# channel1', id: '4', pendingInvite: false, messages: [] },
      { label: '# chanel2', id: '5', pendingInvite: false, messages: [] },
      { label: '# chanel3', id: '6', pendingInvite: false, messages: [] },
    ];
    publicChannels.forEach((channel: Channel) => {
      context.commit('insertPublicChannel', channel);
    });
    privateChannels.forEach((channel: Channel) => {
      context.commit('insertPrivateChannel', channel);
    });
  },
  getUsers(context) {
    const users: User[] = [
      {
        id: 1,
        fullname: 'Ruddy Jedrzej',
        username: 'xruddy',
        stat: 'positive',
      },
      {
        id: 2,
        fullname: 'Mallorie Alessandrini',
        username: 'xmallorie',
        stat: 'positive',
      },
      {
        id: 3,
        fullname: 'Elisabetta Wicklen',
        username: 'xelisabetta',
        stat: 'negative',
      },
      {
        id: 4,
        fullname: 'Seka Fawdrey',
        username: 'xseka',
        stat: 'grey',
      },
    ];
    users.forEach((user: User) => {
      context.commit('insertUser', user);
    });
  },
};

export default actions;
