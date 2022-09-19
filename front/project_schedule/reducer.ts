import { ProjectId } from 'project/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import {
  ProjectScheduleShort,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectScheduleAction } from 'project_schedule/action';

export interface ProjectScheduleState {
  projectId?: ProjectId;
  detail?: ProjectScheduleVO;
  filter?: ProjectScheduleQuery;
  list?: ProjectScheduleShort[];
  addModal?: boolean;
}

const initialState: ProjectScheduleState = {};

export const projectScheduleReducer = createReducer(initialState, {
  [ProjectScheduleAction.setProjectId] : (state, action) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectScheduleAction.setOne]:(state, action) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectScheduleAction.setFilter]: (state,
                                 action
                                ) => ({
    ...state,
    filter: action.payload,
  }),

  [ProjectScheduleAction.setList]:   (state,
                                 action
                                ) => ({
    ...state,
    list: action.payload
  }),

  [ProjectScheduleAction.addModal]: (state,
                                     action
                                    ) => ({
    ...state,
    addModal: action.payload,
  })
})
