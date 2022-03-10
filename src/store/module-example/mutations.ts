import { MutationTree } from 'vuex';
import { ChannelInterface } from './state';

const mutation: MutationTree<ChannelInterface> = {
  someMutation(channels: ChannelInterface, newChannel: string) {
    channels.channel = newChannel;
  },
};

export default mutation;
