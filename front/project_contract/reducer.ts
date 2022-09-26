import { ProjectId } from 'project/domain';
import {
  ProjectContractShort,
  ProjectContractId,
  ProjectContractVO,
  ProjectEstimateVO,
} from 'project_contract/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectContractActionType } from 'project_contract/action';

export interface ProjectContractState {
  projectId?: ProjectId;
  list?: ProjectContractShort[];
  detail?: ProjectContractVO;
  addModal?: boolean;
  confirmModal?: ProjectContractId;
  detailModal?: ProjectContractId;
  estimateList?: ProjectEstimateVO[];
  estimateDetail?: ProjectEstimateVO;
}

const initial: ProjectContractState = {};

export const projectContractReducer = createReducer(initial, {
  [ProjectContractActionType.setProjectId]:      (state,
                                                  action
                                                 ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectContractActionType.setList]:           (state,
                                                  action
                                                 ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectContractActionType.setDetail]:         (state,
                                                  action
                                                 ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectContractActionType.setAddModal]:       (state,
                                                  action
                                                 ) => {
    console.log(state, action);
    return ({
      ...state,
      addModal: action.payload,
    });
  },
  [ProjectContractActionType.setConfirmModal]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    detailModal: action.payload,
  }),
  [ProjectContractActionType.setDetailModal]:    (state,
                                                  action
                                                 ) => ({
    ...state,
    DetailModal: action.payload
  }),
  [ProjectContractActionType.setEstimateList]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectContractActionType.setEstimateDetail]: (state,
                                                  action
                                                 ) => ({
    ...state,
    detail: action.payload,
  }),
});