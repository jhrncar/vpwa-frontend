import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MainStateInterface } from './state';

const getters: GetterTree<MainStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
