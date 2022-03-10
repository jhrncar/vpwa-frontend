import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelInterface } from './state';

const actions: ActionTree<ChannelInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
