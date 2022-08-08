import { LoginParameter } from 'App/domain/parameter';
import apiClient from 'services/common/api';
import { LoginUser } from 'App/domain/loginEntity';

class LoginUserApi {
  async login(params: LoginParameter): Promise<void> {
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

  async getLoginUser(): Promise<LoginUser> {
    const { data } = await apiClient.get('/users/login');
    return data;
  }

  async logout(): Promise<void> {
    const form = new FormData();
    const { data } = await apiClient.post('/logout', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  }
}

export const loginUserApi = new LoginUserApi();