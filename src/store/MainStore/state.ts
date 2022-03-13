export interface ChannelInterface {
  selectedChannel: string;
}

function state(): ChannelInterface {
  return {
    selectedChannel: '',
  };
}

export default state;
