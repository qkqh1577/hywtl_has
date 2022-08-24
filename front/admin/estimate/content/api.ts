import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShort,
  EstimateContentVO,
  TestType
} from 'admin/estimate/content/domain';
import apiClient from 'services/api';
import { EstimateContentDetailId } from 'admin/estimate/content/domain/estimateContentDetail';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';


class EstimateContentApi {

  async getList(query: EstimateContentQuery): Promise<EstimateContentShort[]> {
    return Promise.resolve(
      [
        {
          id:          EstimateContentId(1),
          name:        'test1',
          testType:    [TestType.A, TestType.E],
          detailCount: 5
        },
        {
          id:          EstimateContentId(2),
          name:        'test2',
          testType:    [TestType.A, TestType.B],
          detailCount: 2
        },
        {
          id:          EstimateContentId(3),
          name:        'test3',
          testType:    [TestType.COMMON, TestType.REVIEW],
          detailCount: 3
        }
      ]
    );
    // const { data } = await apiClient.get('/admin/estimate/content', query);
    // return data;
  }

  async getOne(id: EstimateContentId): Promise<EstimateContentVO> {
    // const { data } = await apiClient.get(`/admin/estimate/content/${id}`);
    // return data;
    return Promise.resolve(
        {
          id:          EstimateContentId(1),
          name:        'test1',
          testType:    [TestType.A, TestType.B],
          detailList: [
            {
              id: EstimateContentDetailId(1),
              description: '건축구조기준(KDS)에 규정된 특별풍하중 조건을 검토한 결과(별첨), 총 x건'
            },
            {
              id: EstimateContentDetailId(2),
              description: '(3)항은 풍압실험에서 대상 건축물 외형에 작용하는 풍압을 정밀하게 측정하고, 확률-통계적으로 외장재설계용 풍하중을 평가함'
            }
          ]
        }
    );
  }

  async upsert(parameter: EstimateContentParameter): Promise<void> {
    if (parameter.id) {
      const { data } = await apiClient.put(`/admin/estimate/content${parameter.id ? `/${parameter.id}` : ''}`, parameter);
      return data;
    }
  }

  async delete(id:EstimateContentId): Promise<void>{
    await apiClient.delete(`/admin/estimate/content/${id}`);
  }

  async changeSeq(idList: EstimateContentId[]): Promise<void> {
    const { data } = await apiClient.post('/admin/estimate/content/sequence');
    return data;
  }

}

export const estimateContentApi = new EstimateContentApi();
