import { ProjectId } from 'project/domain';
import {
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectContractActionType } from 'project_contract/action';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectEstimateVO } from 'project_estimate/domain';

export interface ProjectContractState {
  detail?: ProjectContractVO;
  finalModal: boolean;
  list?: ProjectContractShortVO[];
  modal?: ProjectContractId | null;
  estimate?: ProjectEstimateVO;
  projectId?: ProjectId;
  requestAdd: ApiStatus;
  requestChange: ApiStatus;
  requestDelete: ApiStatus;
  requestSetFinal: ApiStatus;
}

const initial: ProjectContractState = {
  finalModal:      false,
  requestAdd:      ApiStatus.IDLE,
  requestChange:   ApiStatus.IDLE,
  requestDelete:   ApiStatus.IDLE,
  requestSetFinal: ApiStatus.IDLE,
};

export const projectContractReducer = createReducer(initial, {
  [ProjectContractActionType.setProjectId]:    (state,
                                                action
                                               ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectContractActionType.setList]:         (state,
                                                action
                                               ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectContractActionType.setDetail]:       (state,
                                                action
                                               ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectContractActionType.setModal]:        (state,
                                                action
                                               ) => ({
    ...state,
    modal: action.payload,
  }),
  [ProjectContractActionType.requestSetFinal]: (state,
                                                action
                                               ) => ({
    ...state,
    requestSetFinal: action.payload,
  }),
  [ProjectContractActionType.setFinalModal]:   (state,
                                                action
                                               ) => ({
    ...state,
    finalModal: action.payload,
  }),
  [ProjectContractActionType.requestAdd]:      (state,
                                                action
                                               ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectContractActionType.requestChange]:   (state,
                                                action
                                               ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [ProjectContractActionType.requestDelete]:   (state,
                                                action
                                               ) => ({
    ...state,
    requestDelete: action.payload,
  }),
  [ProjectContractActionType.setEstimate]:     (state,
                                                action
                                               ) => ({
    ...state,
    estimate: action.payload,
  })
});
