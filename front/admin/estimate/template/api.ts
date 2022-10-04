import { EstimateTemplateQuery } from 'admin/estimate/template/query';
import {
  EstimateTemplateId,
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import apiClient from 'services/api';
import { EstimateTemplateParameter } from 'admin/estimate/template/parameter';

class EstimateTemplateApi {
  async getList(query: EstimateTemplateQuery): Promise<EstimateTemplateShort[]> {
    const { data } = await apiClient.get('/admin/estimate-template', query);
    return data;
  }

  async getOne(id: EstimateTemplateId): Promise<EstimateTemplateVO> {
    const { data } = await apiClient.get(`/admin/estimate-template/${id}`);
    return data;
  }

  async upsert(parameter: EstimateTemplateParameter): Promise<void> {
    const { data } = await apiClient.put(
      parameter.id ? `/admin/estimate-template/${parameter.id}` : '/admin/estimate-template',
      parameter
    );
    return data;
  }

  async changeSeq(idList: EstimateTemplateId[]): Promise<void> {
    const { data } = await apiClient.post('/admin/estimate-template/seq', { idList });
    return data;
  }

  async deleteOne(id: EstimateTemplateId): Promise<void> {
    const { data } = await apiClient.delete(`/admin/estimate-template/${id}`);
    return data;
  }
}

export const estimateTemplateApi = new EstimateTemplateApi();