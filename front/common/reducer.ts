import { combineReducers } from 'redux';
import departmentReducer, { DepartmentState } from 'services/department/reducer';
import userReducer , { UserState } from 'services/user/reducer';
import userInvitationReducer, { UserInvitationState } from 'services/user/invitation/reducer';

export type RootState = {
  department: DepartmentState;
  user: UserState;
  userInvitation: UserInvitationState;
}

const reducer = combineReducers<RootState>({
  department: departmentReducer,
  user: userReducer,
  userInvitation: userInvitationReducer,
});

export default reducer;