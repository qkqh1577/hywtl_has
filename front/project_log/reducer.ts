import { ProjectLogQuery } from 'project_log/query';
import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectLogAction } from 'project_log/action';
import { ProjectId } from 'project/domain';

export interface ProjectLogState {
  id?: ProjectId;
  filter?: ProjectLogQuery;
  page?: Page<ProjectLogVO>;
}

const initialState: ProjectLogState = {};

export const projectLogReducer = createReducer(initialState, {
  [ProjectLogAction.setFilter]: (state,
                                 action
                                ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [ProjectLogAction.setPage]:                (state,
                                            action
                                           ) => ({
    ...state,
    page: action.payload
  }),
})
