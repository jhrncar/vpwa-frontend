import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { activityService, channelService } from 'src/services'
import { RawMessage, Channel, SerializedMessage, UserStatus, User } from 'src/contracts'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async refreshChannel ({ commit }, channel: string) {
    try {
      commit('LOADING_START')
      const manager = channelService.in(channel)
      const messages = await manager?.loadMessages()
      const users = await manager?.loadUsers()
      commit('LOADING_SUCCESS', { channel, messages, users })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async join ({ commit }, { channel, user } : {channel: string, user: User}) {
    try {
      commit('LOADING_START')
      const manager = channelService.join(channel)
      const messages = await manager.loadMessages()
      const users = await manager.loadUsers()
      users.map(u => {
        if (u.id === user.id) {
          u.status = user.status
        } else {
          u.status = UserStatus.OFFLINE
        }
        return u
      })
      commit('LOADING_SUCCESS', { channel, messages, users })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async joinCommand ({ commit, rootGetters }, { channelName, type }: {channelName: string, type: string}) {
    try {
      commit('LOADING_START')
      const channel = await activityService.joinCommand(channelName, type).catch(err => {
        throw err
      })
      if (channel === null) {
        throw new Error('Public channel not found')
      }
      const status = rootGetters['auth/status']
      if (status !== UserStatus.OFFLINE) {
        const manager = channelService.join(channel.name)
        const messages = await manager.loadMessages()
        const users = await manager.loadUsers()
        users.map(user => {
          user.status = this.state.auth.user?.status ? this.state.auth.user.status : UserStatus.OFFLINE
          return user
        })
        commit('auth/ADD_CHANNEL', channel, { root: true })
        commit('LOADING_SUCCESS', { channel: channel.name, messages, users })
        if (users.length !== 1) {
          activityService.notifyStatus(rootGetters['auth/status'])
          activityService.getStatus()
        }
        commit('SET_ACTIVE', channel)
      } else {
        commit('auth/ADD_CHANNEL', channel, { root: true })
        commit('LOADING_END')
      }
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async leave ({ rootGetters, commit }, channel: Channel | null) {
    const leaving: Channel[] = channel !== null ? [channel] : rootGetters['auth/joinedChannels']
    if (channel) {
      channelService.in(channel.name)?.leaveChannel()
      commit('auth/REMOVE_CHANNEL', channel.name, { root: true })
    }

    leaving.forEach((c) => {
      channelService.leave(c.name)
      commit('CLEAR_CHANNEL', c.name)
    })
  },
  async addMessage ({ commit }, { channel, message }: { channel: string, message: RawMessage }) {
    const newMessage = await channelService.in(channel)?.addMessage(message)
    commit('NEW_MESSAGE', { channel, message: newMessage })
  },
  async loadMoreMessages ({ commit }, { channel, messages }: { channel: string, messages: SerializedMessage[] }) {
    try {
      commit('LOADING_START')
      commit('LOADING_FINISHED', { channel, messages })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async kickUser ({ commit }, { channel, username }: {channel: string, username: string}) {
    try {
      commit('LOADING_START')
      await channelService.in(channel)?.kickUser(username)
      commit('LOADING_END')
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },

  async revoke ({ commit }, { channel, username }: {channel: string, username: string}) {
    try {
      commit('LOADING_START')
      await channelService.in(channel)?.revoke(username)
      commit('LOADING_END')
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },

  async recievedRevoke ({ commit, state }, channel: Channel) {
    if (channel) {
      let k = null
      for (const c of this.state.auth.user?.channelInvites || []) {
        if (c.name === channel.name) {
          commit('auth/REMOVE_INVITE', channel, { root: true })
          k = c
          break
        }
      }
      if (k === null) {
        commit('auth/REMOVE_CHANNEL', channel.name, { root: true })
        channelService.leave(channel.name)
        commit('CLEAR_CHANNEL', channel.name)
        commit('SET_ACTIVE', null)
      }
    }
    if (state.active?.name === channel.name) {
      commit('SET_ACTIVE', null)
    }
  },
  async invite (_, username: string): Promise<unknown> {
    return activityService.inviteUser(username, this.state.channels.active?.name || '')
  },
  async acceptInvite ({ rootGetters, commit, dispatch }, channel: Channel) {
    commit('auth/REMOVE_INVITE', channel, { root: true })
    const newChannel = await activityService.acceptInvite(channel)
    commit('auth/ADD_CHANNEL', newChannel, { root: true })
    await dispatch('join', { channel: newChannel.name, user: this.state.auth.user })
    activityService.notifyStatus(rootGetters['auth/status'])
    activityService.getStatus()
    commit('SET_ACTIVE', newChannel)
  },
  async rejectInvite ({ commit }, channel: Channel) {
    commit('auth/REMOVE_INVITE', channel, { root: true })
    activityService.rejectInvite(channel)
    commit('SET_ACTIVE', null)
  }
}

export default actions
