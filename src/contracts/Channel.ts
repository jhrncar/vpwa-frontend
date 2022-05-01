import { UserStatus } from './Auth'

export enum ChannelType {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export interface CreateChannelData {
  name: string
  type: ChannelType
}

export interface Channel {
  id: number
  adminId: number | null
  name: string
  type: ChannelType
  numberOfUsers: number
  createdAt: string
  updatedAt: string
  invitePending: boolean
}

export interface ChannelUser {
  id: number
  username: string
  email: string
  fullname: string
  status: UserStatus
  createdAt: string
  updatedAt: string
}
