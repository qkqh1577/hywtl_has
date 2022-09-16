import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  ProjectEstimateVO,
} from 'project_estimate/domain';
import { ProjectId } from 'project/domain';
import apiClient, { toFormData } from 'services/api';
import { ProjectCustomEstimateAddParameter } from 'project_estimate/parameter';

class ProjectEstimateApi {
  async getList(id: ProjectId): Promise<ProjectEstimateVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/estimate`);
    return data;
  }

  async getCustomDetail(id: ProjectEstimateId): Promise<ProjectCustomEstimateVO> {
    const { data } = await apiClient.get(`/project/sales/custom-estimate/${id}`);
    return data;
  }

  async addCustom(projectId: ProjectId,
                  params: ProjectCustomEstimateAddParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/custom-estimate`, toFormData(params));
    return data;
  }
}

export const projectEstimateApi = new ProjectEstimateApi();
