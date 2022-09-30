import apiClient, { toFormData } from 'services/api';
import {
  ProjectContractId,
  ProjectContractShort,
  ProjectContractVO,
  ProjectEstimateId,
  ProjectEstimateVO
} from 'project_contract/domain';
import { ProjectId } from 'project/domain';
import {
  ProjectContractParameter
} from 'project_contract/parameter';

class ProjectContractApi {

  async getList(id: ProjectId): Promise<ProjectContractShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/contract`, {});
    return data;
  }

  async getOne(id: number): Promise<ProjectContractVO> {
    const { data } = await apiClient.get(`/project/sales/contract/${id}`);
    return data;
  }

  async getProjectContractCollection(projectId: number,
                                     estimateId: number
  ): Promise<ProjectContractVO> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/contract/collection`, { params: { estimateId } });
    return data;
  }

  async add(projectId: number,
            params: ProjectContractParameter
  ): Promise<void> {
    const formData = toFormData(params);
    console.log(params, formData.get('file'));
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
}

export const projectContractApi = new ProjectContractApi();