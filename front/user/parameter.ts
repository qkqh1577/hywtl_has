import {
  UserVO
} from 'user/domain';
import { FormikPartial } from 'type/Form';

export interface UserChangeParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'> {
}


export interface LoginUserEditParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'
    | 'role'
    | 'department'
    | 'id'
    > {
}

export const initialLoginUserEditParameter: FormikPartial<LoginUserEditParameter> = {
  name:       '',
  username:   '',
  email:      '',
  englishName: '',
  sex: '',
  mobilePhone: '',
  privateEmail: '',
  emergencyPhone: '',
  relationship: '',
  address: '',
  birthDate: '',
};
