import { ProjectId } from 'project/domain';
import {
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicContributorId,
  ProjectBasicDesignVO,
  ProjectBasicExternalContributorVO,
  ProjectBasicFailReasonVO,
  ProjectBasicInternalContributorVO,
} from 'project_basic/domain';
import apiClient from 'services/api';
import {
  ProjectBasicBusinessParameter,
  ProjectBasicDesignParameter,
  ProjectBasicExternalContributorParameter,
  ProjectBasicFailReasonParameter,
  ProjectBasicInternalContributorParameter,
  ProjectBasicParameter
} from 'project_basic/parameter';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { RivalBidVO } from 'rival_bid/domain';
import { ProjectContractVO } from 'project_contract/domain';
import {BusinessId} from "../business/domain";

class ProjectBasicApi {

  async getInternalList(id: ProjectId): Promise<ProjectBasicInternalContributorVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/contributor/internal`);
    return data;
  }

  async getExternalList(id: ProjectId): Promise<ProjectBasicExternalContributorVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/contributor/external`);
    return data;
  }

  async getBusiness(id: BusinessId): Promise<ProjectBasicBusiness> {
    const { data } = await apiClient.get(`/project/sales/basic/business/${id}`);
    return data;
  }

  async getBusinessList(id: ProjectId): Promise<ProjectBasicBusiness[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/business`);
    return data;
  }

  async getDesign(id: ProjectId): Promise<ProjectBasicDesignVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/design`);
    return data;
  }

  async addInternal(id: ProjectId): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/basic/contributor/internal`);
    return data;
  }

  async addExternal(id: ProjectId): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/basic/contributor/external`);
    return data;
  }

  async updateInternal(params: ProjectBasicInternalContributorParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/basic/contributor/internal/${params.id}`, params);
    return data;
  }

  async updateExternal(params: ProjectBasicExternalContributorParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/basic/contributor/external/${params.id}`, params);
    return data;
  }

  async deleteInternal(id: ProjectBasicContributorId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/basic/contributor/internal/${id}`);
    return data;
  }

  async deleteExternal(id: ProjectBasicContributorId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/basic/contributor/external/${id}`);
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

  async getFailReason(id: ProjectId): Promise<ProjectBasicFailReasonVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/fail-reason`);
    return data;
  }

  async updateFailReason(id: ProjectId,
                         params: Partial<ProjectBasicFailReasonParameter>
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${id}/basic/fail-reason`, params);
    return data;
  }

  async getCityData(code?: string): Promise<void> {
    const { data } = await apiClient.get(`/address?code=${code ? `${code.slice(0, 2)}00000000` : '00000000'}`);
    return data;
  }

}

export const projectBasicApi = new ProjectBasicApi();
