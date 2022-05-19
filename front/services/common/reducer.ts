import { combineReducers, Reducer } from 'redux';
import { departmentReducer, DepartmentState } from 'services/department';
import { userReducer, UserState } from 'services/user';
import { userInvitationReducer, UserInvitationState } from 'services/user/invitation';
import { personnelReducer, PersonnelState } from 'services/personnel';
import { projectReducer, ProjectState } from 'services/project';
import { projectTargetReducer, ProjectTargetState } from 'services/project_target';
import { projectEstimateReducer, ProjectEstimateState } from 'services/project_estimate';
import { projectCommentReducer, ProjectCommentState } from 'services/project_comment';
import { passwordResetReducer, PasswordResetState } from 'services/user/password_reset';
import { companyReducer, CompanyState } from 'services/company';
import { dialogReducer, DialogState } from 'components';
import { projectReviewReducer, ProjectReviewState } from 'services/project_review';

export type RootState = {
  department: DepartmentState;
  user: UserState;
  userInvitation: UserInvitationState;
  passwordReset: PasswordResetState;
  personnel: PersonnelState;
  project: ProjectState;
  projectReview: ProjectReviewState;
  projectTarget: ProjectTargetState;
  projectEstimate: ProjectEstimateState;
  projectComment: ProjectCommentState;
  company: CompanyState;
  dialog: DialogState;
}

const reducer = combineReducers<RootState>({
  department: departmentReducer,
  user: userReducer,
  userInvitation: userInvitationReducer,
  passwordReset: passwordResetReducer,
  personnel: personnelReducer,
  project: projectReducer,
  projectReview: projectReviewReducer,
  projectTarget: projectTargetReducer,
  projectEstimate: projectEstimateReducer,
  projectComment: projectCommentReducer,
  company: companyReducer,
  dialog: dialogReducer,
});

const rootReducer: Reducer = (state, action) => {
  if (action.type === 'user/logout') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default rootReducer;