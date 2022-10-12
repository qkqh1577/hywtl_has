import { ProjectId } from 'project/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { createReducer } from 'typesafe-actions';
import { RivalEstimateActionType } from 'rival_estimate/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface RivalEstimateState {
  projectId?: ProjectId;
  list?: RivalEstimateVO[];
  requestPush: ApiStatus;
  requestUpdate: ApiStatus;
  requestDelete: ApiStatus;
}

const initialRivalEstimateState: RivalEstimateState = {
  requestPush:   ApiStatus.IDLE,
  requestUpdate: ApiStatus.IDLE,
  requestDelete: ApiStatus.IDLE,
};

export const rivalEstimateReducer = createReducer(initialRivalEstimateState, {
  [RivalEstimateActionType.setProjectId]:  (state,
                                            action
                                           ) => ({
    ...state,
    projectId: action.payload
  }),
  [RivalEstimateActionType.setList]:       (state,
                                            action
                                           ) => ({
    ...state,
    list: action.payload,
  }),
  [RivalEstimateActionType.requestPush]:   (state,
                                            action
                                           ) => ({
    ...state,
    requestPush: action.payload,
  }),
  [RivalEstimateActionType.requestUpdate]: (state,
                                            action
                                           ) => ({
    ...state,
    requestUpdate: action.payload,
  }),
  [RivalEstimateActionType.requestDelete]: (state,
                                            action
                                           ) => ({
    ...state,
    requestDelete: action.payload,
  })
});