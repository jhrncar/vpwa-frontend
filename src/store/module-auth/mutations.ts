import { User, Channel, UserStatus } from 'src/contracts'
import { MutationTree } from 'vuex'
import { AuthStateInterface } from './state'

const mutation: MutationTree<AuthStateInterface> = {
  AUTH_START (state) {
    state.status = 'pending'
    state.errors = []
  },
  AUTH_SUCCESS (state, user: User | null) {
    state.status = 'success'
    state.user = user
  },
  AUTH_ERROR (state, errors) {
    state.status = 'error'
    state.errors = errors
  },
  ADD_CHANNEL (state, channel: Channel) {
    state.user?.channels.push(channel)
  },
  REMOVE_CHANNEL (state, name: string) {
    state.user?.channels.splice(state.user?.channels.findIndex(c => c.name === name), 1)
  },
  UPDATE_STATUS (state, status: UserStatus) {
    if (state.user) state.user.status = status
  }
}

export default mutation
