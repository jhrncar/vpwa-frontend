import { Channel, ChannelType, ChannelUser, User, UserStatus } from 'src/contracts'
import { authManager } from '.'
import { BootParams, SocketManager } from './SocketManager'

class ActivitySocketManager extends SocketManager {
  public subscribe ({ store }: BootParams): void {
    // this.socket.on('user:list', (onlineUsers: ChannelUser[]) => {
    //   console.log('Online users list', onlineUsers)
    // })
    this.socket.on('user:status:notify', (room: string) => {
      this.emitAsync('notifyStatus', store.state.auth.user?.status, room)
    })

    this.socket.on('user:status', (user: ChannelUser, status: UserStatus) => {
      store.commit('channels/UPDATE_USER_STATUS', { userId: user.id, status })
    })

    this.socket.on('user:online', (user: ChannelUser) => {
      store.commit('channels/UPDATE_USER_STATUS', { userId: user.id, status: UserStatus.ONLINE })
    })

    this.socket.on('user:offline', (user: ChannelUser) => {
      store.commit('channels/UPDATE_USER_STATUS', { userId: user.id, status: UserStatus.OFFLINE })
    })

    this.socket.on('user:invite', (channel: Channel, from: User) => {
      store.commit('auth/ADD_INVITE', { invitedTo: channel, invitedBy: from })
    })

    this.socket.on('user:create', (channel: string, type: string) => {
      console.log(channel, type, 'created')
      store.dispatch('channels/createChannel', {
        name: channel,
        type: type === 'public' ? ChannelType.PUBLIC : ChannelType.PRIVATE
      })
    })

    authManager.onChange((token) => {
      if (token) {
        this.socket.connect()
      } else {
        this.socket.disconnect()
      }
    })
  }

  public getStatus () {
    this.emitAsync('getStatus')
  }

  public joinCommand (channel: string, type: string): Promise<void> {
    console.log(channel, type, 'left FE')
    return this.emitAsync('joinCommand', channel, type)
  }

  public notifyStatus (status: UserStatus) {
    this.emitAsync('notifyStatus', status)
  }

  public inviteUser (username: string, channelName: string): Promise<unknown> {
    return this.emitAsync('inviteUser', username, channelName)
  }

  public acceptInvite (channel: Channel): Promise<Channel> {
    return this.emitAsync('acceptInvite', channel.name)
  }

  public rejectInvite (channel: Channel) {
    this.emitAsync('rejectInvite', channel.name)
  }
}

export default new ActivitySocketManager('/')
