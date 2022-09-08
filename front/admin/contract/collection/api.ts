import {
  ContractCollectionVO,
  ExpectedDateType
} from 'admin/contract/collection/domain';
import apiClient from 'services/api';
import { ContractCollectionParameter } from 'admin/contract/collection/parameter';

const testData = {
  stageList: [
    {
      name: '계약금',
      ratio: 30,
      note: '계약체결 시',
      expectedDate: ExpectedDateType.CONTRACT_DAY,
    },
    {
      name: '중도금',
      ratio: 50,
      note: '구조설계용 풍하중 납품(구조심의 접수시)',
      expectedDate: ExpectedDateType.DAY_TO_DELIVER_THOUGH_SNOW_AND_WIND,
    },
    {
      name: '계약금',
      ratio: 20,
      note: '최종보고서 납품(구조심의 완료시)',
      expectedDate: ExpectedDateType.DAY_TO_DELiVER_FOE_FINAL_REPORT,
    },
  ],
  totalAmountNote: 'vat 포함',
}

class ContractCollectionApi {
  async getOne(): Promise<ContractCollectionVO> {
    // const { data } = await apiClient.get('/admin/contract/collection');
    // return data;
    return testData;
  }

  async upsert(params: ContractCollectionParameter): Promise<void> {
    const { data } = await apiClient.put('/admin/contract/collection', params);
    return data;
  }
}

export const contractCollectionApi = new ContractCollectionApi();
