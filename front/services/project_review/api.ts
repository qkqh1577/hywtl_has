import apiClient from 'services/common/api';
import {
  ProjectReview,
  ProjectReviewParameter,
  ProjectReviewShort,
} from 'services/project_review';

class ProjectReviewApi {
  async getList(projectId: number): Promise<ProjectReviewShort[]> {
    const { data } = await apiClient.get(`/projects/${projectId}/reviews`);
    return data;
  }

  async getOne(id: number): Promise<ProjectReview> {
    const { data } = await apiClient.get(`/project/reviews/${id}`);
    return data;
  }

  async add(projectId: number, params: ProjectReviewParameter): Promise<ProjectReviewShort[]> {
    const { data } = await apiClient.post(`/projects/${projectId}/reviews`, toFormData(params));
    return data;
  }

  async update(id: number, params: ProjectReviewParameter): Promise<ProjectReviewShort[]> {
    const { data } = await apiClient.patch(`/project/reviews/${id}`, toFormData(params));
    return data;
  }

  async remove(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/project/reviews/${id}`);
    return data;
  }
}

const mapFormData = (obj: any, fieldName: string, form: FormData): void => {
  if (typeof obj === 'undefined' || Number.isNaN(obj)) {
    return;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      mapFormData(obj[i], `${fieldName}[${i}]`, form);
    }
    return;
  }
  if (obj instanceof File) {
    form.append(fieldName, obj);
    return;
  }
  if (typeof obj === 'object') {
    const keys: string[] = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i];
      mapFormData(obj[key], `${fieldName}.${key}`, form);
    }
    return;
  }
  form.append(fieldName, obj);
};

const toFormData = (params: any): FormData => {
  const formData = new FormData();
  const keys: string[] = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    const key: string = keys[i];
    mapFormData(params[key], key, formData);
  }
  return formData;
};

const projectReviewApi = new ProjectReviewApi();
export default projectReviewApi;
