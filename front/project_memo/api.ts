import { ProjectMemoQuery } from 'project_memo/parameter';
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
    const { data } = await apiClient.get(`/project/sales/${projectId}/memo`, query);
    return data;
  }

  async getOne(id: ProjectMemoId): Promise<ProjectMemoVO> {
    const { data } = await apiClient.get(`/project/sales/memo/${id}`);
    return data;
  }

}

export const projectMemoApi = new ProjectMemoApi();