import { ProjectBidVO } from 'project_bid/domain';
import { ProjectId } from 'project/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectBidActionType } from 'project_bid/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectBidState {
  projectId?: ProjectId;
  detail?: ProjectBidVO;
  requestUpdate: ApiStatus;
}

const initial: ProjectBidState = {
  requestUpdate: 'idle',
};

export const projectBidReducer = createReducer(initial, {
  [ProjectBidActionType.setProjectId]:  (state,
                                         action
                                        ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectBidActionType.setDetail]:     (state,
                                         action
                                        ) => ({
    ...state,
    detail: action.payload
  }),
  [ProjectBidActionType.requestUpdate]: (state,
                                         action
                                        ) => ({
    ...state,
    requestUpdate: action.payload,
  })
});