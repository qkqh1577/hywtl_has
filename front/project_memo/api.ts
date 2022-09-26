import {
  ProjectMemoAddParameter,
  ProjectMemoChangeParameter,
  ProjectMemoQuery
} from 'project_memo/parameter';
import Page from 'type/Page';
import {
  ProjectMemoId,
  ProjectMemoVO
} from 'project_memo/domain';
import apiClient from 'services/api';
import { ProjectId } from 'project/domain';

class ProjectMemoApi {
  async getPage(
    projectId: ProjectId,
    query: ProjectMemoQuery
  ): Promise<Page<ProjectMemoVO>> {
    const { data } = await apiClient.get(`/project/${projectId}/memo`, query);
    return data;
  }

  async getOne(id: ProjectMemoId): Promise<ProjectMemoVO> {
    const { data } = await apiClient.get(`/project/memo/${id}`);
    return data;
  }

  async add(projectId: ProjectId,
            params: ProjectMemoAddParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/${projectId}/memo`, params);
    return data;
  }

  async change(id: ProjectMemoId,
               params: ProjectMemoChangeParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/memo/${id}`, params);
    return data;
  }

  async deleteOne(id: ProjectMemoId): Promise<void> {
    const { data } = await apiClient.delete(`/project/memo/${id}`);
    return data;
  }
}

export const projectMemoApi = new ProjectMemoApi();