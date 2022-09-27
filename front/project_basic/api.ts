import { ProjectId } from 'project/domain';
import {
  ProjectBasicBusiness,
  ProjectBasicDesign,
  ProjectBasicFailReason
} from 'project_basic/domain';
import apiClient from 'services/api';
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';

class ProjectBasicApi {
  async getBusinessList(id: ProjectId): Promise<ProjectBasicBusiness[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/business`);
    return data;
  }

  async pushBusiness(id: ProjectId,
                     params: ProjectBasicBusinessParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/basic/business`, params);
    return data;
  }

  async getDesign(id: ProjectId): Promise<ProjectBasicDesign> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/design`);
    return data;
  }

  async getFailReason(id: ProjectId): Promise<ProjectBasicFailReason> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/fail-reason`);
    return data;
  }
}

export const projectBasicApi = new ProjectBasicApi();
