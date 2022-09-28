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
    if (parameter.id) {
      const { data } = await apiClient.patch(`/admin/estimate-template/${parameter.id}`, parameter);
      return data;
    }
    const { data } = await apiClient.post('/admin/estimate-template', parameter);
    return data;
  }

  async changeSeq(idList: EstimateTemplateId[]): Promise<void> {
    const { data } = await apiClient.post('/admin/estimate-template/seq', { idList });
    return data;
  }
}

export const estimateTemplateApi = new EstimateTemplateApi();