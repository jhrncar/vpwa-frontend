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
  insertNewMessage(state: MainStateInterface, newMessage: Message) {
    state.selectedChannel.messages.push(newMessage);
  },
  insertPublicChannel(state: MainStateInterface, newChannel: Channel) {
    state.publicChannels.push(newChannel);
  },
  insertPrivateChannel(state: MainStateInterface, newChannel: Channel) {
    state.privateChannels.push(newChannel);
  },
  insertUser(state: MainStateInterface, newUser: User) {
    state.user = newUser;
  },
};

export default mutation;
