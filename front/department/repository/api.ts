import apiClient from 'services/common/api';
import { DepartmentQuery } from 'department/parameter/query';
import {
  DepartmentId,
  DepartmentVO
} from 'department/domain/department';
import Page from 'services/common/domain/Page';
import { DepartmentParameter } from 'department/parameter/parameter';

class DepartmentApi {
  async getList(): Promise<DepartmentVO[]> {
    const { data } = await apiClient.get('/departments', { type: 'as-list' });
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<DepartmentVO>> {
    const { data } = await apiClient.get('/departments', query);
    return data;
  }

  async getOne(id: DepartmentId): Promise<DepartmentVO> {
    const { data } = await apiClient.get(`/departments/${id}`);
    return data;
  }

  async upsert(params: DepartmentParameter): Promise<void> {
    const { data } = await apiClient.put(`/departments${params.id ? `/${params.id}` : ''}`, params);
    return data;
  }
}

export const departmentApi = new DepartmentApi();