import axios from 'axios';
import Page from 'common/Page';
import queryString from 'qs';
import Department, { ListDepartment } from './Department';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter,
  DepartmentQuery
} from './parameter';

export class DepartmentApi {
  async getAll(): Promise<Department[]> {
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
}

const departmentApi = new DepartmentApi();
export default departmentApi;
