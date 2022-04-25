import Page from 'components/Page';
import apiClient from 'services/common/api';
import Department, { ListDepartment } from 'services/department/entity';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter, DepartmentChangeTreeParameter,
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

  async add(params: DepartmentAddParameter): Promise<Department> {
    const { data } = await apiClient.post('/departments', params);
    return data;
  }

  async change(params: DepartmentChangeParameter): Promise<Department> {
    const { id } = params;
    const { data } = await apiClient.patch(`/departments/${id}`, params);
    return data;
  }

  async changeTree(params: DepartmentChangeTreeParameter): Promise<ListDepartment[]> {
    const { data } = await apiClient.post('/departments/tree', params);
    return data;
  }
}

const departmentApi = new DepartmentApi();
export default departmentApi;
