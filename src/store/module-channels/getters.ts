import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'

const getters: GetterTree<ChannelsStateInterface, StateInterface> = {
  currentMessages (context) {
    return context.active !== null ? context.messages[context.active.name] : []
  },
  currentUsers (context) {
    return context.active !== null ? context.users[context.active.name] : []
  },
  lastMessageOf (context) {
    return (channel: string) => {
      const messages = context.messages[channel]
      return messages.length > 0 ? messages[messages.length - 1] : null
    }
  }
}

export default getters
