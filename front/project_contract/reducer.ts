import { ProjectId } from 'project/domain';
import {
  ProjectContractBasicVO,
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractId,
  ProjectContractShort,
  ProjectContractVO,
} from 'project_contract/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectContractActionType } from 'project_contract/action';
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';

export interface ProjectContractState {
  projectId?: ProjectId;
  list?: ProjectContractShort[];
  detail?: ProjectContractVO;
  addModal?: boolean;
  confirmModal?: ProjectContractId;
  detailModal?: ProjectContractId;
  estimateList?: ProjectEstimateVO[];
  estimateDetail?: ProjectEstimateVO;
  variableList?: ContractConditionVariableVO[];
  basic?: ProjectContractBasicVO;
  collection?: ProjectContractCollectionVO;
  condition?: ProjectContractConditionVO;
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
    detailModal: action.payload
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
    estimateDetail: action.payload,
  }),
  [ProjectContractActionType.setVariableList]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    variableList: action.payload,
  }),
  [ProjectContractActionType.setContractBasic]:  (
                                                   state,
                                                   action
                                                 ) => ({
    ...state,
    basic: action.payload,
  }),

  [ProjectContractActionType.setContractCollection]:    (
                                                          state,
                                                          action
                                                        ) => ({
    ...state,
    collection: action.payload
  }),
  [ProjectContractActionType.setContractConditionList]: (
                                                          state,
                                                          action
                                                        ) => ({
    ...state,
    condition: action.payload
  })
});
