import Page from 'components/Page';
import apiClient from 'services/common/api';
import Department, { ListDepartment } from 'services/department/entity';
import {
  DepartmentParameter,
  DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';

export class DepartmentApi {
  async getAll(): Promise<ListDepartment[]> {
    const { data } = await apiClient.get('/departments/all');
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<ListDepartment>> {
    const { data } = await apiClient.get('/departments', query);
    return data;
  }

  async getOne(id: number): Promise<Department> {
    const { data } = await apiClient.get(`/departments/${id}`);
    return data;
  }

  async upsert(params: DepartmentParameter): Promise<Department> {
    const { data } = await apiClient.put(`/departments${params.id ? `/${params.id}` : ''}`, params);
    return data;
  }

  async changeTree(params: DepartmentChangeTreeParameter): Promise<ListDepartment[]> {
    const { data } = await apiClient.post('/departments/tree', params);
    return data;
  }
}

const departmentApi = new DepartmentApi();
export default departmentApi;
