import { Channel, User } from 'src/components/models'

export interface MainStateInterface {
  selectedChannel: Channel;
  channels: Channel[];
  user: User;
}

function state (): MainStateInterface {
  return {
    selectedChannel: {} as Channel,
    channels: [],
    user: {} as User
  }
}

export default state
