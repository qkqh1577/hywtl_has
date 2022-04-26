import apiClient from 'services/common/api';
import { ProjectAddParameter, ProjectQuery } from 'services/project/parameter';
import Page from 'components/Page';
import Project, { ListProject } from 'services/project/entity';

export class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ListProject>> {
    const { data} = await apiClient.get('/projects', query);
    return data;
  }

  async getOne(id: number): Promise<Project> {
    const { data} = await apiClient.get(`/projects/${id}`);
    return data;
  }

  async add(params: ProjectAddParameter): Promise<Project> {
    const { data } = await apiClient.post('/projects', params);
    return data;
  }
}

const projectApi = new ProjectApi();
export default projectApi;