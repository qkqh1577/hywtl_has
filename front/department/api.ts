import apiClient from 'services/api';
import { DepartmentQuery } from 'department/query';
import {
  DepartmentId,
  DepartmentShort,
  DepartmentVO
} from 'department/domain';
import Page from 'type/Page';
import { DepartmentParameter } from 'department/parameter';

class DepartmentApi {
  async getList(): Promise<DepartmentShort[]> {
    const { data } = await apiClient.get('/departments', { type: 'as-list' });
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<DepartmentShort>> {
    const { data } = await apiClient.get('/departments', query);
    return data;
  }

  async getOne(id: DepartmentId): Promise<DepartmentVO> {
    const { data } = await apiClient.get(`/departments/${id}`);
    return data;
  }

  async upsert(parameter: DepartmentParameter): Promise<void> {
    const { data } = await apiClient.put(`/departments${parameter.id ? `/${parameter.id}` : ''}`, parameter);
    return data;
  }
}

export const departmentApi = new DepartmentApi();