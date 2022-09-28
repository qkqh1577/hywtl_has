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
} from 'admin/estimate/template/reducer';
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
  projectContractReducer,
  ProjectContractState,
} from 'project_contract/reducer';
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
  projectLogReducer,
  ProjectLogState
} from 'project_log/reducer';
import {
  rivalEstimateReducer,
  RivalEstimateState
} from 'rival_estimate/reducer';
import {
  projectBidReducer,
  ProjectBidState
} from 'project_bid/reducer';
import {
  projectScheduleReducer,
  ProjectScheduleState
} from 'project_schedule/reducer';
import {
  personnelReducer,
  PersonnelState
} from 'personnel/reducer';
import {
  userNotificationReducer,
  UserNotificationState
} from 'user_notification/reducer';

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
  projectContract: ProjectContractState;
  businessSelector: BusinessSelectorState;
  contractBasic: ContractBasicState;
  contractCollection: ContractCollectionState;
  contractCondition: ContractConditionState;
  projectLog: ProjectLogState;
  rivalEstimate: RivalEstimateState;
  projectBid: ProjectBidState;
  projectSchedule: ProjectScheduleState;
  personnel: PersonnelState;
  userNotification: UserNotificationState;
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
  projectContract:    projectContractReducer,
  businessSelector:   businessSelectorReducer,
  contractBasic:      contractBasicReducer,
  contractCollection: contractCollectionReducer,
  contractCondition:  contractConditionReducer,
  projectLog:         projectLogReducer,
  rivalEstimate:      rivalEstimateReducer,
  projectBid:         projectBidReducer,
  projectSchedule:    projectScheduleReducer,
  personnel:          personnelReducer,
  userNotification:   userNotificationReducer,
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
