import { ProjectId } from 'project/domain';
import {
  ProjectContractBasicVO,
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractId,
  ProjectContractShortVO,
  ProjectContractVO,
  ProjectFinalContractVO,
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
  loading: boolean,
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
  requestFinalContractUpdate: ApiStatus;
  finalContract?: ProjectFinalContractVO;
  finalContractCollectionModal?: ProjectFinalContractVO;
  requestFinalContractCollectionUpdate: ApiStatus;
  contractCollectionModal?: ProjectContractCollectionVO;
}

const initial: ProjectContractState = {
  loading:                              false,
  finalModal:                           false,
  requestAdd:                           'idle',
  requestChange:                        'idle',
  requestDelete:                        'idle',
  requestSetFinal:                      'idle',
  requestFinalContractUpdate:           'idle',
  requestFinalContractCollectionUpdate: 'idle'
};

export const projectContractReducer = createReducer(initial, {
  [ProjectContractActionType.setProjectId]:                         (state,
                                                                     action
                                                                    ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectContractActionType.setList]:                              (state,
                                                                     action
                                                                    ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectContractActionType.setLoading]:                              (state,
                                                                     action
  ) => ({
    ...state,
    loading: action.payload,
  }),
  [ProjectContractActionType.setDetail]:                            (state,
                                                                     action
                                                                    ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectContractActionType.setModal]:                             (state,
                                                                     action
                                                                    ) => ({
    ...state,
    modal: action.payload,
  }),
  [ProjectContractActionType.requestSetFinal]:                      (state,
                                                                     action
                                                                    ) => ({
    ...state,
    requestSetFinal: action.payload,
  }),
  [ProjectContractActionType.setFinalModal]:                        (state,
                                                                     action
                                                                    ) => ({
    ...state,
    finalModal: action.payload,
  }),
  [ProjectContractActionType.requestAdd]:                           (state,
                                                                     action
                                                                    ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectContractActionType.requestChange]:                        (state,
                                                                     action
                                                                    ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [ProjectContractActionType.requestDelete]:                        (state,
                                                                     action
                                                                    ) => ({
    ...state,
    requestDelete: action.payload,
  }),
  [ProjectContractActionType.setEstimate]:                          (state,
                                                                     action
                                                                    ) => ({
    ...state,
    estimate: action.payload,
  }),
  [ProjectContractActionType.setBasic]:                             (state,
                                                                     action
                                                                    ) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectContractActionType.setCollection]:                        (state,
                                                                     action
                                                                    ) => ({
    ...state,
    collection: action.payload,
  }),
  [ProjectContractActionType.setConditionList]:                     (state,
                                                                     action
                                                                    ) => ({
    ...state,
    conditionList: action.payload,
  }),
  [ProjectContractActionType.setDetailBasedEstimate]:               (state,
                                                                     action
                                                                    ) => ({
    ...state,
    detailBasedEstimate: action.payload,
  }),
  [ProjectContractActionType.requestFinalContractUpdate]:           (state,
                                                                     action
                                                                    ) => ({
    ...state,
    requestFinalContractUpdate: action.payload,
  }),
  [ProjectContractActionType.setFinalContract]:                     (state,
                                                                     action
                                                                    ) => ({
    ...state,
    finalContract: action.payload,
  }),
  [ProjectContractActionType.setFinalContractCollectionModal]:      (state,
                                                                     action
                                                                    ) => ({
    ...state,
    finalContractCollectionModal: action.payload,
  }),
  [ProjectContractActionType.requestFinalContractCollectionUpdate]: (state,
                                                                     action
                                                                    ) => ({
    ...state,
    requestFinalContractCollectionUpdate: action.payload,
  }),
  [ProjectContractActionType.setContractCollectionModal]:           (state,
                                                                     action
                                                                    ) => ({
    ...state,
    contractCollectionModal: action.payload,
  }),
});
