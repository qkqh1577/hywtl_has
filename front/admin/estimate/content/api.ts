import { EstimateContentQuery } from 'admin/estimate/content/query';
import { EstimateContentShort } from 'admin/estimate/content/domain';
import apiClient from 'services/api';


class EstimateContentApi{

  async getList(query: EstimateContentQuery):Promise<EstimateContentShort>{
    const { data } = await apiClient.get('/admin/estimate/content', query)
    return data;
  }

}

export const estimateContentApi = new EstimateContentApi();
