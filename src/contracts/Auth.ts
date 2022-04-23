import { Channel } from './Channel'

export interface ApiToken {
  type: 'bearer';
  token: string;
  expires_at?: string;
  expires_in?: number;
}

export interface RegisterData {
  username: string;
  email: string;
  fullname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  channels: Channel[];
  channelInvites: Channel[];
  createdAt: string;
  updatedAt: string;
}
