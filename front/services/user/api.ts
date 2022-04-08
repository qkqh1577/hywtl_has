import axios from 'axios';
import queryString from 'qs';
import Page from 'common/Page';
import { UserAddParameter, UserChangeParameter, UserQuery } from './parameter';
import User from './User';

export class UserApi {
  async getPage(query: UserQuery): Promise<Page<User>> {
    const { data } = await axios.get('/users', {
      params: query,
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
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