import apiClient, { toFormData } from 'services/api';
import {
  ProjectDocumentId,
  ProjectDocumentShortVO,
  ProjectDocumentType,
  ProjectDocumentVO
} from 'project_document/domain';
import { ProjectId } from 'project/domain';
import {
  ProjectDocumentChangeParameter,
  ProjectDocumentParameter
} from 'project_document/parameter';

class ProjectDocumentApi {

  async getReceivedList(id: ProjectId): Promise<ProjectDocumentShortVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: ProjectDocumentType.RECEIVED });
    return data;
  }

  async getSentList(id: ProjectId): Promise<ProjectDocumentShortVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: ProjectDocumentType.SENT });
    return data;
  }

  async getBuildingList(id: ProjectId): Promise<ProjectDocumentShortVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/document`, { type: ProjectDocumentType.BUILDING });
    return data;
  }

  async getOne(id: number): Promise<ProjectDocumentVO> {
    const { data } = await apiClient.get(`/project/sales/document/${id}`);
    return data;
  }

  async add(projectId: ProjectId,
            type: ProjectDocumentType,
            params: ProjectDocumentParameter
  ): Promise<void> {

    const formData = toFormData({
      ...params,
      type,
    });
    const { data } = await apiClient.post(`/project/sales/${projectId}/document`, formData);
    return data;
  }

  async change(params: ProjectDocumentChangeParameter): Promise<void> {
    const formData = toFormData(params);
    const { data } = await apiClient.put(`/project/sales/document/${params.id}`, formData);
    return data;
  }

  async deleteOne(id: ProjectDocumentId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/document/${id}`);
    return data;
  }
}

export const projectDocumentApi = new ProjectDocumentApi();
