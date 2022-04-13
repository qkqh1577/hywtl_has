import axios from 'axios';
import queryString from 'qs';
import Page from 'common/Page';
import {
  AddUserParameter,
  ChangeUserParameter,
  ChangeUserPasswordParameter, LoginParameter,
  UserQuery
} from './parameter';
import User, { ListUser } from './User';

export class UserApi {
  async getPage(query: UserQuery): Promise<Page<ListUser>> {
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

  async add(params: AddUserParameter): Promise<User> {
    const { data } = await axios.post('/users', params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async resetPassword(id: number): Promise<User> {
    const { data } = await axios.post(`/users/${id}/password/reset`);
    return data;
  }

  async change(params: ChangeUserParameter): Promise<User> {
    const { id, ...rest } = params;
    const { data } = await axios.patch(`/users/${id}`, rest, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async changePassword(params: ChangeUserPasswordParameter): Promise<User> {
    const { id, ...rest } = params;
    const { data } = await axios.patch(`/users/${id}/password`, rest, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }

  async getLogin(): Promise<User> {
    const { data } = await axios.get('/users/login');
    return data;
  }

  async login(params: LoginParameter): Promise<User> {
    const form = new FormData();
    form.append('username', params.username);
    form.append('password', params.password);
    const { data } = await axios.post('/login', form);
    return data;
  }

  async logout(): Promise<any> {
    const form = new FormData();
    const { data } = await axios.post('/logout', form);
    return data;
  }

}

const userApi = new UserApi();
export default userApi;
