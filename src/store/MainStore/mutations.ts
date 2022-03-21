import { Channel, Message, User } from 'src/components/models';
import { MutationTree } from 'vuex';
import { MainStateInterface } from './state';

const mutation: MutationTree<MainStateInterface> = {
  updateChannel(state: MainStateInterface, newChannel: Channel) {
    if (newChannel.pendingInvite) newChannel.pendingInvite = false;
    state.selectedChannel = newChannel;
  },
  updateStatus(state: MainStateInterface, newStatus: string) {
    state.user.status = newStatus;
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
