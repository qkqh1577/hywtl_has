import { ListUser } from 'services/user/entity';

type ProjectComment = {
  id: number;
  projectId: number;
  writer: ListUser;
  createdTime: Date;
  updatedTime: Date;
}

export default ProjectComment;
