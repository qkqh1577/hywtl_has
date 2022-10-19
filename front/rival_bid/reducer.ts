import { ApiStatus } from 'components/DataFieldProps';
import { createReducer } from 'typesafe-actions';
import { RivalBidActionType } from 'rival_bid/action';
import { ProjectId } from 'project/domain';
import { RivalBidVO } from 'rival_bid/domain';

export interface RivalBidState {
  projectId?: ProjectId;
  list?: RivalBidVO[];
  requestPush: ApiStatus;
  requestUpdate: ApiStatus;
  requestDelete: ApiStatus;
}

const initial: RivalBidState = {
  requestPush:   ApiStatus.IDLE,
  requestUpdate: ApiStatus.IDLE,
  requestDelete: ApiStatus.IDLE,
};

export const rivalBidReducer = createReducer(initial, {
  [RivalBidActionType.setProjectId]:  (state,
                                       action
                                      ) => ({
    ...state,
    projectId: action.payload,
  }),
  [RivalBidActionType.setList]:       (state,
                                       action
                                      ) => ({
    ...state,
    list: action.payload,
  }),
  [RivalBidActionType.requestPush]:   (state,
                                       action
                                      ) => ({
    ...state,
    requestPush: action.payload,
  }),
  [RivalBidActionType.requestUpdate]: (state,
                                       action
                                      ) => ({
    ...state,
    requestUpdate: action.payload,
  }),
  [RivalBidActionType.requestDelete]: (state,
                                       action
                                      ) => ({
    ...state,
    requestDelete: action.payload,
  }),
});