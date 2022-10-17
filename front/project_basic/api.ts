import {
  ProjectId,
  ProjectVO
} from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicDesign,
  ProjectBasicFailReason,
  RivalBidVO
} from 'project_basic/domain';
import apiClient from 'services/api';
import {
  ProjectBasicBusinessParameter,
  ProjectBasicDesignParameter,
  ProjectBasicParameter
} from 'project_basic/parameter';

class ProjectBasicApi {
  async getOne(id: ProjectId): Promise<ProjectBasic> {
    const { data } = await apiClient.get(`/project/sales/${id}`) as { data: ProjectVO };
    return { ...data };
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

  async getFailReason(id: ProjectId): Promise<ProjectBasicFailReason> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/fail-reason`);
    return data;
  }

  async getRivalBidList(id: ProjectId): Promise<RivalBidVO> {
    return new Promise(() => []);
  }
}

export const projectBasicApi = new ProjectBasicApi();
