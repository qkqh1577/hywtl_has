import { ContractBasicVO } from 'admin/contract/basic/domain';
import apiClient from 'services/api';
import { ContractBasicParameter } from 'admin/contract/basic/parameter';

const testData: ContractBasicVO = {
  serviceDuration:     '용역 개시일(착수보고 시) ~ 용역완료일(최종보고서 인도)',
  collectionStageNote: '다음의 기성단계 별 해당 금액을 현금으로 지급',
  outcome:             '최종 보고서 5부(인쇄본)과 1개 전자본(PDF 파일)',
  description:         '본 풍동실험 용역을 체결함에 있어서 발주자 (이하 갑)와 수급자(이하 을)는 위의 내용을 상호 확인하고 내용이 보여지는 영역입니다. ' +
                         '내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 ' +
                         '보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.' +
                         '내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 ' +
                         '보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.' +
                         '내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 ' +
                         '보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.' +
                         '내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 ' +
                         '보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.' +
                         '내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 ' +
                         '보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.' +
                         '내용이 보여지는 영역입니다.내용이 보여지는 영역입니다.내용이 ' +
                         '보여지는 영역입니다.',
  contractor:          {
    address:     '경기도 안산시 상록구 한양대학로 55, 한양대학교 풍환경실험관 2층',
    companyName: '(주)한양풍동실험연구소',
    ceoName:     '김철수',
  },

};

class ContractBasicApi {

  async getOne(): Promise<ContractBasicVO> {
    // const { data } = await apiClient.get('/admin/contract/basic');
    // return data;
    return testData;
  }

  async upsert(params: ContractBasicParameter): Promise<void> {
    console.log('params : ', params);
    const { data } = await apiClient.put('/admin/contract/basic');
    return data;
  }
}

export const contractBasicApi = new ContractBasicApi();
