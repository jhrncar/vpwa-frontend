import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { MainStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const MainModule: Module<MainStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default MainModule;
