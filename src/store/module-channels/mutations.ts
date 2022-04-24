import { SerializedMessage, ChannelUser } from 'src/contracts'
import { MutationTree } from 'vuex'
import { ChannelsStateInterface } from './state'
import { nextTick } from 'vue'

const mutation: MutationTree<ChannelsStateInterface> = {
  LOADING_START (state) {
    state.loading = true
    state.error = null
  },
  LOADING_SUCCESS (state, { channel, messages, users }: { channel: string, messages: SerializedMessage[], users: ChannelUser[] }) {
    state.loading = false
    state.messages[channel] = messages
    state.users[channel] = users
  },
  LOADING_FINISHED (state, { channel, messages }: {channel: string, messages: SerializedMessage[]}) {
    state.loading = false
    state.messages[channel].push(...messages)
  },
  LOADING_ERROR (state, error) {
    state.loading = false
    state.error = error
  },
  CLEAR_CHANNEL (state, channel) {
    state.active = null
    delete state.messages[channel]
    delete state.users[channel]
  },
  SET_ACTIVE (state, channel: string) {
    state.active = channel
    nextTick().then(() => { window.scrollTo(0, document.body.scrollHeight) }) // TODO toto nejde na malej sirke, lebo modal je ako overlay
  },
  NEW_MESSAGE (state, { channel, message }: { channel: string, message: SerializedMessage }) {
    state.messages[channel].push(message)
  },
  NEW_USER (state, { channel, user }: {channel: string, user: ChannelUser}) {
    state.users[channel].push(user)
  }
}

export default mutation
