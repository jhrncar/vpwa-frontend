import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthStateInterface } from './state'
import { authService, authManager } from 'src/services'
import { LoginCredentials, RegisterData, Channel } from 'src/contracts'

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  async check ({ state, commit, dispatch }) {
    try {
      commit('AUTH_START')
      const user = await authService.me()
      console.log('aa')
      if (user?.id !== state.user?.id) {
        user?.channels.forEach(async channel => await dispatch('channels/join', channel.name, { root: true }))
      }
      commit('AUTH_SUCCESS', user)
      return user !== null
    } catch (err) {
      commit('AUTH_ERROR', err)
      throw err
    }
  },
  async addChannel ({ commit }, channel: Channel) {
    commit('ADD_CHANNEL', channel)
  },
  async register ({ commit }, form: RegisterData) {
    try {
      commit('AUTH_START')
      const user = await authService.register(form)
      commit('AUTH_SUCCESS', null)
      return user
    } catch (err) {
      commit('AUTH_ERROR', err)
      throw err
    }
  },
  async login ({ commit }, credentials: LoginCredentials) {
    try {
      commit('AUTH_START')
      const apiToken = await authService.login(credentials)
      commit('AUTH_SUCCESS', null)
      // save api token to local storage and notify listeners
      authManager.setToken(apiToken.token)
      return apiToken
    } catch (err) {
      commit('AUTH_ERROR', err)
      throw err
    }
  },
  async logout ({ commit, dispatch }) {
    try {
      commit('AUTH_START')
      await authService.logout()
      await dispatch('channels/leave', null, { root: true })
      commit('AUTH_SUCCESS', null)
      // remove api token and notify listeners
      authManager.removeToken()
    } catch (err) {
      commit('AUTH_ERROR', err)
      throw err
    }
  }
}

export default actions
