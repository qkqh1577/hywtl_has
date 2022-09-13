import { ContractBasicVO } from 'admin/contract/basic/domain';
import apiClient from 'services/api';
import { ContractBasicParameter } from 'admin/contract/basic/parameter';

class ContractBasicApi {

  async getOne(): Promise<ContractBasicVO> {
    const { data } = await apiClient.get('/admin/contract/basic');
    return data;
  }

  async upsert(params: ContractBasicParameter): Promise<void> {
    const { data } = await apiClient.put('/admin/contract/basic', params);
    return data;
  }
}

export const contractBasicApi = new ContractBasicApi();
