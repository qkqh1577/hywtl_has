import { ProjectId } from 'project/domain';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  ProjectEstimateType,
  ProjectEstimateVO,
  ProjectSystemEstimateVO,
} from 'project_estimate/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectEstimateActionType } from 'project_estimate/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectEstimateState {
  customAddModal?: ProjectEstimateType;
  customDetail?: ProjectCustomEstimateVO;
  customDetailModal?: ProjectEstimateId;
  finalModal: boolean;
  list?: ProjectEstimateVO[];
  projectId?: ProjectId;
  requestAddCustom: ApiStatus;
  requestAddSystem: ApiStatus;
  requestChangeCustom: ApiStatus;
  requestChangeSystem: ApiStatus;
  requestExtensionCustom: ApiStatus;
  requestSetFinal: ApiStatus;
  systemDetail?: ProjectSystemEstimateVO;
  systemModal?: ProjectEstimateId | null;
}

const initial: ProjectEstimateState = {
  finalModal:             false,
  requestAddCustom:       ApiStatus.IDLE,
  requestAddSystem:       ApiStatus.IDLE,
  requestChangeCustom:    ApiStatus.IDLE,
  requestChangeSystem:    ApiStatus.IDLE,
  requestExtensionCustom: ApiStatus.IDLE,
  requestSetFinal:        ApiStatus.IDLE,
};

export const projectEstimateReducer = createReducer(initial, {
  [ProjectEstimateActionType.setProjectId]:      (state,
                                                  action
                                                 ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectEstimateActionType.setList]:           (state,
                                                  action
                                                 ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectEstimateActionType.setCustomDetail]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    customDetail: action.payload,
  }),
  [ProjectEstimateActionType.setSystemDetail]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    systemDetail: action.payload,
  }),
  [ProjectEstimateActionType.setCustomAddModal]: (state,
                                                  action
                                                 ) => ({
    ...state,
    customAddModal: action.payload,
  }),

  [ProjectEstimateActionType.setCustomDetailModal]:   (state,
                                                       action
                                                      ) => ({
    ...state,
    customDetailModal: action.payload
  }),
  [ProjectEstimateActionType.requestAddCustom]:       (state,
                                                       action
                                                      ) => ({
    ...state,
    requestAddCustom: action.payload
  }),
  [ProjectEstimateActionType.requestChangeCustom]:    (state,
                                                       action
                                                      ) => ({
    ...state,
    requestChangeCustom: action.payload,
  }),
  [ProjectEstimateActionType.requestAddSystem]:       (state,
                                                       action
                                                      ) => ({
    ...state,
    requestAddSystem: action.payload
  }),
  [ProjectEstimateActionType.requestChangeSystem]:    (state,
                                                       action
                                                      ) => ({
    ...state,
    requestChangeSystem: action.payload,
  }),
  [ProjectEstimateActionType.requestExtensionCustom]: (state,
                                                       action
                                                      ) => ({
    ...state,
    requestExtensionCustom: action.payload,
  }),
  [ProjectEstimateActionType.requestSetFinal]:        (state,
                                                       action
                                                      ) => ({
    ...state,
    requestSetFinal: action.payload,
  }),
  [ProjectEstimateActionType.setSystemModal]:         (state,
                                                       action
                                                      ) => ({
    ...state,
    systemModal: action.payload,
  }),
  [ProjectEstimateActionType.setFinalModal]:          (state,
                                                       action
                                                      ) => ({
    ...state,
    finalModal: action.payload,
  }),
});