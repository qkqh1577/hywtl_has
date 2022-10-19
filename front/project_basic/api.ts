import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicDesign,
  ProjectBasicFailReason,
} from 'project_basic/domain';
import apiClient from 'services/api';
import {
  ProjectBasicBusinessParameter,
  ProjectBasicDesignParameter,
  ProjectBasicFailReasonParameter,
  ProjectBasicParameter
} from 'project_basic/parameter';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { RivalBidVO } from 'rival_bid/domain';
import { ProjectContractVO } from 'project_contract/domain';

class ProjectBasicApi {
  async getOne(id: ProjectId): Promise<ProjectBasic> {
    const { data } = await apiClient.get(`/project/sales/${id}`);
    return data;
  }

  async getBusinessList(id: ProjectId): Promise<ProjectBasicBusiness[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/business`);
    return data;
  }

  async getDesign(id: ProjectId): Promise<ProjectBasicDesign> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/design`);
    return data;
  }

  async updateBasic(id: ProjectId,
                    params: ProjectBasicParameter
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${id}/basic`, params);
    return data;
  }

  async addBusiness(id: ProjectId,
                    params: ProjectBasicBusinessParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${id}/basic/business`, params);
    return data;
  }

  async changeBusiness(params: ProjectBasicBusinessParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/basic/business/${params.id}`, params);
    return data;
  }

  async deleteBusiness(id: ProjectBasicBusinessId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/basic/business/${id}`);
    return data;
  }

  async updateDesign(id: ProjectId,
                     params: ProjectBasicDesignParameter
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${id}/basic/design`, params);
    return data;
  }

  async getTest(id: ProjectId): Promise<ProjectComplexTestVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/test`);
    return data;
  }

  async getEstimate(id: ProjectId): Promise<ProjectEstimateVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/estimate`);
    return data;
  }

  async getRivalEstimateList(id: ProjectId): Promise<RivalEstimateVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/rival-estimate`);
    return data;
  }

  async getBid(id: ProjectId): Promise<ProjectBidVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/bid`);
    return data;
  }

  async getRivalBidList(id: ProjectId): Promise<RivalBidVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/rival-bid`);
    return data;
  }

  async getContract(id: ProjectId): Promise<ProjectContractVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/contract`);
    return data;
  }

  async getFailReason(id: ProjectId): Promise<ProjectBasicFailReason> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/fail-reason`);
    return data;
  }

  async updateFailReason(id: ProjectId,
                         params: Partial<ProjectBasicFailReasonParameter>
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${id}/basic/fail-reason`, params);
    return data;
  }

}

export const projectBasicApi = new ProjectBasicApi();
