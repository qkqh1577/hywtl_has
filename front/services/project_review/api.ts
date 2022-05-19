import apiClient from 'services/common/api';
import { ListProjectReview, ProjectReview, ProjectReviewParameter } from 'services/project_review';

class ProjectReviewApi {
  async getList(projectId: number): Promise<ListProjectReview[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/reviews`);
    return data;
  }

  async getOne(id: number): Promise<ProjectReview> {
    const { data } = await apiClient.get(`/project/reviews/${id}`);
    return data;
  }

  async add(projectId: number, params: ProjectReviewParameter): Promise<ListProjectReview[]> {
    const { data } = await apiClient.post(`/projects/${projectId}/reviews`, params);
    return data;
  }

  async update(id: number, params: ProjectReviewParameter): Promise<ListProjectReview[]> {
    const { data } = await apiClient.patch(`/project/reviews/${id}`, params);
    return data;
  }

  async remove(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/reviews/${id}`);
    return data;
  }
}

const projectReviewApi = new ProjectReviewApi();
export default projectReviewApi;
