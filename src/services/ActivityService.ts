import { ChannelUser, UserStatus } from 'src/contracts'
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

  public notifyStatus (status: UserStatus) {
    this.emitAsync('notifyStatus', status)
  }
}

export default new ActivitySocketManager('/')
