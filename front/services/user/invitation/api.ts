import axios from 'axios';
import queryString from 'qs';
import UserInvitation from 'services/user/invitation/UserInvitation';
import { UserInvitationInviteParameter } from 'services/user/invitation/parameter';

export class UserInvitationApi {
  async invite(params: UserInvitationInviteParameter): Promise<UserInvitation> {
    const { data } = await axios.post('/user-invitations', params, {
      paramsSerializer: (params: any) =>
        queryString.stringify(params, {
          arrayFormat: 'brackets',
          encode: true,
        })
    });
    return data;
  }
}

const userInvitationApi = new UserInvitationApi();
export default userInvitationApi;
