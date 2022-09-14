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
  LoginState,
  menuReducer,
  MenuState,
  projectDrawerReducer,
  ProjectDrawerState,
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
} from 'project_basic/reducer';
import {
  projectDocumentReducer,
  ProjectDocumentState
} from 'project_document/reducer';
import {
  projectComplexReducer,
  ProjectComplexState
} from 'project_complex/reducer';
import {
  projectEstimateReducer,
  ProjectEstimateState,
} from 'project_estimate/reducer';
import {
  businessSelectorReducer,
  BusinessSelectorState
} from 'components/BusinessSelector';
import {
  contractBasicReducer,
  ContractBasicState
} from 'admin/contract/basic/reducer';
import {
  contractCollectionReducer,
  ContractCollectionState
} from 'admin/contract/collection/reducer';
import {
  contractConditionReducer,
  ContractConditionState
} from 'admin/contract/condition/reducer';
import {
  rivalEstimateReducer,
  RivalEstimateState
} from 'rival_estimate/reducer';

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
  projectComplex: ProjectComplexState;
  projectEstimate: ProjectEstimateState;
  businessSelector: BusinessSelectorState;
  contractBasic: ContractBasicState;
  contractCollection: ContractCollectionState;
  contractCondition: ContractConditionState;
  rivalEstimate: RivalEstimateState;
}

const reducer = combineReducers<RootState>({
  user:               userReducer,
  login:              loginReducer,
  department:         departmentReducer,
  menu:               menuReducer,
  dialog:             dialogReducer,
  estimateTemplate:   estimateTemplateReducer,
  project:            projectReducer,
  projectDrawer:      projectDrawerReducer,
  business:           businessReducer,
  estimateContent:    estimateContentReducer,
  projectMemo:        projectMemoReducer,
  projectBasic:       projectBasicReducer,
  projectDocument:    projectDocumentReducer,
  projectComplex:     projectComplexReducer,
  projectEstimate:    projectEstimateReducer,
  businessSelector:   businessSelectorReducer,
  contractBasic:      contractBasicReducer,
  contractCollection: contractCollectionReducer,
  contractCondition:  contractConditionReducer,
  rivalEstimate:      rivalEstimateReducer,
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
