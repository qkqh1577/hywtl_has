import apiClient from 'services/common/api';
import {
  ProjectEstimate,
  ProjectEstimateParameter,
  ProjectEstimateSheet,
  ProjectEstimateSheetAddParameter,
  ProjectEstimateSheetChangeParameter,
  ProjectEstimateSheetShort,
} from 'services/project_estimate';

class ProjectEstimateApi {
  async getOne(projectId: number): Promise<ProjectEstimate> {
    const { data } = await apiClient.get(`/projects/${projectId}/estimate`);
    return data;
  }

  async upsert(params: ProjectEstimateParameter): Promise<void> {
    const { projectId, ...rest } = params;
    const { data } = await apiClient.put(`/projects/${projectId}/estimate`, rest);
    return data;
  }

  async getSheetList(projectId: number): Promise<ProjectEstimateSheetShort[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/estimate/sheets`);
    return data;
  }

  async getSheetOne(sheetId: number): Promise<ProjectEstimateSheet> {
    const { data } = await apiClient.get(`/project/estimate/sheets/${sheetId}`);
    return data;
  }

  async addSheet(params: ProjectEstimateSheetAddParameter): Promise<void> {
    const { projectId, ...rest } = params;
    const { data } = await apiClient.post(`/projects/${projectId}/estimate/sheets`, rest);
    return data;
  }

  async changeSheet(params: ProjectEstimateSheetChangeParameter): Promise<void> {
    const { id, ...rest } = params;
    const { data } = await apiClient.patch(`/project/estimate/sheets/${id}`, rest);
    return data;
  }
}

const projectEstimateApi = new ProjectEstimateApi();
export default projectEstimateApi;
