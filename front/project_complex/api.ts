import { ProjectId } from 'project/domain';
import {
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO,
  ProjectComplexSiteId,
  ProjectComplexSiteVO,
  ProjectComplexTestVO
} from 'project_complex/domain';
import apiClient from 'services/api';
import {
  ProjectComplexBuildingParameter,
  ProjectComplexSiteParameter
} from 'project_complex/parameter';

class ProjectComplexApi {
  async getTestDetail(id: ProjectId): Promise<ProjectComplexTestVO> {
    const { data } = await apiClient.get(`/project/sales/${id}/basic/test`);
    return data;
  }

  async getSiteList(id: ProjectId): Promise<ProjectComplexSiteVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/complex/site`);
    return data;
  }

  async getBuildingList(id: ProjectId): Promise<ProjectComplexBuildingVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/complex/building`);
    return data;
  }

  async getBuilding(id: ProjectComplexBuildingId): Promise<ProjectComplexBuildingVO> {
    const { data } = await apiClient.get(`/project/sales/complex/building/${id}`);
    return data;
  }

  async pushSite(id: ProjectId): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${id}/complex/site`);
    return data;
  }

  async updateSite(params: ProjectComplexSiteParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/complex/site/${params.id}`, params);
    return data;
  }

  async deleteSite(id: ProjectComplexSiteId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/complex/site/${id}`);
    return data;
  }

  async pushBuilding(id: ProjectId): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${id}/complex/building`);
    return data;
  }

  async updateBuilding(params: ProjectComplexBuildingParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/complex/building/${params.id}`, params);
    return data;
  }

  async deleteBuilding(id: ProjectComplexBuildingId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/complex/building/${id}`);
    return data;
  }
}

export const projectComplexApi = new ProjectComplexApi();