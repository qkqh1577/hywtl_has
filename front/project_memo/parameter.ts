import { ProjectMemoCategory } from 'project_memo/domain';
import { FormikPartial } from 'type/Form';

export interface ProjectMemoQuery {
  page: number;
  keyword: string;
  category: ProjectMemoCategory[] | undefined;
}

export const initialProjectMemoQuery: ProjectMemoQuery = {
  page:        0,
  keyword:     '',
  category:    undefined,
};

export interface ProjectMemoParameter {
  description: string;
  category: ProjectMemoCategory;
}

export const initialProjectMemoParameter: FormikPartial<ProjectMemoParameter> = {
  description: '',
  category:    '',
};