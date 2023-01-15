import axios from 'axios';
import Page from 'type/Page';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter, DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';
import Department, {ListDepartment} from "./entity";

export class DepartmentApi {
  async getAll(): Promise<ListDepartment[]> {
    const {data} = await axios.get('/department/all');
    return data;
  }

  async getPage(query: DepartmentQuery): Promise<Page<ListDepartment>> {
    const {data} = await axios.get('/department', {
      params: query,
      paramsSerializer: {
        indexes: null,
      }
    });
    return data;
  }

  async getOne(id: number): Promise<Department> {
    const {data} = await axios.get(`/department/${id}`);
    return data;
  }

  async add(params: DepartmentAddParameter): Promise<Department> {
    const {data} = await axios.post('/department', params, {
      paramsSerializer: {
        indexes: null,
      }
    });
    return data;
  }

  async change(params: DepartmentChangeParameter): Promise<Department> {
    const {id} = params;
    const {data} = await axios.patch(`/department/${id}`, params, {
      paramsSerializer: {
        indexes: null,
      }
    });

    return data;
  }

  async changeTree(params: DepartmentChangeTreeParameter): Promise<ListDepartment[]> {
    const {data} = await axios.post('/department/tree', params, {
      paramsSerializer: {
        indexes: null,
      }
    });
    return data;
  }
}

const departmentApi = new DepartmentApi();
export default departmentApi;
