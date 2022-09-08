import {
  ContractConditionId,
  ContractConditionVO,
  ContractConditionVOFromServer
} from 'admin/contract/condition/domain';
import apiClient from 'services/api';
import { ContractConditionParameter } from 'admin/contract/condition/parameter';

const testData = [
  {
    id: ContractConditionId(1),
    title: "제 1조 목적",
    descriptionList: [
      "본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다.",
      "2본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다.",
      "3본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다."
    ],
  },
  {
    id: ContractConditionId(2),
    title: "제 2조 목적",
    descriptionList: [
      "본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다.",
      "2본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다.",
      "3본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다."
    ],
  },
  {
    id: ContractConditionId(3),
    title: "제 3조 목적",
    descriptionList: [
      "본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다.",
      "2본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다.",
      "3본 계약의 목적은 갑과 을의 상호 신뢰를 바탕으로 원활한 수행하기 위함이다."
    ],
  }
];

class ContractConditionApi {
  async getOne(): Promise<ContractConditionVOFromServer[]> {
  //   const { data } = await apiClient.get('/admin/contract/condition');
  //   return data;
    return testData;
  }

  async upsert(params: ContractConditionParameter): Promise<void> {
    const { data } = await apiClient.put('/admin/contract/condition', params);
    return data;
  }
}

export const contractConditionApi = new ContractConditionApi();
