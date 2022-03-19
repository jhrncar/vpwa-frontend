export type Message = {
  text: string;
  //timeSent: string; //TODO asi nejaky date type
  from: string;
};

export type Channel = {
  label: string;
  id: string;
  pendingInvite: boolean;
  messages: Message[];
};

export type User = {
  id: number;
  fullname: string;
  username: string;
  stat: string;
};
export interface Messag {
  text: string;
  //timeSent: string; //TODO asi nejaky date type
  from: string;
}
