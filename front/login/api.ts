import apiClient, { toFormData } from 'services/api';
import { LoginVO } from 'login/domain';
import {
  LoginChangeParameter,
  LoginParameter,
  PasswordChangeParameter,
} from 'login/parameter';

class LoginApi {
  async login(parameter: LoginParameter): Promise<void> {
    const { data } = await apiClient.post('/login', toFormData(parameter));
    return data;
  }

  async get(): Promise<LoginVO> {
    const { data } = await apiClient.get('/user/login');
    return data;
  }

  async change(params: LoginChangeParameter): Promise<void> {
    const { data } = await apiClient.put('/user/login', toFormData(params));
    return data;
  }

  async logout(): Promise<void> {
    const { data } = await apiClient.post('/logout', new FormData());
    return data;
  }

  async changePassword(params: PasswordChangeParameter): Promise<void> {
    const { data } = await apiClient.patch(`/admin/user/${params.id}/password`, params);
    return data;
  }
}

export const loginApi = new LoginApi();
