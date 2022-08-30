import apiClient from 'services/api';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { ProjectId } from 'project/domain';

class ProjectDocumentApi {

  async getReceivedList(id: ProjectId): Promise<DocumentShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: 'RECEIVED' });
    return data;
  }

  async getSentList(id: ProjectId): Promise<DocumentShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: 'SENT' });
    return data;
  }

  async getBuildingList(id: ProjectId): Promise<DocumentShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: 'BUILDING' });
    return data;
  }

  async getOne(id: number): Promise<DocumentVO> {
    const { data } = await apiClient.get(`/project/sales/document/${id}`);
    return data;
  }

  async add(id: number): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/document`);
    return data;
  }

  async update(id: number): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/document/${id}`);
    return data;
  }

}

export const projectDocumentApi = new ProjectDocumentApi();
