import apiClient, { toFormData } from 'services/api';
import {
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { ProjectId } from 'project/domain';
import { ProjectContractParameter } from 'project_contract/parameter';

class ProjectContractApi {

  async getList(id: ProjectId): Promise<ProjectContractShortVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/contract`);
    return data;
  }

  async getOne(id: number): Promise<ProjectContractVO> {
    const { data } = await apiClient.get(`/project/sales/contract/${id}`);
    return data;
  }

  async add(projectId: number,
            params: ProjectContractParameter
  ): Promise<void> {
    const formData = toFormData(params);
    const { data } = await apiClient.post(`/project/sales/${projectId}/contract`, formData);
    return data;
  }

  async change(projectContractId: ProjectContractId,
               params: ProjectContractParameter
  ): Promise<void> {
    const formData = toFormData(params);
    const { data } = await apiClient.put(`/project/sales/contract/${projectContractId}`, formData);
    return data;
  }

  /** 계약서 삭제 */
  async deleteOne(id: ProjectContractId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/contract/${id}`);
    return data;
  }

  async setFinal(projectId: ProjectId,
                 contractId: ProjectContractId
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/contract/confirmed`, { contractId });
    return data;
  }
}

export const projectContractApi = new ProjectContractApi();
