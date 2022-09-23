import {
  ProjectMemoCategory,
  ProjectMemoId
} from 'project_memo/domain';
import { UserId } from 'user/domain';

export interface ProjectMemoQuery {
  page: number;
  keyword: string;
  category: ProjectMemoCategory[] | undefined;
}

export const initialProjectMemoQuery: ProjectMemoQuery = {
  page:     0,
  keyword:  '',
  category: undefined,
};

export interface ProjectMemoChangeParameter {
  id: ProjectMemoId;
  description: string;
  category: ProjectMemoCategory;
}

export interface ProjectMemoAddParameter {
  description: string;
  category: ProjectMemoCategory;
  attendanceList?: UserId[];
}