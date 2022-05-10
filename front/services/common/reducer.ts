import { combineReducers, Reducer } from 'redux';
import departmentReducer, { DepartmentState } from 'services/department/reducer';
import userReducer, { UserState } from 'services/user/reducer';
import userInvitationReducer, { UserInvitationState } from 'services/user/invitation/reducer';
import personnelReducer, { PersonnelState } from 'services/personnel/reducer';
import projectReducer, { ProjectState } from 'services/project/reducer';
import projectCommentReducer, { ProjectCommentState } from 'services/project_comment/reducer';
import passwordResetReducer, { PasswordResetState } from 'services/user/password_reset/reducer';
import { dialogReducer, DialogState } from 'components/Dialog';

export type RootState = {
  department: DepartmentState;
  user: UserState;
  userInvitation: UserInvitationState;
  passwordReset: PasswordResetState;
  personnel: PersonnelState;
  project: ProjectState;
  projectComment: ProjectCommentState;
  dialog: DialogState;
}

const reducer = combineReducers<RootState>({
  department: departmentReducer,
  user: userReducer,
  userInvitation: userInvitationReducer,
  passwordReset: passwordResetReducer,
  personnel: personnelReducer,
  project: projectReducer,
  projectComment: projectCommentReducer,
  dialog: dialogReducer,
});

const rootReducer: Reducer = (state, action) => {
  if (action.type === 'user/logout') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default rootReducer;