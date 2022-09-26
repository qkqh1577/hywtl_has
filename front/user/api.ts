import apiClient, { toFormData } from 'services/api';
import Page from 'type/Page';
import { UserQuery } from 'user/query';
import {
  UserId,
  UserVO
} from 'user/domain';
import {
  LoginUserEditParameter,
  UserChangeParameter
} from 'user/parameter';

class UserApi {
  async getPage(query: UserQuery): Promise<Page<UserVO>> {
    const { data } = await apiClient.get('/admin/user', query);
    return data;
  }

  async getList(keyword?: string): Promise<UserVO[]> {
    const { data } = await apiClient.get('/user', { keyword });
    return data;
  }

  async getOne(id: UserId): Promise<UserVO> {
    const { data } = await apiClient.get(`/admin/user/${id}`);
    return data;
  }

  async change(parameter: UserChangeParameter): Promise<void> {
    const { id, ...rest } = parameter;
    const { data } = await apiClient.patch(`/admin/user/${id}`, rest);
    return data;
  }

  async edit(params: LoginUserEditParameter): Promise<void> {
    const { data } = await apiClient.post('/user/login', toFormData(params));
    return data;
  }
}

export const userApi = new UserApi();
