import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShort,
  EstimateContentVariableVO,
  EstimateContentVO,
  TestType
} from 'admin/estimate/content/domain';
import apiClient from 'services/api';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';


const testShortData: EstimateContentShort[] = [
  {
    id:           EstimateContentId(1),
    name:         'test1',
    testTypeList: [TestType.A, TestType.E],
    detailCount:  5
  },
  {
    id:           EstimateContentId(2),
    name:         'test2',
    testTypeList: [TestType.A, TestType.B],
    detailCount:  2
  },
  {
    id:           EstimateContentId(3),
    name:         'test3',
    testTypeList: [TestType.COMMON, TestType.REVIEW],
    detailCount:  3
  }
];

const testData: EstimateContentVO[] = [
  {
    id:           EstimateContentId(1),
    name:         'test1',
    testTypeList: [TestType.A, TestType.E],
    detailList:   [
      '건축구조기준(KDS)에 규정된 특별풍하중 조건을 검토한 결과(별첨), 총 x건',
      '(3)항은 풍압실험에서 대상 건축물 외형에 작용하는 풍압을 정밀하게 측정하고, 확률-통계적으로 외장재설계용 풍하중을 평가함',
      '3번 내용물',
      '4번 내용물',
      '5번 내용물',
    ],
  },
  {
    id:           EstimateContentId(2),
    name:         'test2',
    testTypeList: [TestType.A, TestType.B],
    detailList:   [
      '건축구조기준(KDS)에 규정된 특별풍하중 조건을 검토한 결과(별첨), 총 x건',
      '(3)항은 풍압실험에서 대상 건축물 외형에 작용하는 풍압을 정밀하게 측정하고, 확률-통계적으로 외장재설계용 풍하중을 평가함'
    ]
  },
  {
    id:           EstimateContentId(3),
    name:         'test3',
    testTypeList: [TestType.COMMON, TestType.REVIEW],
    detailList:   [
      '8번 내용, 건축구조기준(KDS)에 규정된 특별풍하중 조건을 검토한 결과(별첨), 총 x건',
      '9번 내용, (3)항은 풍압실험에서 대상 건축물 외형에 작용하는 풍압을 정밀하게 측정하고, 확률-통계적으로 외장재설계용 풍하중을 평가함',
      '10번 내용, (3)항은 풍압실험에서 대상 건축물 외형에 작용하는 풍압을 정밀하게 측정하고, 확률-통계적으로 외장재설계용 풍하중을 평가함',
    ]
  }
];

const variableTestData: EstimateContentVariableVO[] = [
  {
    name: '{experiment_num}',
    note: '실험동수'
  },
  {
    name: '{total_apartment_num}',
    note: '총 동 수',
  },
  {
    name: '{experiment_week}',
    note: '설풍 납품 가능 주',
  },
  {
    name: '{report_week}',
    note: '최종보고서 납품 가능 주',
  },
  {
    name: '{total_price}',
    note: '총 금액(부가세 미포함)',
  },
  {
    name: '{total_price_kor}',
    note: '한글 표기 총 금액(부가세 미포함)',
  }
];

class EstimateContentApi {

  async getList(query: EstimateContentQuery): Promise<EstimateContentShort[]> {
    const { data } = await apiClient.get('/admin/estimate/content', query);
    return Promise.resolve(testShortData);
    // return data;
  }

  async getOne(id: EstimateContentId): Promise<EstimateContentVO> {
    // const { data } = await apiClient.get(`/admin/estimate/content/${id}`);
    // return data;
    return Promise.resolve(
      testData.filter(item => item.id === id)[0]
    );
  }

  async upsert(parameter: EstimateContentParameter): Promise<void> {
    const { data } = await apiClient.put(`/admin/estimate/content${parameter.id ? `/${parameter.id}` : ''}`, parameter);
    return data;
  }

  async delete(id: EstimateContentId): Promise<void> {
    await apiClient.delete(`/admin/estimate/content/${id}`);
  }

  async changeSeq(idList: EstimateContentId[]): Promise<void> {
    const { data } = await apiClient.post('/admin/estimate/content/sequence');
    return data;
  }

  async getVariableList(): Promise<EstimateContentVariableVO[]> {
    // const { data } = await apiClient.get('/admin/estimate/content/variable');
    // return data;
    return variableTestData;
  }
}

export const estimateContentApi = new EstimateContentApi();
