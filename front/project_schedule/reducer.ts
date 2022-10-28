import { ProjectId } from 'project/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import {
  ProjectScheduleShortVO,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectScheduleActionType } from 'project_schedule/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectScheduleState {
  projectId?: ProjectId;
  detail?: ProjectScheduleVO;
  filter?: ProjectScheduleQuery;
  list?: ProjectScheduleShortVO[];
  addModal?: boolean;
  requestAdd: ApiStatus;
  requestUpdate: ApiStatus;
  requestDelete: ApiStatus;
}

const initial: ProjectScheduleState = {
  requestAdd:    'idle',
  requestUpdate: 'idle',
  requestDelete: 'idle',
};

export const projectScheduleReducer = createReducer(initial, {
  [ProjectScheduleActionType.setProjectId]: (state,
                                             action
                                            ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectScheduleActionType.setOne]:       (state,
                                             action
                                            ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectScheduleActionType.setFilter]:    (state,
                                             action
                                            ) => ({
    ...state,
    filter: action.payload,
  }),

  [ProjectScheduleActionType.setList]: (state,
                                        action
                                       ) => ({
    ...state,
    list: action.payload
  }),

  [ProjectScheduleActionType.addModal]:      (state,
                                              action
                                             ) => ({
    ...state,
    addModal: action.payload,
  }),
  [ProjectScheduleActionType.requestAdd]:    (state,
                                              action
                                             ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectScheduleActionType.requestUpdate]: (state,
                                              action
                                             ) => ({
    ...state,
    requestUpdate: action.payload,
  }),
  [ProjectScheduleActionType.requestDelete]: (state,
                                              action
                                             ) => ({
    ...state,
    requestDelete: action.payload,
  }),
});
