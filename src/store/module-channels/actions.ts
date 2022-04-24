import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { RawMessage, CreateChannelData } from 'src/contracts'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async createChannel ({ commit }, data: CreateChannelData) {
    try {
      commit('LOADING_START')
      const channel = await channelService.create(data)
      const manager = channelService.join(channel.name)
      const messages = await manager.loadMessages()
      const users = await manager.loadUsers()
      commit('auth/ADD_CHANNEL', channel, { root: true })
      commit('LOADING_SUCCESS', { channel: channel.name, messages, users })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async join ({ commit }, channel: string) {
    try {
      commit('LOADING_START')
      const manager = channelService.join(channel)
      const messages = await manager.loadMessages()
      const users = await manager.loadUsers()
      commit('LOADING_SUCCESS', { channel, messages, users })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async leave ({ getters, commit }, channel: string | null) {
    const leaving: string[] = channel !== null ? [channel] : getters.joinedChannels

    leaving.forEach((c) => {
      channelService.leave(c)
      commit('CLEAR_CHANNEL', c)
    })
  },
  async addMessage ({ commit }, { channel, message }: { channel: string, message: RawMessage }) {
    const newMessage = await channelService.in(channel)?.addMessage(message)
    commit('NEW_MESSAGE', { channel, message: newMessage })
  }
}

export default actions
