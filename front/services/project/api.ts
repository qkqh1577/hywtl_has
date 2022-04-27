import apiClient from 'services/common/api';
import {
  ProjectBasicParameter,
  ProjectBuildingParameter,
  ProjectQuery
} from 'services/project/parameter';
import Page from 'components/Page';
import Project, { ListProject, ProjectBasic, ProjectBuilding } from 'services/project/entity';

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

  async getBuilding(projectId: number): Promise<ProjectBuilding> {
    const { data } = await apiClient.get(`/projects/${projectId}/building`);
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

  async updateBuilding(projectId: number, params: ProjectBuildingParameter): Promise<ProjectBuilding> {
    const { data } = await apiClient.put(`/projects/${projectId}/building`, params);
    return data;
  }
}

const projectApi = new ProjectApi();
export default projectApi;
