import {
  BusinessId,
  BusinessInvolvedProjectVO,
  BusinessInvolvedType,
  BusinessManagerVO,
  BusinessShortVO,
  BusinessVO,
  RivalProjectVO
} from './domain';
import apiClient from 'services/api';
import { BusinessQuery } from 'business/query';
import Page from 'type/Page';
import { BusinessParameter } from 'business/parameter';

class BusinessApi {
  async getList(registrationNumber: string): Promise<BusinessShortVO[]> {
    const { data } = await apiClient.get('/business', { registrationNumber });
    return data;
  }

  async getListAll(query: BusinessQuery): Promise<BusinessShortVO[]> {
    const { data } = await apiClient.get('/business/all', query);
    return data;
  }

  async getPage(query: BusinessQuery): Promise<Page<BusinessShortVO>> {
    const { data } = await apiClient.get('/business', query);
    return data;
  }

  async getOne(id: BusinessId): Promise<BusinessVO> {
    const { data } = await apiClient.get(`/business/${id}`);
    return data;
  }

  async getInvolvedProjectList(id: BusinessId,
                               type?: BusinessInvolvedType
  ): Promise<BusinessInvolvedProjectVO[]> {
    const { data } = await apiClient.get(`/business/${id}/involved-project`, { type });
    return data;
  }

  async getRivalProjectList(id: BusinessId): Promise<RivalProjectVO[]> {
    const { data } = await apiClient.get(`/business/${id}/rival-project`);
    return data;
  }

  async upsert(params: BusinessParameter): Promise<void> {
    const { data } = await apiClient.put(`/business${params.id ? `/${params.id}` : ''}`, params);
    return data;
  }

  async delete(id: BusinessId): Promise<void> {
    const { data } = await apiClient.delete(`/business/${id}`);
    return data;
  }

  async getManagerList(id: BusinessId): Promise<BusinessManagerVO[]> {
    const { data } = await apiClient.get(`/business/${id}/manager-list`);
    return data;
  }

}

export const businessApi = new BusinessApi();
