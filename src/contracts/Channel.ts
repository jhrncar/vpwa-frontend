export interface Channel {
  id: number;
  adminId: number;
  name: string;
  type: 'public' | 'private';
  numberOfUsers: number | null
  createdAt: string;
  updatedAt: string;
}
