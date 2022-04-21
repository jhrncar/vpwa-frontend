import { Channel, Message, User } from 'src/components/models'
import { MutationTree } from 'vuex'
import { MainStateInterface } from './state'

const mutation: MutationTree<MainStateInterface> = {
  updateChannel (state: MainStateInterface, newChannel: Channel) {
    state.selectedChannel = newChannel
  },
  updateStatus (state: MainStateInterface, newStatus: string) {
    state.user.status = newStatus
  },
  acceptPendingInvite (state: MainStateInterface) {
    state.selectedChannel.pendingInvite = false
    mutation.sortChannels(state)
  },
  sortChannels (state: MainStateInterface) {
    state.channels.sort((a, b) => {
      if (a.pendingInvite) return -1
      if (b.pendingInvite) return 1
      return a.label > b.label ? 1 : -1
    })
  },
  removeChannel (state: MainStateInterface, channel: Channel) {
    if (channel === state.selectedChannel) {
      state.selectedChannel = {} as Channel
    }
    state.channels.splice(state.channels.indexOf(channel), 1)
  },
  insertNewMessage (state: MainStateInterface, newMessage: Message) {
    state.selectedChannel.messages.push(newMessage)
  },
  insertChannel (state: MainStateInterface, newChannel: Channel) {
    if (newChannel.pendingInvite) {
      state.channels.unshift(newChannel)
    } else {
      state.channels.push(newChannel)
    }
    mutation.sortChannels(state)
  },
  insertUser (state: MainStateInterface, newUser: User) {
    state.user = newUser
  }
}

export default mutation
