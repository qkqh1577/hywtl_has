import apiClient from 'services/common/api';
import Page from 'components/Page';
import {
  AddUserParameter,
  ChangeUserParameter,
  ChangeUserPasswordParameter,
  ListUser,
  LoginParameter,
  User,
  UserQuery,
} from 'services/user';
import { PasswordChangeParameter } from 'services/user/password_reset';

class UserApi {
  async getPage(query: UserQuery): Promise<Page<ListUser>> {
    const { data } = await apiClient.get('/users', query);
    return data;
  }

  async getAll(): Promise<ListUser[]> {
    const { data } = await apiClient.get('/users/all');
    return data;
  }

  async getOne(id: number): Promise<User> {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  }

  async add(params: AddUserParameter): Promise<User> {
    const { data } = await apiClient.post('/user/invite', params);
    return data;
  }

  async validatePassword(params: PasswordChangeParameter): Promise<void> {
    const { data } = await apiClient.post('/user/password-validate', params);
    return data;
  }

  async resetPassword(id: number): Promise<void> {
    const { data } = await apiClient.post(`/users/${id}/reset-password`);
    return data;
  }

  async change(params: ChangeUserParameter): Promise<User> {
    const { id, ...rest } = params;
    const { data } = await apiClient.patch(`/users/${id}`, rest);
    return data;
  }

  async changePassword(params: ChangeUserPasswordParameter): Promise<User> {
    const { id, ...rest } = params;
    const { data } = await apiClient.patch(`/users/${id}/password`, rest);
    return data;
  }

  async getLogin(): Promise<User> {
    const { data } = await apiClient.get('/users/login');
    return data;
  }

  async login(params: LoginParameter): Promise<User> {
    const form = new FormData();
    form.append('username', params.username);
    form.append('password', params.password);
    const { data } = await apiClient.post('/login', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  }

  async logout(): Promise<any> {
    const form = new FormData();
    const { data } = await apiClient.post('/logout', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  }
}

const userApi = new UserApi();
export default userApi;
