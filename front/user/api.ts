import apiClient from 'services/api';
import Page from 'type/Page';
import { UserQuery } from 'user/query';
import {
  UserId,
  UserVO
} from 'user/domain';
import { UserChangeParameter, LoginUserEditParameter } from 'user/parameter';

class UserApi {
  async getPage(query: UserQuery): Promise<Page<UserVO>> {
    const { data } = await apiClient.get('/users', query);
    return data;
  }

  async getList(): Promise<UserVO[]> {
    const { data } = await apiClient.get('/users/all');
    return data;
  }

  async getOne(id: UserId): Promise<UserVO> {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  }

  async change(parameter: UserChangeParameter): Promise<void> {
    const { id, ...rest } = parameter;
    const { data } = await apiClient.patch(`/users/${id}`, rest);
    return data;
  }

  async edit(parameter: LoginUserEditParameter): Promise<void> {
    const { result } = await apiClient.post('user/login', parameter);
    return result;
  }
}

export const userApi = new UserApi();
