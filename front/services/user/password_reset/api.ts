import apiClient from 'services/common/api';
import {
  PasswordReset,
  PasswordResetParameter,
  PasswordResetQuery,
} from 'services/user/password_reset';

class PasswordResetApi {
  async getOne(query: PasswordResetQuery): Promise<PasswordReset> {
    const { data } = await apiClient.get('/user-verification/password-reset/authenticate', query);
    return data;
  }

  async reset(params: PasswordResetParameter): Promise<PasswordReset> {
    const { data } = await apiClient.post('/user-verification/password-reset', params);
    return data;
  }
}

const passwordResetApi = new PasswordResetApi();
export default passwordResetApi;
