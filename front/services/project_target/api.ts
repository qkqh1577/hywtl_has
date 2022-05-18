import apiClient from 'services/common/api';
import {
  ListProjectTargetReview,
  ProjectTargetDocument,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetReview,
  ProjectTargetReviewParameter,
} from 'services/project_target';

export class ProjectTargetApi {
  async getReviewList(projectId: number): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/target/reviews`);
    return data;
  }

  async getReview(id: number): Promise<ProjectTargetReview> {
    const { data } = await apiClient.get(`/project/target/reviews/${id}`);
    return data;
  }

  async addReview(projectId: number, params: ProjectTargetReviewParameter): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.post(`/projects/${projectId}/target/reviews`, params);
    return data;
  }

  async updateReview(id: number, params: ProjectTargetReviewParameter): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.patch(`/project/target/reviews/${id}`, params);
    return data;
  }

  async removeReview(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/target/reviews/${id}`);
    return data;
  }

  async confirmReview(id: number): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.post(`/project/target/reviews/${id}/confirm`);
    return data;
  }

  async getDocumentList(projectId: number): Promise<ProjectTargetDocument[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/target/documents`);
    return data;
  }

  async getDocument(id: number): Promise<ProjectTargetDocument> {
    const { data } = await apiClient.get(`/project/target/documents/${id}`);
    return data;
  }

  async addDocument(projectId: number, params: any): Promise<ProjectTargetDocument[]> {
    const form = new FormData();
    form.append('fileItem.multipartFile', params.fileItem.multipartFile);
    if (params.memo) {
      form.append('memo', params.memo);
    }
    const { data } = await apiClient.post(`/projects/${projectId}/target/documents`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  async updateDocument(id: number, params: ProjectTargetDocumentChangeParameter): Promise<ProjectTargetDocument[]> {
    const { data } = await apiClient.patch(`/project/target/documents/${id}`, params);
    return data;
  }

  async removeDocument(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/target/documents/${id}`);
    return data;
  }
}

const projectTargetApi = new ProjectTargetApi();
export default projectTargetApi;
