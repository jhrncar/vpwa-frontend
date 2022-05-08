import { UserStatus } from './Auth'

export enum ChannelType {
  PUBLIC = 'public',
  PRIVATE = 'private'
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

export interface Channel {
  id: number
  adminId: number | null
  name: string
  type: ChannelType
  numberOfUsers: number
  createdAt: string
  updatedAt: string
  invitePending?: boolean
  invitedBy?: ChannelUser
}
