import apiClient from 'services/api';
import { DepartmentQuery } from 'department/query';
import {
  DepartmentId,
  DepartmentShortVO,
  DepartmentVO
} from 'department/domain';
import Page from 'type/Page';
import { DepartmentParameter } from 'department/parameter';

class DepartmentApi {
  async getList(): Promise<DepartmentShortVO[]> {
    const { data } = await apiClient.get('/department/all');
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<DepartmentShortVO>> {
    const { data } = await apiClient.get('/department', query);
    return data;
  }

  async getOne(id: DepartmentId): Promise<DepartmentVO> {
    const { data } = await apiClient.get(`/department/${id}`);
    return data;
  }

  async upsert(parameter: DepartmentParameter): Promise<void> {
    const { data } = await apiClient.put(`/department${parameter.id ? `/${parameter.id}` : ''}`, parameter);
    return data;
  }

  async deleteOne(id: DepartmentId): Promise<void> {
    const { data } = await apiClient.delete(`/department/${id}`);
    return data;
  }
}

export const departmentApi = new DepartmentApi();