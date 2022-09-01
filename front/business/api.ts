import {
  BusinessId,
  BusinessShort,
  BusinessVO,
  BusinessInvolvedProjectVO,
  RivalProjectVO
} from './domain';
import apiClient from 'services/api';
import { BusinessQuery } from 'business/query';
import Page from 'type/Page';
import { BusinessParameter } from 'business/parameter';

class BusinessApi {
  async getList(registrationNumber: string): Promise<BusinessShort[]> {
    const { data } = await apiClient.get('/business', { registrationNumber });
    return data;
  }

  async getPage(query: BusinessQuery): Promise<Page<BusinessShort>> {
    const { data } = await apiClient.get('/business', query);
    return data;
  }

  async getOne(id: BusinessId): Promise<BusinessVO> {
    const { data } = await apiClient.get(`/business/${id}`);
    return data;
  }

  async getInvolvedProjectList(id: BusinessId): Promise<BusinessInvolvedProjectVO[]> {
    const { data } = await apiClient.get(`/business/${id}/involved-project`);
    return data;
  }

  async getRivalProjectList(id: BusinessId): Promise<RivalProjectVO[]> {
    // NOTE: for view test
    // return [{
    //   id:           ProjectId(1),
    //   name:         '반포 자이 풍동 실험',
    //   bidBeginDate: dayjs('2020-11-11')
    //                 .toDate(),
    //   bidCloseDate: dayjs('2020-12-01')
    //                 .toDate(),
    //   win:          '한양풍동실험연구소',
    //   code:         '20014',
    // }, {
    //   id:           ProjectId(2),
    //   name:         '반포 자이 풍력 실험',
    //   bidBeginDate: dayjs('2021-01-04')
    //                 .toDate(),
    //   bidCloseDate: dayjs('2021-01-24')
    //                 .toDate(),
    //   win:          '정기업',
    //   code:         '21001',
    // }, {
    //   id:           ProjectId(3),
    //   name:         '반포 자이 풍압 실험',
    //   bidBeginDate: dayjs('2021-02-11')
    //                 .toDate(),
    //   bidCloseDate: dayjs('2020-02-26')
    //                 .toDate(),
    //   win:          '정기업',
    //   code:         '21003',
    // }, {
    //   id:           ProjectId(4),
    //   name:         '반포 자이 풍환경 실험',
    //   bidBeginDate: dayjs('2022-04-16')
    //                 .toDate(),
    //   bidCloseDate: dayjs('2022-04-20')
    //                 .toDate(),
    //   win:          '박기업',
    //   code:         '22004',
    // }];
    const { data } = await apiClient.get(`/business/${id}/rival-project`);
    return data;
  }

  async upsert(params: BusinessParameter): Promise<void> {
    const { data } = await apiClient.put(`/business${params.id ? `/${params.id}` : ''}`, params);
    return data;
  }

  async delete(id:BusinessId): Promise<void>{
    const { data } = await apiClient.delete(`/business/${id}`);
  }

}

export const businessApi = new BusinessApi();
