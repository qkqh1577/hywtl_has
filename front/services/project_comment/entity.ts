import { ListUser } from 'services/user';

export type ProjectComment = {
  id: number;
  projectId: number;
  writer: ListUser;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
