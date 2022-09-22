import { ProjectId } from 'project/domain';
import {
  ProjectContractShort,
  ProjectContractId,
  ProjectContractVO,
} from 'project_contract/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectContractActionType } from 'project_contract/action';

export interface ProjectContractState {
  projectId?: ProjectId;
  list?: ProjectContractShort[];
  detail?: ProjectContractVO;
  customAddModal?: void;
  customConfirmModal?: void;
  customDetailModal?: ProjectContractId;
}

const initial: ProjectContractState = {};

export const projectContractReducer = createReducer(initial, {
  [ProjectContractActionType.setProjectId]:          (state,
                                                      action
                                                     ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectContractActionType.setList]:               (state,
                                                      action
                                                     ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectContractActionType.setDetail]:             (state,
                                                      action
                                                     ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectContractActionType.setCustomAddModal]:     (state,
                                                      action
                                                     ) => ({
    ...state,
    customAddModal: action.payload,
  }),
  [ProjectContractActionType.setCustomConfirmModal]: (state,
                                                      action
                                                     ) => ({
    ...state,
    customAddModal: action.payload,
  }),
  [ProjectContractActionType.setCustomDetailModal]:  (state,
                                                      action
                                                     ) => ({
    ...state,
    customDetailModal: action.payload
  })
});