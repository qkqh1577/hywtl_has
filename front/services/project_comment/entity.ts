import { ListUser } from 'services/user/entity';

type ProjectComment = {
  id: number;
  projectId: number;
  writer: ListUser;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ProjectComment;
