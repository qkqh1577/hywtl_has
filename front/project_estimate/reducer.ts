import { ProjectId } from 'project/domain';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateId,
  ProjectEstimateShortVO,
  ProjectEstimateType,
  ProjectFinalEstimateVO,
  ProjectSystemEstimateVO,
} from 'project_estimate/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectEstimateActionType } from 'project_estimate/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectEstimateState {
  loading: boolean,
  customAddModal?: ProjectEstimateType;
  customDetail?: ProjectCustomEstimateVO;
  customDetailModal?: ProjectEstimateId;
  customExtensionModal?: ProjectEstimateId;
  finalModal: boolean;
  list?: ProjectEstimateShortVO[];
  projectId?: ProjectId;
  requestAddCustom: ApiStatus;
  requestAddSystem: ApiStatus;
  requestChangeCustom: ApiStatus;
  requestChangeSystem: ApiStatus;
  requestDeleteCustom: ApiStatus;
  requestDeleteSystem: ApiStatus;
  requestExtensionCustom: ApiStatus;
  requestSetFinal: ApiStatus;
  systemDetail?: ProjectSystemEstimateVO;
  systemModal?: ProjectEstimateId | null;
  requestUpdateFinalEstimate: ApiStatus;
  finalEstimate?: ProjectFinalEstimateVO;

}

const initial: ProjectEstimateState = {
  loading:                    false,
  finalModal:                 false,
  requestAddCustom:           'idle',
  requestAddSystem:           'idle',
  requestChangeCustom:        'idle',
  requestChangeSystem:        'idle',
  requestExtensionCustom:     'idle',
  requestSetFinal:            'idle',
  requestDeleteCustom:        'idle',
  requestDeleteSystem:        'idle',
  requestUpdateFinalEstimate: 'idle',
};

export const projectEstimateReducer = createReducer(initial, {
  [ProjectEstimateActionType.setLoading]:      (state,
                                                  action
  ) => ({
    ...state,
    loading: action.payload,
  }),
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

  [ProjectEstimateActionType.setCustomDetailModal]:       (state,
                                                           action
                                                          ) => ({
    ...state,
    customDetailModal: action.payload
  }),
  [ProjectEstimateActionType.setCustomExtensionModal]:    (state,
                                                           action
                                                          ) => ({
    ...state,
    customExtensionModal: action.payload
  }),
  [ProjectEstimateActionType.requestAddCustom]:           (state,
                                                           action
                                                          ) => ({
    ...state,
    requestAddCustom: action.payload
  }),
  [ProjectEstimateActionType.requestChangeCustom]:        (state,
                                                           action
                                                          ) => ({
    ...state,
    requestChangeCustom: action.payload,
  }),
  [ProjectEstimateActionType.requestAddSystem]:           (state,
                                                           action
                                                          ) => ({
    ...state,
    requestAddSystem: action.payload
  }),
  [ProjectEstimateActionType.requestChangeSystem]:        (state,
                                                           action
                                                          ) => ({
    ...state,
    requestChangeSystem: action.payload,
  }),
  [ProjectEstimateActionType.requestExtensionCustom]:     (state,
                                                           action
                                                          ) => ({
    ...state,
    requestExtensionCustom: action.payload,
  }),
  [ProjectEstimateActionType.requestSetFinal]:            (state,
                                                           action
                                                          ) => ({
    ...state,
    requestSetFinal: action.payload,
  }),
  [ProjectEstimateActionType.setSystemModal]:             (state,
                                                           action
                                                          ) => ({
    ...state,
    systemModal: action.payload,
  }),
  [ProjectEstimateActionType.setFinalModal]:              (state,
                                                           action
                                                          ) => ({
    ...state,
    finalModal: action.payload,
  }),
  [ProjectEstimateActionType.requestDeleteCustom]:        (state,
                                                           action
                                                          ) => ({
    ...state,
    requestDeleteCustom: action.payload,
  }),
  [ProjectEstimateActionType.requestDeleteSystem]:        (state,
                                                           action
                                                          ) => ({
    ...state,
    requestDeleteSystem: action.payload,
  }),
  [ProjectEstimateActionType.requestFinalEstimateUpdate]: (state,
                                                           action
                                                          ) => ({
    ...state,
    requestUpdateFinalEstimate: action.payload,
  }),
  [ProjectEstimateActionType.setFinalEstimate]:                      (state,
                                                                      action) => ({
    ...state,
    finalEstimate: action.payload,
  })
});
