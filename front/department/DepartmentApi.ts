import axios from 'axios';
import Department from 'department/Department';
import { DepartmentAddParameter } from 'department/DepartmentParameter';

export class DepartmentApi {
  async getOne(id: number): Promise<Department> {
    const { data } = await axios.get(`/departments/${id}`);
    return data;
  }

  async add(params: DepartmentAddParameter): Promise<Department> {
    const { data } = await axios.post('/departments', params);
    return data;
  }
}

export default new DepartmentApi();