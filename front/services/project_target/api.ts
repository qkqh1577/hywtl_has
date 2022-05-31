import apiClient from 'services/common/api';
import {
  ProjectTarget,
  ProjectTargetParameter,
  ProjectTargetShort,
} from 'services/project_target';

class ProjectTargetApi {
  async getList(projectId: number): Promise<ProjectTargetShort[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/targets`);
    return data;
  }

  async getOne(id: number): Promise<ProjectTarget> {
    const { data } = await apiClient.get(`/project/targets/${id}`);
    return data;
  }

  async add(projectId: number, params: ProjectTargetParameter): Promise<ProjectTarget> {
    const { data } = await apiClient.post(`/projects/${projectId}/targets`, params);
    return data;
  }

  async update(id: number, params: ProjectTargetParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/targets/${id}`, params);
    return data;
  }

  async remove(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/targets/${id}`);
    return data;
  }
}

const projectTargetApi = new ProjectTargetApi();
export default projectTargetApi;
