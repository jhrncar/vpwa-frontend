import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelInterface } from './state';

const getters: GetterTree<ChannelInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
