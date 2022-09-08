import { ContractConditionVO } from 'admin/contract/condition/domain';
import apiClient from 'services/api';
import { ContractConditionParameter } from 'admin/contract/condition/parameter';

class ContractConditionApi {
  async getOne(): Promise<ContractConditionVO> {
    const { data } = await apiClient.get('/admin/contract/condition');
    return data;
  }

  async upsert(params: ContractConditionParameter): Promise<void> {
    const { data } = await apiClient.put('/admin/contract/collection', params);
    return data;
  }
}

export const contractConditionApi = new ContractConditionApi();
