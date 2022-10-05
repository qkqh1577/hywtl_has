import {
  PersonnelId,
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import apiClient, { toFormData } from 'services/api';
import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import { PersonnelParameter } from 'personnel/parameter';

class PersonnelApi {
  async getPage(query: PersonnelQuery): Promise<Page<PersonnelShortVO>> {
    const { data } = await apiClient.get('/personnel', query);
    return data;
  }

  async getOne(id: PersonnelId): Promise<PersonnelVO> {
    const { data } = await apiClient.get(`/personnel/${id}`);
    return data;
  }

  async update(params: PersonnelParameter): Promise<void> {
    const formData = toFormData(params);
    const { data } = await apiClient.put(`/personnel/${params.id}`, formData);
    return data;
  }
}

export const personnelApi = new PersonnelApi();
