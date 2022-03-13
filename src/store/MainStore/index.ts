import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ChannelInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const MainModule: Module<ChannelInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default MainModule;
