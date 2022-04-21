export type Message = {
  text: string;
  // timeSent: string; //TODO asi nejaky date type
  from: string;
};

export type User = {
  id: number;
  fullname: string;
  username: string;
  status: string;
};

export type Channel = {
  label: string;
  type: 'public' | 'private' | '';
  id: number;
  pendingInvite: boolean;
  messages: Message[];
  users: User[];
  admin: User;
};
