import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShort,
  EstimateContentVariableVO,
  EstimateContentVO,
} from 'admin/estimate/content/domain';
import apiClient from 'services/api';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';

class EstimateContentApi {

  async getList(query: EstimateContentQuery): Promise<EstimateContentShort[]> {
    const { data } = await apiClient.get('/admin/estimate/content', query);
    return data;
  }

  async getOne(id: EstimateContentId): Promise<EstimateContentVO> {
    const { data } = await apiClient.get(`/admin/estimate/content/${id}`);
    return data;
  }

  async upsert(parameter: EstimateContentParameter): Promise<void> {
    if (parameter.id) {
      const { data } = await apiClient.put(`/admin/estimate/content${parameter.id ? `/${parameter.id}` : ''}`, parameter);
      return data;
    }
  }

  async delete(id: EstimateContentId): Promise<void> {
    await apiClient.delete(`/admin/estimate/content/${id}`);
  }

  async changeSeq(idList: EstimateContentId[]): Promise<void> {
    const { data } = await apiClient.post('/admin/estimate/content/sequence', idList);
    return data;
  }

  async getVariableList(): Promise<EstimateContentVariableVO[]> {
    const { data } = await apiClient.get('/admin/estimate/content/variable');
    return data;
  }
}

export const estimateContentApi = new EstimateContentApi();
