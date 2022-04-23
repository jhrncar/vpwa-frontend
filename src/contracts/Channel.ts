export interface CreateChannelData {
  name: string
  type: 'public' | 'private'
}

export interface Channel {
  id: number
  adminId: number | null
  name: string
  type: 'public' | 'private'
  numberOfUsers: number
  createdAt: string
  updatedAt: string
}

export interface ChannelUser {
  id: number
  username: string
  email: string
  fullname: string
  createdAt: string
  updatedAt: string
}
