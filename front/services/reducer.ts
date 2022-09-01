import {
  combineReducers,
  Reducer
} from 'redux';
import {
  userReducer,
  UserState,
} from 'user/reducer';
import {
  loginReducer,
  menuReducer,
  LoginState,
  MenuState,
  ProjectDrawerState,
  projectDrawerReducer,
} from 'app/repository/reducer';
import {
  dialogReducer,
  DialogState,
} from 'components/Dialog';
import {
  departmentReducer,
  DepartmentState,
} from 'department/reducer';
import {
  estimateTemplateReducer,
  EstimateTemplateState
} from 'estimate_template/reducer';
import {
  projectReducer,
  ProjectState
} from 'project/reducer';
import {
  businessReducer,
  BusinessState
} from 'business/reducer';
import {
  estimateContentReducer,
  EstimateContentState
} from 'admin/estimate/content/reducer';
import {
  projectMemoReducer,
  ProjectMemoState
} from 'project_memo/reducer';
import {
  projectBasicReducer,
  ProjectBasicState
} from 'project/basic/reducer';
import {
  projectDocumentReducer,
  ProjectDocumentState
} from 'project/document/reducer';

export interface RootState {
  user: UserState;
  login: LoginState;
  department: DepartmentState;
  menu: MenuState;
  dialog: DialogState;
  estimateTemplate: EstimateTemplateState;
  project: ProjectState;
  projectDrawer: ProjectDrawerState;
  business: BusinessState;
  estimateContent: EstimateContentState;
  projectMemo: ProjectMemoState;
  projectBasic: ProjectBasicState;
  projectDocument: ProjectDocumentState;
}

const reducer = combineReducers<RootState>({
  user:             userReducer,
  login:            loginReducer,
  department:       departmentReducer,
  menu:             menuReducer,
  dialog:           dialogReducer,
  estimateTemplate: estimateTemplateReducer,
  project:          projectReducer,
  projectDrawer:    projectDrawerReducer,
  business:         businessReducer,
  estimateContent:  estimateContentReducer,
  projectMemo:      projectMemoReducer,
  projectBasic:     projectBasicReducer,
  projectDocument:  projectDocumentReducer,
});

const rootReducer: Reducer = (state,
                              action
) => {
  if (action.type === 'user/logout') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default rootReducer;
