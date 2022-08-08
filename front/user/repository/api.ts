import apiClient from 'services/common/api';
import Page from 'services/common/domain/Page';
import { UserQuery } from 'user/parameter/query';
import { UserVO } from 'user/domain/user';

class UserApi {
  async getPage(query: UserQuery): Promise<Page<UserVO>> {
    const { data } = await apiClient.get('/users', query);
    return data;
  }

  async getList(): Promise<UserVO[]> {
    const { data } = await apiClient.get('/users/all');
    return data;
  }

  async getOne(id: number): Promise<UserVO> {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  }
}

export const userApi = new UserApi();
