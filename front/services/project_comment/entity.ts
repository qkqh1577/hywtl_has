import { UserShort } from 'services/user';

export type ProjectComment = {
  id: number;
  projectId: number;
  writer: UserShort;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
