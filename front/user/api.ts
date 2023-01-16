import apiClient from 'services/api';
import Page from 'type/Page';
import { UserQuery } from 'user/query';
import {
  UserId,
  UserVO
} from 'user/domain';
import {
  UserAddParameter,
  UserInviteParameter,
  UserChangeParameter,
  UserPasswordChangeParameter
} from 'user/parameter';
import { UrlValidateParameter } from 'login/parameter';

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
    const { data } = await apiClient.put(`/admin/user/${id}`, rest);
    return data;
  }

  async add(parameter: UserAddParameter): Promise<UserVO> {
    const { ...rest } = parameter;
    const { data } = await apiClient.post('/user', rest);
    return data;
  }

  async authenticateInvitation(parameter: UserInviteParameter): Promise<UserVO> {
    const { email, authKey } = parameter;
    const { data } = await apiClient.get(`/user-verification/user-invitation/authenticate`, { email, authKey });
    return data;
  }

  async invite(parameter: UserInviteParameter): Promise<void> {
    const { ...rest } = parameter;
    const { data } = await apiClient.post(`/user-verification/user-invitation`, rest);
    return data;
  }

  async requestChangePasswordEmail(params: UserPasswordChangeParameter): Promise<void> {
    const { data } = await apiClient.post(`/user-verification/password-reset`, params);
    return data;
  }

  async validateUrlForPasswordReset(params: UrlValidateParameter): Promise<void> {
    const { data } = await apiClient.get(`/user-verification/password-reset/validate`, params);
    return data;
  }
}

export const userApi = new UserApi();
