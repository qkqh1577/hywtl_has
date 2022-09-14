import { ProjectId } from 'project/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { createReducer } from 'typesafe-actions';
import { RivalEstimateActionType } from 'rival_estimate/action';

export interface RivalEstimateState {
  projectId?: ProjectId;
  list?: RivalEstimateVO[];
  requestUpdate: string;
}

const initialRivalEstimateState: RivalEstimateState = {
  requestUpdate: 'idle',
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
  [RivalEstimateActionType.requestUpdate]: (state,
                                            action
                                           ) => ({
    ...state,
    requestUpdate: action.payload,
  })
});