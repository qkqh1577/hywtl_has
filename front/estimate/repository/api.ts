import { EstimateTemplateQuery } from 'estimate/parameter/query';
import {
  EstimateTemplateId,
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'estimate/domain/template';
import apiClient from 'services/api';
import { EstimateTemplateParameter } from 'estimate/parameter/parameter';

class EstimateTemplateApi {
  async getList(query: EstimateTemplateQuery): Promise<EstimateTemplateShort[]> {
    const { data } = await apiClient.get('/standard-data/test-service-templates', query);
    return data;
  }

  async getOne(id: EstimateTemplateId): Promise<EstimateTemplateVO> {
    const { data } = await apiClient.get(`/standard-data/test-service-templates/${id}`);
    return data;
  }

  async upsert(params: EstimateTemplateParameter): Promise<void> {
    const { data } = await apiClient.put(``);
    return data;
  }
}

export const estimateTemplateApi = new EstimateTemplateApi();