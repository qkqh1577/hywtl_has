import { ContractBasicVO } from 'admin/contract/basic/domain';
import apiClient from 'services/api';

class ContractBasicApi {

  async getOne(): Promise<ContractBasicVO> {
    const { data } = await apiClient.get('/admin/contract/basic');
    return data;
  }
}

export const contractBasicApi = new ContractBasicApi();