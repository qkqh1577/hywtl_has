import apiClient, { toFormData } from 'services/api';
import {
  ProjectContractBasicVO,
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { ProjectId } from 'project/domain';
import { ProjectContractParameter } from 'project_contract/parameter';
import {
  ProjectEstimateId,
  ProjectEstimateVO
} from 'project_estimate/domain';

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
  async delete(id: ProjectContractId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/contract/${id}`);
    return data;
  }

  /** 견적서 목록 조회*/
  async getEstimateList(id: ProjectId): Promise<ProjectEstimateVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/estimate`);
    return data;
  }

  /** 견적서 조회*/
  async getEstimateDetail(id: ProjectEstimateId): Promise<ProjectEstimateVO> {
    const { data } = await apiClient.get(`/project/sales/estimate/${id}`);
    return data;
  }

  /** 계약서 기본 정보 조회*/
  async getContractBasic(projectId: ProjectId): Promise<ProjectContractBasicVO> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/contract/basic`);
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
