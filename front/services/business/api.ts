import apiClient from 'services/common/api';
import Page from 'services/common/domain/Page';
import {
  Business,
  BusinessAddParameter,
  BusinessChangeParameter,
  BusinessQuery,
  BusinessQueryForModal,
  BusinessRegistrationNumberCheckParameter,
  BusinessShort,
} from 'services/business';

export class BusinessApi {
  async getPage(query: BusinessQuery): Promise<Page<BusinessShort>> {
    const { data } = await apiClient.get('/business', query);
    return data;
  }

  async getOne(id: number): Promise<Business> {
    const { data } = await apiClient.get(`/business/${id}`);
    return data;
  }

  async getAll(query: BusinessQueryForModal): Promise<Business[]> {
    const { data } = await apiClient.get('/business/all', query);
    return data;
  }

  async add(params: BusinessAddParameter): Promise<Business> {
    const { data } = await apiClient.post('/business', params);
    return data;
  }

  async change(params: BusinessChangeParameter): Promise<Business> {
    const { id, ...rest } = params;
    const { data } = await apiClient.patch(`/business/${id}`, rest);
    return data;
  }

  async remove(id: number): Promise<void> {
    const { data } = await apiClient.delete(`/business/${id}`);
    return data;
  }

  async checkRegistrationNumber(params: BusinessRegistrationNumberCheckParameter) : Promise<void> {
    const { data } = await apiClient.post('/business/registration-number/check', params);
    return data;
  }
}

const businessApi = new BusinessApi();
export default businessApi;