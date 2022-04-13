import { combineReducers, Reducer } from 'redux';
import departmentReducer, { DepartmentState } from 'services/department/reducer';
import userReducer, { UserState } from 'services/user/reducer';
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

const rootReducer: Reducer = (state, action) => {
  if (action.type === 'user/logout') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default rootReducer;