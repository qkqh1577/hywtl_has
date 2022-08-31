import apiClient from 'services/api';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { ProjectId } from 'project/domain';
import { ProjectDocumentParameter } from 'project/document/parameter';

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

  async add(params: ProjectDocumentParameter): Promise<void> {
    const formData = new FormData();
    formData.append('recipient', params.recipient);
    formData.append('type', params.type);
    formData.append('file', params.file);
    if (params.mailFile) {
      formData.append('mailFile', params.mailFile);
    }
    if (params.note) {
      formData.append('note', params.note);
    }

    const { data } = await apiClient.post(`/project/sales/${params.projectId}/document`, formData);
    return data;
  }

  async update(id: number): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/document/${id}`);
    return data;
  }

}

export const projectDocumentApi = new ProjectDocumentApi();
