import axios from 'axios';
import Page from 'components/Page';
import queryString from 'qs';
import Department, { ListDepartment } from 'services/department/entity';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter, DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';

export class DepartmentApi {
  async getAll(): Promise<ListDepartment[]> {
    const { data } = await axios.get('/departments/all');
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<ListDepartment>> {
    const { data } = await axios.get('/departments', {
      params: query,
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async getOne(id: number): Promise<Department> {
    const { data } = await axios.get(`/departments/${id}`);
    return data;
  }

  async add(params: DepartmentAddParameter): Promise<Department> {
    const { data } = await axios.post('/departments', params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async change(params: DepartmentChangeParameter): Promise<Department> {
    const { id } = params;
    const { data } = await axios.patch(`/departments/${id}`, params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async changeTree(params: DepartmentChangeTreeParameter): Promise<ListDepartment[]> {
    const { data } = await axios.post('/departments/tree', params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }
}

const departmentApi = new DepartmentApi();
export default departmentApi;
