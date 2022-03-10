export interface ChannelInterface {
  channel: string;
}

function state(): ChannelInterface {
  return {
    channel: '',
  };
}

export default state;
