import { EstimateTemplateQuery } from 'estimate_template/query';
import {
  EstimateTemplateId,
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'estimate_template/domain';
import apiClient from 'services/api';
import { EstimateTemplateParameter } from 'estimate_template/parameter';

class EstimateTemplateApi {
  async getList(query: EstimateTemplateQuery): Promise<EstimateTemplateShort[]> {
    const { data } = await apiClient.get('/estimate-templates', query);
    return data;
  }

  async getOne(id: EstimateTemplateId): Promise<EstimateTemplateVO> {
    const { data } = await apiClient.get(`/estimate-templates/${id}`);
    return data;
  }

  async upsert(parameter: EstimateTemplateParameter): Promise<void> {
    if (parameter.id) {
      const { data } = await apiClient.patch(`/estimate-templates/${parameter.id}`, parameter);
      return data;
    }
    const { data } = await apiClient.post('/estimate-templates', parameter);
    return data;
  }
}

export const estimateTemplateApi = new EstimateTemplateApi();