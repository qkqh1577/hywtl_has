import { ProjectId } from 'project/domain';
import {
  ProjectCollectionStageId,
  ProjectCollectionStageVO,
  ProjectCollectionVO
} from 'project_collection/domain';
import { ApiStatus } from 'components/DataFieldProps';
import { createReducer } from 'typesafe-actions';
import { ProjectCollectionActionType } from 'project_collection/action';

export interface ProjectCollectionState {
  projectId?: ProjectId;
  detail?: ProjectCollectionVO;
  stage?: ProjectCollectionStageVO;
  seqModal: boolean;
  addModal: boolean;
  detailModal?: ProjectCollectionStageId;
  requestUpdateManager: ApiStatus;
  requestChangeStageSeq: ApiStatus;
  requestAddStage: ApiStatus;
  requestChangeStage: ApiStatus;
  requestDeleteStage: ApiStatus;
}

const initial: ProjectCollectionState = {
  seqModal:              false,
  addModal:              false,
  requestUpdateManager:  ApiStatus.IDLE,
  requestChangeStageSeq: ApiStatus.IDLE,
  requestAddStage:       ApiStatus.IDLE,
  requestChangeStage:    ApiStatus.IDLE,
  requestDeleteStage:    ApiStatus.IDLE,
};

export const projectCollectionReducer = createReducer(initial, {
  [ProjectCollectionActionType.setProjectId]:          (state,
                                                        action
                                                       ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectCollectionActionType.setOne]:                (state,
                                                        action
                                                       ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectCollectionActionType.requestUpdateManager]:  (state,
                                                        action
                                                       ) => ({
    ...state,
    requestUpdateManager: action.payload,
  }),
  [ProjectCollectionActionType.requestChangeStageSeq]: (state,
                                                        action
                                                       ) => ({
    ...state,
    requestChangeStageSeq: action.payload,
  }),
  [ProjectCollectionActionType.setStage]:              (state,
                                                        action
                                                       ) => ({
    ...state,
    stage: action.payload,
  }),
  [ProjectCollectionActionType.requestAddStage]:       (state,
                                                        action
                                                       ) => ({
    ...state,
    requestAddStage: action.payload,
  }),
  [ProjectCollectionActionType.requestChangeStage]:    (state,
                                                        action
                                                       ) => ({
    ...state,
    requestChangeStage: action.payload,
  }),
  [ProjectCollectionActionType.requestDeleteStage]:    (state,
                                                        action
                                                       ) => ({
    ...state,
    requestDeleteStage: action.payload,
  }),
  [ProjectCollectionActionType.stageSeqModal]:         (state,
                                                        action
                                                       ) => ({
    ...state,
    seqModal: action.payload,
  }),
  [ProjectCollectionActionType.stageAddModal]:         (state,
                                                        action
                                                       ) => ({
    ...state,
    addModal: action.payload,
  }),
  [ProjectCollectionActionType.stageDetailModal]:      (state,
                                                        action
                                                       ) => ({
    ...state,
    detailModal: action.payload,
  }),
});