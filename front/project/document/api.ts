import apiClient from 'services/api';
import {
  ProjectDocumentId,
  ProjectDocumentShort,
  ProjectDocumentVO
} from 'project/document/domain';
import { ProjectId } from 'project/domain';
import {
  ProjectDocumentParameter,
  ProjectDocumentUpdateParameter
} from 'project/document/parameter';

class ProjectDocumentApi {

  async getReceivedList(id: ProjectId): Promise<ProjectDocumentShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: 'RECEIVED' });
    return data;
  }

  async getSentList(id: ProjectId): Promise<ProjectDocumentShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: 'SENT' });
    return data;
  }

  async getBuildingList(id: ProjectId): Promise<ProjectDocumentShort[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: 'BUILDING' });
    return data;
  }

  async getOne(id: number): Promise<ProjectDocumentVO> {
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

  async update(params: ProjectDocumentUpdateParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/document/${params.id}`, params);
    return data;
  }

  async delete(id: ProjectDocumentId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/document/${id}`);
  }
}

export const projectDocumentApi = new ProjectDocumentApi();
