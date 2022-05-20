import apiClient from 'services/common/api';
import Page from 'components/Page';
import {
  Business,
  BusinessAddParameter,
  BusinessChangeParameter,
  BusinessDetail,
  BusinessList,
  BusinessQuery,
  BusinessQueryForModal,
} from 'services/business';

export class BusinessApi {
  async getPage(query: BusinessQuery): Promise<Page<BusinessList>> {
    const { data } = await apiClient.get('/business', query);
    return data;
  }

  async getOne(id: number): Promise<BusinessDetail> {
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
}

const businessApi = new BusinessApi();
export default businessApi;