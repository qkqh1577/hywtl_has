import apiClient, { toFormData } from 'services/api';
import {
  ProjectContractBasicVO,
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { ProjectId } from 'project/domain';
import {
  ProjectContractParameter,
  ProjectFinalContractParameter
} from 'project_contract/parameter';
import { ProjectEstimateId } from 'project_estimate/domain';
import { FileItemParameter } from 'file-item';

class ProjectContractApi {

  async getList(id: ProjectId): Promise<ProjectContractShortVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/contract`);
    return data;
  }

  async getOne(id: number): Promise<ProjectContractVO> {
    const { data } = await apiClient.get(`/project/sales/contract/${id}`);
    return data;
  }

  async getBasic(projectId: ProjectId): Promise<ProjectContractBasicVO> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/contract/basic`);
    return data;
  }

  async getCollection(estimateId: ProjectEstimateId | undefined): Promise<ProjectContractCollectionVO> {
    const { data } = await apiClient.get('/project/sales/contract/collection', { estimateId });
    return data;
  }

  async getConditionList(estimateId: ProjectEstimateId | undefined): Promise<ProjectContractConditionVO[]> {
    const { data } = await apiClient.get(`/project/sales/contract/condition`, { estimateId });
    return data;
  }

  async add(projectId: number,
            params: ProjectContractParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${projectId}/contract`, toFormData(params));
    return data;
  }

  async change(projectContractId: ProjectContractId,
               params: ProjectContractParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/contract/${projectContractId}`, toFormData(params));
    return data;
  }

  async changePdf(projectContractId: ProjectContractId,
                  params: FileItemParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/contract/${projectContractId}/pdf`, toFormData(params));
    return data;
  }

  async deleteOne(id: ProjectContractId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/contract/${id}`);
    return data;
  }

  async setFinal(projectId: ProjectId,
                 contractIdList: ProjectContractId[]
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/contract/confirmed`, { contractIdList });
    return data;
  }

  async getFinalContract(projectId: ProjectId): Promise<void> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/contract/final`);
    return data;
  }

  async updateFinalContract(projectId: ProjectId, params: ProjectFinalContractParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${projectId}/contract/final`, params);
    return data;
  }

}

export const projectContractApi = new ProjectContractApi();
