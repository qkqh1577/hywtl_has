import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  ProjectEstimateVO,
  ProjectSystemEstimateVO,
} from 'project_estimate/domain';
import { ProjectId } from 'project/domain';
import apiClient, { toFormData } from 'services/api';
import {
  ProjectCustomEstimateAddParameter,
  ProjectCustomEstimateChangeParameter,
  ProjectCustomEstimateExtensionParameter,
  ProjectSystemEstimateParameter
} from 'project_estimate/parameter';

class ProjectEstimateApi {
  async getList(id: ProjectId): Promise<ProjectEstimateVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/estimate`);
    return data;
  }

  async getCustomDetail(id: ProjectEstimateId): Promise<ProjectCustomEstimateVO> {
    const { data } = await apiClient.get(`/project/sales/custom-estimate/${id}`);
    return data;
  }

  async getSystemDetail(id: ProjectEstimateId): Promise<ProjectSystemEstimateVO> {
    const { data } = await apiClient.get(`/project/sales/system-estimate/${id}`);
    return data;
  }

  async addCustom(projectId: ProjectId,
                  params: ProjectCustomEstimateAddParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/custom-estimate`, toFormData(params));
    return data;
  }

  async changeCustom(params: ProjectCustomEstimateChangeParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/custom-estimate/${params.id}`, params);
    return data;
  }

  async extensionCustom(params: ProjectCustomEstimateExtensionParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/custom-estimate/${params.id}/extension`, params);
    return data;
  }

  async addSystem(projectId: ProjectId,
                  params: ProjectSystemEstimateParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${projectId}/system-estimate`, params);
    return data;
  }

  async changeSystem(id: ProjectEstimateId,
                     params: ProjectSystemEstimateParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/system-estimate/${id}`, params);
    return data;
  }

  async setFinal(projectId: ProjectId,
                 id: ProjectEstimateId
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/confirmed`, { estimateId: id });
    return data;
  }
}

export const projectEstimateApi = new ProjectEstimateApi();
