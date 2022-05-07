import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthStateInterface } from './state'
import { authService, authManager, activityService } from 'src/services'
import { LoginCredentials, RegisterData, Channel, UserStatus } from 'src/contracts'

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  async check ({ state, commit, dispatch }) {
    try {
      commit('AUTH_START')
      const user = await authService.me()
      if (user?.id !== state.user?.id && user?.channels) {
        for (const channel of user.channels) {
          await dispatch('channels/join', { channel: channel.name, user }, { root: true })
        }
      }
      if (user?.id !== state.user?.id && user?.channelInvites) {
        for (const channel of user.channelInvites) {
          channel.invitePending = true
        }
      }
      commit('AUTH_SUCCESS', user)
      activityService.getStatus()
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
  },
  async updateStatus ({ state, commit, dispatch }, status: UserStatus) {
    if (state.user?.status === UserStatus.OFFLINE) {
      for (const channel of state.user.channels) {
        await dispatch('channels/join', { channel: channel.name, user: state.user }, { root: true }).catch(() => {
          // user is joined in channel
        })
      }
    }
    if (status === UserStatus.OFFLINE) {
      await dispatch('channels/leave', null, { root: true })
    }
    commit('UPDATE_STATUS', status)
    commit('channels/UPDATE_USER_STATUS', { userId: state.user?.id, status }, { root: true })
    activityService.notifyStatus(status)
  }
}

export default actions
