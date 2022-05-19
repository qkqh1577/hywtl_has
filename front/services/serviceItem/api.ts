import apiClient from 'services/common/api';
import {
  ServiceItemQuery,
  ServiceItemList,
  ServiceItemDetail,
  ServiceItemParameter,
  ServiceItemOrderList
} from 'services/serviceItem';

export class ServiceItemApi {
  async getList(query: ServiceItemQuery): Promise<ServiceItemList[]> {
    const { data } = await apiClient.get('/serviceItems', query);
    return data;
  }

  async getOne(id: number): Promise<ServiceItemDetail> {
    const { data } = await apiClient.get(`/serviceItems/${id}`);
    return data;
  }

  async getOrderList(): Promise<ServiceItemOrderList[]> {
    const { data } = await apiClient.get('/serviceItems/order');
    return data;
  }

  async add(params: ServiceItemParameter): Promise<ServiceItemDetail> {
    const { data } = await apiClient.post('/serviceItems', params);
    return data;
  }
}

const serviceItemApi = new ServiceItemApi();
export default serviceItemApi;