import { ProjectMemoCategory } from 'project_memo/domain';

export interface ProjectMemoQuery {
  page: number;
  keywordType: string;
  keyword: string;
  category: ProjectMemoCategory[] | undefined;
}

export const initialProjectMemoQuery: ProjectMemoQuery = {
  page:        0,
  keyword:     '',
  keywordType: '',
  category:    undefined,
};

export interface ProjectMemoParameter {
  description: string;
  category: ProjectMemoCategory;
}