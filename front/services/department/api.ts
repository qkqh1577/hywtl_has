import axios from 'axios';
import Department from './Department';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter,
  DepartmentQuery
} from './parameter';
import Page from 'common/Page';

export class DepartmentApi {
  async getPage(query: DepartmentQuery): Promise<Page<Department>> {
    const { data } = await axios.get('/departments', {
      params: query
    });
    return data;
  }

  async getOne(id: number): Promise<Department> {
    const { data } = await axios.get(`/departments/${id}`);
    return data;
  }

  async add(params: DepartmentAddParameter): Promise<Department> {
    const { data } = await axios.post('/departments', params);
    return data;
  }

  async change(params: DepartmentChangeParameter): Promise<Department> {
    const { id } = params;
    const { data } = await axios.patch(`/departments/${id}`, params);
    return data;
  }

  async changeParent(params: { id: number; parentId?: number; }): Promise<Department> {
    const { id, parentId } = params;
    const { data } = await axios.patch(`/departments/${id}/parent`, {
      parentId,
    });
    return data;
  }
}

export default new DepartmentApi();