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
    console.log('pushed')
    state.user?.channels.push(channel)
  },
  ADD_INVITE (state, { invitedTo, invitedBy }: {invitedTo: Channel, invitedBy: User}) {
    invitedTo.invitePending = true
    // invitedTo.invitedBy = invitedBy.username
    state.user?.channelInvites.push(invitedTo)
  },
  REMOVE_CHANNEL (state, name: string) {
    state.user?.channels.splice(state.user?.channels.findIndex(c => c.name === name), 1)
  },
  REMOVE_INVITE (state, invite: Channel) {
    invite.invitePending = false
    state.user?.channelInvites.splice(state.user?.channelInvites.findIndex(c => c.name === invite.name), 1)
  },
  UPDATE_STATUS (state, status: UserStatus) {
    if (state.user) state.user.status = status
  }
}

export default mutation
