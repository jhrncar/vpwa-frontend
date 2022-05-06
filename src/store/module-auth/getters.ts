import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { AuthStateInterface } from './state'

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  isAuthenticated (context) {
    return context.user !== null
  },
  status (context) {
    return context.user?.status
  },
  joinedChannels (context) {
    return context.user?.channels
  },
  channelInvites (context) {
    return context.user?.channelInvites
  }
}

export default getters
