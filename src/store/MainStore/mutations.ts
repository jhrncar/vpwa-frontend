import { MutationTree } from 'vuex';
import { ChannelInterface } from './state';

const mutation: MutationTree<ChannelInterface> = {
  updateChannel(channels: ChannelInterface, newChannel: string) {
    channels.selectedChannel = newChannel;
  },
};

export default mutation;
