import { ContractCollectionVO } from 'admin/contract/collection/domain';
import apiClient from 'services/api';
import { ContractCollectionParameter } from 'admin/contract/collection/parameter';

class ContractCollectionApi {
  async getOne(): Promise<ContractCollectionVO> {
    const { data } = await apiClient.get('/admin/contract-collection');
    return data;
  }

  async upsert(params: ContractCollectionParameter): Promise<void> {
    const { data } = await apiClient.put('/admin/contract-collection', params);
    return data;
  }
}

export const contractCollectionApi = new ContractCollectionApi();
