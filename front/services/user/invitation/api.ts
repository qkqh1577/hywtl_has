import apiClient from 'services/common/api';
import UserInvitation from 'services/user/invitation/UserInvitation';
import {
  UserInvitationInviteParameter,
  UserInvitationQuery
} from 'services/user/invitation/parameter';

export class UserInvitationApi {
  async invite(params: UserInvitationInviteParameter): Promise<UserInvitation> {
    const { data } = await apiClient.post('/user-verification/user-invitation', params);
    return data;
  }

  async getOne(query: UserInvitationQuery): Promise<UserInvitation> {
    const { data } = await apiClient.get('/user-verification/user-invitation/authenticate', query);
    return data;
  }
}

const userInvitationApi = new UserInvitationApi();
export default userInvitationApi;
