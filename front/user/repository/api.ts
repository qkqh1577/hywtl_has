import apiClient from 'services/common/api';
import Page from 'services/common/domain/Page';
import { UserQuery } from 'user/parameter/query';
import {
  UserId,
  UserVO
} from 'user/domain/user';
import UserChangeParameter from 'user/parameter/ChangeParamter';

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

  async change(params: UserChangeParameter): Promise<void> {
    const { id, ...rest } = params;
    const { data } = await apiClient.patch(`/users/${id}`, rest);
    return data;
  }
}

export const userApi = new UserApi();
