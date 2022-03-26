import { Channel, User } from 'src/components/models';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MainStateInterface } from './state';

const actions: ActionTree<MainStateInterface, StateInterface> = {
  setSelectedChannel(context, data: Channel) {
    context.commit('updateChannel', data);
  },
  getChannels(context) {
    const channels: Channel[] = [
      {
        label: '# channel1',
        id: 1,
        type: 'public',
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
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
          {
            text: 'Hey Daniel! How are u doing?',
            from: 'Daniel',
          },
          {
            text: 'Great! How about you?',
            from: 'Me',
          },
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
            status: 'online',
          },
          {
            id: 3,
            fullname: 'Mallorie Alessandrini',
            username: 'xmallorie',
            status: 'online',
          },
          {
            id: 4,
            fullname: 'Elisabetta Wicklen',
            username: 'xelisabetta',
            status: 'dnd',
          },
          {
            id: 5,
            fullname: 'Seka Fawdrey',
            username: 'xseka',
            status: 'offline',
          },
        ],
      },
      {
        label: '# channel2',
        id: 2,
        type: 'public',
        pendingInvite: false,
        messages: [],
        users: [],
      },
      {
        label: '# channel3',
        id: 3,
        type: 'public',
        pendingInvite: true,
        messages: [],
        users: [],
      },
      {
        label: '# channel4',
        id: 4,
        type: 'private',
        pendingInvite: false,
        messages: [],
        users: [],
      },
      {
        label: '# channel5',
        id: 5,
        type: 'private',
        pendingInvite: true,
        messages: [],
        users: [],
      },
      {
        label: '# channel6',
        id: 6,
        type: 'private',
        pendingInvite: false,
        messages: [],
        users: [],
      },
    ];
    channels.forEach((channel: Channel) => {
      context.commit('insertChannel', channel);
    });
  },
  getUser(context) {
    const user: User = {
      id: 1,
      fullname: 'Logged User',
      username: 'xuser',
      status: 'online',
    };
    context.commit('insertUser', user);
  },
  setStatus(context, status: string) {
    context.commit('updateStatus', status);
  },
};

export default actions;
