import apiClient from 'services/api';
import Page from 'type/Page';
import { UserQuery } from 'user/query';
import {
  UserId,
  UserVO
} from 'user/domain';
import {
  UserChangeParameter,
  LoginUserEditParameter
} from 'user/parameter';

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

  async edit(params: LoginUserEditParameter): Promise<void> {
    const formData = new FormData();
    if (params.englishName) {
      formData.append('englishName', params.englishName);
    }
    if (params.sex) {
      formData.append('sex', params.sex);
    }
    if (params.mobilePhone) {
      formData.append('mobilePhone', params.mobilePhone);
    }
    if (params.privateEmail) {
      formData.append('privateEmail', params.privateEmail);
    }
    if (params.emergencyPhone) {
      formData.append('emergencyPhone', params.emergencyPhone);
    }
    if (params.relationship) {
      formData.append('relationship', params.relationship);
    }
    if (params.address) {
      formData.append('address', params.address);
    }
    if (params.profile) {
      formData.append('profile', params.profile);
    }
    if (params.birthDate) {
      console.log("params.birthDate.toISOString() : ", params.birthDate.toISOString());
      formData.append('birthDate', params.birthDate.toISOString());
    }
    const { result } = await apiClient.post('user/login', formData);
    return result;
  }
}

export const userApi = new UserApi();
