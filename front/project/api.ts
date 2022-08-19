import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import {
  ProjectId,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import apiClient from 'services/api';

class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ProjectShortVO>> {
    const { data } = await apiClient.get('/project/sales', query);
    return data;
  }

  async getOne(id: ProjectId): Promise<ProjectVO> {
    const { data } = await apiClient.get(`/project/sales/${id}`);
    return data;
  }


}

export const projectApi = new ProjectApi();