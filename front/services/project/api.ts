import apiClient from 'services/common/api';
import Page from 'components/Page';
import Project, { ListProject, ProjectBasic, ProjectOrder } from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery
} from 'services/project/parameter';

export class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ListProject>> {
    const { data } = await apiClient.get('/projects', query);
    return data;
  }

  async getOne(id: number): Promise<Project> {
    const { data } = await apiClient.get(`/projects/${id}`);
    return data;
  }

  async getBasic(projectId: number): Promise<ProjectBasic> {
    const { data } = await apiClient.get(`/projects/${projectId}/basic`);
    return data;
  }

  async getOrder(projectId: number): Promise<ProjectOrder> {
    const { data } = await apiClient.get(`/projects/${projectId}/order`);
    return data;
  }

  async add(params: ProjectBasicParameter): Promise<Project> {
    const { data } = await apiClient.post('/projects', params);
    return data;
  }

  async updateBasic(projectId: number, params: ProjectBasicParameter): Promise<ProjectBasic> {
    const { data } = await apiClient.put(`/projects/${projectId}/basic`, params);
    return data;
  }

  async updateOrder(projectId: number, params: ProjectOrderParameter): Promise<ProjectOrder> {
    const { data } = await apiClient.put(`/projects/${projectId}/order`, params);
    return data;
  }
}

const projectApi = new ProjectApi();
export default projectApi;
