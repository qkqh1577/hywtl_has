import { ProjectId } from 'project/domain';
import { ProjectBidVO } from 'project_bid/domain';
import apiClient from 'services/api';
import { ProjectBidParameter } from 'project_bid/parameter';

class ProjectBidApi {
  async get(projectId: ProjectId): Promise<ProjectBidVO> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/bid`);
    return data;
  }

  async update(projectId: ProjectId,
               params: ProjectBidParameter
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${projectId}/bid`, params);
    return data;
  }
}

export const projectBidApi = new ProjectBidApi();