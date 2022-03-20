export type Message = {
  text: string;
  //timeSent: string; //TODO asi nejaky date type
  from: string;
};

export type Channel = {
  label: string;
  id: number;
  pendingInvite: boolean;
  messages: Message[];
  users: User[];
};

export type User = {
  id: number;
  fullname: string;
  username: string;
  status: string;
};
