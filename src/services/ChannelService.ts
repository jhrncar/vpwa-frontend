import { RawMessage, SerializedMessage, Channel, CreateChannelData, ChannelUser } from 'src/contracts'
import { BootParams, SocketManager } from './SocketManager'
import { api } from 'src/boot/axios'

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe ({ store }: BootParams): void {
    const channel = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: SerializedMessage) => {
      store.commit('channels/NEW_MESSAGE', { channel, message })
    })

    this.socket.on('user', (user: ChannelUser) => {
      store.commit('channels/NEW_USER', { channel, user })
    })

    this.socket.on('channel:delete', (name: string) => {
      store.commit('auth/REMOVE_CHANNEL', name)
      store.commit('channels/CLEAR_CHANNEL', name)
    })

    this.socket.on('user:leave', (id: number) => {
      store.commit('channels/REMOVE_USER', { channel, userId: id })
    })
  }

  public addMessage (message: RawMessage): Promise<SerializedMessage> {
    return this.emitAsync('addMessage', message)
  }

  public loadMessages (): Promise<SerializedMessage[]> {
    return this.emitAsync('loadMessages')
  }

  public loadUsers (): Promise<ChannelUser[]> {
    return this.emitAsync('loadUsers')
  }

  public leaveChannel (): Promise<void> {
    const channel = this.namespace.split('/').pop() as string
    return this.emitAsync('leaveChannel', channel)
  }
}

class ChannelService {
  private channels: Map<string, ChannelSocketManager> = new Map()

  async create (data: CreateChannelData): Promise<Channel> {
    return await api.post<Channel>('channel/create', data)
      .then(response => response.data)
      .catch(error => Promise.reject(error))
  }

  async getUsers (name: string): Promise<ChannelUser[]> {
    return await api.get<ChannelUser[]>(`channel/users/${name}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error))
  }

  public join (name: string): ChannelSocketManager {
    if (this.channels.has(name)) {
      throw new Error(`User is already joined in channel "${name}"`)
    }

    // connect to given channel namespace
    const channel = new ChannelSocketManager(`/channels/${name}`)
    this.channels.set(name, channel)
    return channel
  }

  public leave (name: string): boolean {
    const channel = this.channels.get(name)

    if (!channel) {
      return false
    }

    // disconnect namespace and remove references to socket
    channel.destroy()
    return this.channels.delete(name)
  }

  public in (name: string): ChannelSocketManager | undefined {
    return this.channels.get(name)
  }
}

export default new ChannelService()
