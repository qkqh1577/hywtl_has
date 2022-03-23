import { UserAddParameter, UserChangeParameter, UserQuery } from './parameter';
import Page from 'common/Page';
import User from './User';
import axios from 'axios';

export class UserApi {
  async getPage(query: UserQuery): Promise<Page<User>> {
    const { data } = await axios.get('/users', {
      params: query
    });
    return data;
  }

  async getOne(id: number): Promise<User> {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }

  async add(params: UserAddParameter): Promise<User> {
    const { data } = await axios.post('/users', params);
    return data;
  }

  async change(params: UserChangeParameter): Promise<User> {
    const { id, ...rest } = params;
    const { data } = await axios.patch(`/users/${id}`, rest);
    return data;
  }
}

const userApi = new UserApi();
export default userApi;