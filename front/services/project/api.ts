import apiClient from 'services/common/api';
import Page from 'components/Page';
import Project, {
  ListProject,
  ListProjectTargetReview,
  ProjectBasic,
  ProjectOrder,
  ProjectTarget,
  ProjectTargetDocument,
  ProjectTargetReview,
} from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetParameter,
  ProjectTargetReviewParameter
} from 'services/project/parameter';

export class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ListProject>> {
    const { data } = await apiClient.get('/projects', query);
    return data;
  }

  async getOne(id: number): Promise<Project> {
    const { data } = await apiClient.get(`/projects/${id}`);
    return data;
  }

  async add(params: ProjectBasicParameter): Promise<Project> {
    const { data } = await apiClient.post('/projects', params);
    return data;
  }

  async getBasic(projectId: number): Promise<ProjectBasic> {
    const { data } = await apiClient.get(`/projects/${projectId}/basic`);
    return data;
  }

  async updateBasic(projectId: number, params: ProjectBasicParameter): Promise<ProjectBasic> {
    const { data } = await apiClient.put(`/projects/${projectId}/basic`, params);
    return data;
  }


  async getOrder(projectId: number): Promise<ProjectOrder> {
    const { data } = await apiClient.get(`/projects/${projectId}/order`);
    return data;
  }


  async updateOrder(projectId: number, params: ProjectOrderParameter): Promise<ProjectOrder> {
    const { data } = await apiClient.put(`/projects/${projectId}/order`, params);
    return data;
  }

  async getTarget(projectId: number): Promise<ProjectTarget> {
    const { data } = await apiClient.get(`/projects/${projectId}/target`);
    return data;
  }

  async updateTarget(projectId: number, params: ProjectTargetParameter): Promise<ProjectTarget> {
    const { data } = await apiClient.put(`/projects/${projectId}/target`, params);
    return data;
  }

  async getTargetReviewList(projectId: number): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/target/reviews`);
    return data;
  }

  async addTargetReview(projectId: number, params: ProjectTargetReviewParameter): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.post(`/projects/${projectId}/target/reviews`, params);
    return data;
  }

  async confirmTargetReview(id: number): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.post(`/project/target/reviews/${id}/confirm`);
    return data;
  }

  async updateTargetReview(id: number, params: ProjectTargetReviewParameter): Promise<ListProjectTargetReview[]> {
    const { data } = await apiClient.patch(`/project/target/reviews/${id}`, params);
    return data;
  }

  async removeTargetReview(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/target/reviews/${id}`);
    return data;
  }

  async getTargetReview(id: number): Promise<ProjectTargetReview> {
    const { data } = await apiClient.get(`/project/target/reviews/${id}`);
    return data;
  }

  async getTargetDocumentList(projectId: number): Promise<ProjectTargetDocument[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/target/documents`);
    return data;
  }

  async getTargetDocument(id: number): Promise<ProjectTargetDocument> {
    const { data } = await apiClient.get(`/project/target/documents/${id}`);
    return data;
  }

  async addTargetDocument(projectId: number, params: any): Promise<ProjectTargetDocument[]> {
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

  async updateTargetDocument(id: number, params: ProjectTargetDocumentChangeParameter): Promise<ProjectTargetDocument[]> {
    const { data } = await apiClient.patch(`/project/target/documents/${id}`, params);
    return data;
  }

  async removeTargetDocument(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/target/documents/${id}`);
    return data;
  }
}

const projectApi = new ProjectApi();
export default projectApi;
