import apiClient from 'services/api';
import {
  UserNotificationId,
  UserNotificationVO
} from 'user_notification/domain';

class UserNotificationApi {
  async count(): Promise<number> {
    const { data } = await apiClient.get('/user-notification/count');
    return data;
  }

  async getList(): Promise<UserNotificationVO[]> {
    const { data } = await apiClient.get('/user-notification');
    return data;
  }

  async read(id: UserNotificationId): Promise<void> {
    const { data } = await apiClient.post(`/user-notification/${id}`);
    return data;
  }

  async deleteOne(id: UserNotificationId): Promise<void> {
    const { data } = await apiClient.delete(`/user-notification/${id}`);
    return data;
  }
}

export const userNotificationApi = new UserNotificationApi();