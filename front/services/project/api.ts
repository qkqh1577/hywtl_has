import apiClient from 'services/common/api';
import Page from 'components/Page';
import {
  ListProject,
  Project,
  ProjectBasic,
  ProjectBasicParameter,
  ProjectOrder,
  ProjectOrderParameter,
  ProjectQuery,
} from 'services/project';

class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ListProject>> {
    const { data } = await apiClient.get('/projects', query);
    return data;
  }

  async getOne(id: number): Promise<Project> {
    const { data } = await apiClient.get(`/projects/${id}`);
    return data;
  }

  async add(params: ProjectBasicParameter): Promise<Project> {
    const { data } = await apiClient.post('/projects', params);
    return data;
  }

  async getBasic(projectId: number): Promise<ProjectBasic> {
    const { data } = await apiClient.get(`/projects/${projectId}/basic`);
    return data;
  }

  async updateBasic(projectId: number, params: ProjectBasicParameter): Promise<ProjectBasic> {
    const { data } = await apiClient.put(`/projects/${projectId}/basic`, params);
    return data;
  }


  async getOrder(projectId: number): Promise<ProjectOrder> {
    const { data } = await apiClient.get(`/projects/${projectId}/order`);
    return data;
  }


  async updateOrder(projectId: number, params: ProjectOrderParameter): Promise<ProjectOrder> {
    const { data } = await apiClient.put(`/projects/${projectId}/order`, params);
    return data;
  }
}

const projectApi = new ProjectApi();
export default projectApi;
