import { EstimateContentQuery } from 'admin/estimate/content/query';
import {
  EstimateContentId,
  EstimateContentShort,
  TestType
} from 'admin/estimate/content/domain';
import apiClient from 'services/api';
import { EstimateContentDetailId } from 'admin/estimate/content/domain/estimateContentDetail';


class EstimateContentApi {

  async getList(query: EstimateContentQuery): Promise<EstimateContentShort[]> {
    return Promise.resolve(
      [
        {
          id:          EstimateContentId(1),
          name:        'test1',
          testType:    TestType.A,
          detailCount: 5
        },
        {
          id:          EstimateContentId(2),
          name:        'test2',
          testType:    TestType.B,
          detailCount: 2
        },
        {
          id:          EstimateContentId(3),
          name:        'test3',
          testType:    TestType.E,
          detailCount: 3
        }
      ]
    );
    // const { data } = await apiClient.get('/admin/estimate/content', query);
    // return data;
  }

}

export const estimateContentApi = new EstimateContentApi();
