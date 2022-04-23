import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { RawMessage } from 'src/contracts'
import { CreateChannelData } from 'src/contracts/Channel'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async createChannel ({ commit }, data: CreateChannelData) {
    try {
      commit('LOADING_START')
      const channel = await channelService.create(data)
      commit('auth/ADD_CHANNEL', channel, { root: true })
      await channelService.join(channel.name).loadMessages()
      commit('LOADING_SUCCESS', { channel: channel.name, messages: [] })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },
  async join ({ commit }, channel: string) {
    try {
      commit('LOADING_START')
      const messages = await channelService.join(channel).loadMessages()
      commit('LOADING_SUCCESS', { channel, messages })
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
