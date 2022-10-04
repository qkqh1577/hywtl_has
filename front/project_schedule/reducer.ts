import { ProjectId } from 'project/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import {
  ProjectScheduleShort,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectScheduleAction } from 'project_schedule/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectScheduleState {
  projectId?: ProjectId;
  detail?: ProjectScheduleVO;
  filter?: ProjectScheduleQuery;
  list?: ProjectScheduleShort[];
  addModal?: boolean;
  requestAdd: ApiStatus;
  requestUpdate: ApiStatus;
  requestDelete: ApiStatus;
}

const initialState: ProjectScheduleState = {
  requestAdd:    ApiStatus.IDLE,
  requestUpdate: ApiStatus.IDLE,
  requestDelete: ApiStatus.IDLE,
};

export const projectScheduleReducer = createReducer(initialState, {
  [ProjectScheduleAction.setProjectId]: (state,
                                         action
                                        ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectScheduleAction.setOne]:       (state,
                                         action
                                        ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectScheduleAction.setFilter]:    (state,
                                         action
                                        ) => ({
    ...state,
    filter: action.payload,
  }),

  [ProjectScheduleAction.setList]: (state,
                                    action
                                   ) => ({
    ...state,
    list: action.payload
  }),

  [ProjectScheduleAction.addModal]:      (state,
                                          action
                                         ) => ({
    ...state,
    addModal: action.payload,
  }),
  [ProjectScheduleAction.requestAdd]:    (state,
                                          action
                                         ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectScheduleAction.requestUpdate]: (state,
                                          action
                                         ) => ({
    ...state,
    requestUpdate: action.payload,
  }),
  [ProjectScheduleAction.requestDelete]: (state,
                                          action
                                         ) => ({
    ...state,
    requestDelete: action.payload,
  }),
});
