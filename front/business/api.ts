import {
  BusinessId,
  BusinessShort,
  BusinessVO,
  InvolvedProjectVO,
  RivalProjectVO
} from './domain';
import apiClient from 'services/api';
import { BusinessQuery } from 'business/query';
import Page from 'type/Page';
import { BusinessParameter } from 'business/parameter';

class BusinessApi {
  async getList(): Promise<BusinessShort[]> {
    const { data } = await apiClient.get('/business', { type: 'as-list' });
    return data;
  }

  async getPage(query: BusinessQuery): Promise<Page<BusinessShort>> {
    const { data } = await apiClient.get('/business', query);
    return data;
  }

  async getOne(id: BusinessId): Promise<BusinessVO> {
    const { data } = await apiClient.get(`/business/${id}`);
    return data;
  }

  async getInvolvedProjectList(id: BusinessId): Promise<InvolvedProjectVO[]> {
    const { data } = await apiClient.get(`/business/${id}/involved-project`, { type: 'as-list' });
    return data;
  }

  async getRivalProjectList(id: BusinessId): Promise<RivalProjectVO[]> {
    const { data } = await apiClient.get(`/business/${id}/rival-project`, { type: 'as-list' });
    return data;
  }

  async upsert(params: BusinessParameter): Promise<void> {
    const { data } = await apiClient.put(`/business${params.id ? `/${params.id}` : ''}`, params);
    return data;
  }
}

export const businessApi = new BusinessApi();
