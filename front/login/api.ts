import apiClient from 'services/api';
import { LoginParameter } from 'user/parameter';
import { LoginVO } from 'login/domain';
import { LoginChangeParameter } from 'login/parameter';

class LoginApi {
  async login(parameter: LoginParameter): Promise<void> {
    const form = new FormData();
    form.append('username', parameter.username);
    form.append('password', parameter.password);
    const { data } = await apiClient.post('/login', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  }

  async get(): Promise<LoginVO> {
    const { data } = await apiClient.get('/user/login');
    return data;
  }

  async change(params: LoginChangeParameter): Promise<void> {
    const { data } = await apiClient.put('/user/login', params);
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

export const loginApi = new LoginApi();