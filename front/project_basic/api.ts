import { ProjectId } from 'project/domain';
import {
  ProjectBasicBusiness,
  ProjectBasicBusinessId
} from 'project_basic/domain';
import apiClient from 'services/api';
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';

class ProjectBasicApi {
  async getBusinessList(id: ProjectId): Promise<ProjectBasicBusiness[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/business`);
    return data;
  }

  async getBusiness(id: ProjectBasicBusinessId): Promise<ProjectBasicBusiness> {
    const { data } = await apiClient.get(`/project/sales/basic/business/${id}`);
    return data;
  }

  async pushBusiness(id: ProjectId,
                     params: ProjectBasicBusinessParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/basic/business`, params);
    return data;
  }

  async deleteBusiness(id: ProjectBasicBusinessId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/basic/business/${id}`);
    return data;
  }
}

export const projectBasicApi = new ProjectBasicApi();