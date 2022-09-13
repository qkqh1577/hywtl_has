import {
  ContractConditionListVO,
  ContractConditionVariableVO,
} from 'admin/contract/condition/domain';
import apiClient from 'services/api';
import { ContractConditionParameter } from 'admin/contract/condition/parameter';

class ContractConditionApi {
  async getOne(): Promise<ContractConditionListVO> {
    const { data } = await apiClient.get('/admin/contract/condition');
    return data;
  }

  async upsert(params: ContractConditionParameter): Promise<void> {
    const { data } = await apiClient.put('/admin/contract/condition', params);
    return data;
  }

  async getVariableList(): Promise<ContractConditionVariableVO[]> {
    const { data } = await apiClient.get('/admin/contract/condition/variable');
    return data;
  }
}

export const contractConditionApi = new ContractConditionApi();
