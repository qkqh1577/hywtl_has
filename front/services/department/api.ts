import Page from 'services/common/domain/Page';
import apiClient from 'services/common/api';
import {
  Department,
  DepartmentChangeTreeParameter,
  DepartmentParameter,
  DepartmentQuery,
  DepartmentShort,
} from 'services/department';

class DepartmentApi {
  async getAll(type?: string): Promise<DepartmentShort[]> {
    const { data } = await apiClient.get('/departments', {
      type: type ?? 'as-list'
    });
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<DepartmentShort>> {
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

  async changeTree(params: DepartmentChangeTreeParameter): Promise<DepartmentShort[]> {
    const { data } = await apiClient.post('/departments/tree', params);
    return data;
  }
}

const departmentApi = new DepartmentApi();
export default departmentApi;
