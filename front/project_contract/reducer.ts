import { ProjectId } from 'project/domain';
import {
  ProjectContractBasicVO,
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectContractActionType } from 'project_contract/action';
import { ApiStatus } from 'components/DataFieldProps';
import {
  ProjectEstimateVO,
  ProjectSystemEstimateVO
} from 'project_estimate/domain';

export interface ProjectContractState {
  detail?: ProjectContractVO;
  finalModal: boolean;
  list?: ProjectContractShortVO[];
  modal?: ProjectContractId | null;
  estimate?: ProjectEstimateVO;
  projectId?: ProjectId;
  basic?: ProjectContractBasicVO;
  collection?: ProjectContractCollectionVO;
  conditionList?: ProjectContractConditionVO[];
  requestAdd: ApiStatus;
  requestChange: ApiStatus;
  requestDelete: ApiStatus;
  requestSetFinal: ApiStatus;
  detailBasedEstimate?: ProjectSystemEstimateVO;
}

const initial: ProjectContractState = {
  finalModal:      false,
  requestAdd:      'idle',
  requestChange:   'idle',
  requestDelete:   'idle',
  requestSetFinal: 'idle',
};

export const projectContractReducer = createReducer(initial, {
  [ProjectContractActionType.setProjectId]:     (state,
                                                 action
                                                ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectContractActionType.setList]:          (state,
                                                 action
                                                ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectContractActionType.setDetail]:        (state,
                                                 action
                                                ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectContractActionType.setModal]:         (state,
                                                 action
                                                ) => ({
    ...state,
    modal: action.payload,
  }),
  [ProjectContractActionType.requestSetFinal]:  (state,
                                                 action
                                                ) => ({
    ...state,
    requestSetFinal: action.payload,
  }),
  [ProjectContractActionType.setFinalModal]:    (state,
                                                 action
                                                ) => ({
    ...state,
    finalModal: action.payload,
  }),
  [ProjectContractActionType.requestAdd]:       (state,
                                                 action
                                                ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectContractActionType.requestChange]:    (state,
                                                 action
                                                ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [ProjectContractActionType.requestDelete]:    (state,
                                                 action
                                                ) => ({
    ...state,
    requestDelete: action.payload,
  }),
  [ProjectContractActionType.setEstimate]:      (state,
                                                 action
                                                ) => ({
    ...state,
    estimate: action.payload,
  }),
  [ProjectContractActionType.setBasic]:         (state,
                                                 action
                                                ) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectContractActionType.setCollection]:    (state,
                                                 action
                                                ) => ({
    ...state,
    collection: action.payload,
  }),
  [ProjectContractActionType.setConditionList]: (state,
                                                 action
                                                ) => ({
    ...state,
    conditionList: action.payload,
  }),
  [ProjectContractActionType.setDetailBasedEstimate]:        (state,
                                                 action
                                                ) => ({
    ...state,
    detailBasedEstimate: action.payload,
  }),
});
