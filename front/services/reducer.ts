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
import { businessReducer, BusinessState } from "../business/reducer";

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
