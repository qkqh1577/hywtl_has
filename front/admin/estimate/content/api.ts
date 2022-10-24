import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShortVO,
  EstimateContentVariableVO,
  EstimateContentVO,
} from 'admin/estimate/content/domain';
import apiClient from 'services/api';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';

class EstimateContentApi {

  async getList(query: EstimateContentQuery): Promise<EstimateContentShortVO[]> {
    const { data } = await apiClient.get('/admin/estimate-content', query);
    return data;
  }

  async getOne(id: EstimateContentId): Promise<EstimateContentVO> {
    const { data } = await apiClient.get(`/admin/estimate-content/${id}`);
    return data;
  }

  async upsert(parameter: EstimateContentParameter): Promise<void> {
    const { data } = await apiClient.put(`/admin/estimate-content${parameter.id ? `/${parameter.id}` : ''}`, parameter);
    return data;
  }

  async delete(id: EstimateContentId): Promise<void> {
    await apiClient.delete(`/admin/estimate-content/${id}`);
  }

  async getVariableList(): Promise<EstimateContentVariableVO[]> {
    const { data } = await apiClient.get('/admin/estimate-content/variable');
    return data;
  }
}

export const estimateContentApi = new EstimateContentApi();
