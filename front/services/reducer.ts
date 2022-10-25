import {
  combineReducers,
  Reducer
} from 'redux';
import {
  userReducer,
  UserState,
} from 'user/reducer';
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
import {
  loginReducer,
  LoginState
} from 'login/reducer';
import {
  rivalBidReducer,
  RivalBidState
} from 'rival_bid/reducer';
import {
  menuReducer,
  MenuState
} from 'menu/reducer';
import {
  projectCollectionReducer,
  ProjectCollectionState
} from 'project_collection/reducer';

export interface RootState {
  business: BusinessState;
  businessSelector: BusinessSelectorState;
  contractBasic: ContractBasicState;
  contractCollection: ContractCollectionState;
  contractCondition: ContractConditionState;
  department: DepartmentState;
  dialog: DialogState;
  estimateContent: EstimateContentState;
  estimateTemplate: EstimateTemplateState;
  login: LoginState;
  menu: MenuState;
  personnel: PersonnelState;
  project: ProjectState;
  projectBasic: ProjectBasicState;
  projectBid: ProjectBidState;
  projectCollection: ProjectCollectionState;
  projectComplex: ProjectComplexState;
  projectContract: ProjectContractState;
  projectDocument: ProjectDocumentState;
  projectEstimate: ProjectEstimateState;
  projectLog: ProjectLogState;
  projectMemo: ProjectMemoState;
  projectSchedule: ProjectScheduleState;
  rivalBid: RivalBidState;
  rivalEstimate: RivalEstimateState;
  user: UserState;
  userNotification: UserNotificationState;
}

const reducer = combineReducers<RootState>({
  business:           businessReducer,
  businessSelector:   businessSelectorReducer,
  contractBasic:      contractBasicReducer,
  contractCollection: contractCollectionReducer,
  contractCondition:  contractConditionReducer,
  department:         departmentReducer,
  dialog:             dialogReducer,
  estimateContent:    estimateContentReducer,
  estimateTemplate:   estimateTemplateReducer,
  login:              loginReducer,
  menu:               menuReducer,
  personnel:          personnelReducer,
  project:            projectReducer,
  projectBasic:       projectBasicReducer,
  projectBid:         projectBidReducer,
  projectCollection:  projectCollectionReducer,
  projectComplex:     projectComplexReducer,
  projectContract:    projectContractReducer,
  projectDocument:    projectDocumentReducer,
  projectEstimate:    projectEstimateReducer,
  projectLog:         projectLogReducer,
  projectMemo:        projectMemoReducer,
  projectSchedule:    projectScheduleReducer,
  rivalBid:           rivalBidReducer,
  rivalEstimate:      rivalEstimateReducer,
  user:               userReducer,
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
