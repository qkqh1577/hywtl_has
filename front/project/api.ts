import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import { ProjectShortVO } from 'project/domain';
import apiClient from 'services/api';

class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ProjectShortVO>> {
    const { data } = await apiClient.get('/projects', query);
    return data;
  }


}

export const projectApi = new ProjectApi();