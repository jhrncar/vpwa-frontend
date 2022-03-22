import { Channel, Message, User } from 'src/components/models';
import { MutationTree } from 'vuex';
import { MainStateInterface } from './state';

const mutation: MutationTree<MainStateInterface> = {
  updateChannel(state: MainStateInterface, newChannel: Channel) {
    state.selectedChannel = newChannel;
  },
  updateStatus(state: MainStateInterface, newStatus: string) {
    state.user.status = newStatus;
  },
  updatePendingInvite(state: MainStateInterface) {
    state.selectedChannel.pendingInvite = false;
  },
  removeChannel(state: MainStateInterface, channel: Channel) {
    if (channel === state.selectedChannel) {
      state.selectedChannel = {
        label: '',
        id: 0,
        type: '',
        pendingInvite: false,
        messages: [],
        users: [],
      };
    }
    state.channels.splice(state.channels.indexOf(channel), 1);
  },
  insertNewMessage(state: MainStateInterface, newMessage: Message) {
    state.selectedChannel.messages.push(newMessage);
  },
  insertChannel(state: MainStateInterface, newChannel: Channel) {
    if (newChannel.pendingInvite) {
      state.channels.unshift(newChannel);
    } else {
      state.channels.push(newChannel);
    }
  },
  insertUser(state: MainStateInterface, newUser: User) {
    state.user = newUser;
  },
};

export default mutation;
