import { ProjectLogQuery } from 'project_log/query';
import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectLogActionType } from 'project_log/action';
import { ProjectId } from 'project/domain';

export interface ProjectLogState {
  id?: ProjectId;
  filter?: ProjectLogQuery;
  page?: Page<ProjectLogVO>;
}

const initial: ProjectLogState = {};

export const projectLogReducer = createReducer(initial, {
  [ProjectLogActionType.setId]:     (state,
                                     action
                                    ) => ({
    ...state,
    id: action.payload
  }),
  [ProjectLogActionType.setFilter]: (state,
                                     action
                                    ) => ({
    ...state,
    filter: action.payload,
  }),

  [ProjectLogActionType.setPage]: (state,
                                   action
                                  ) => ({
    ...state,
    page: action.payload
  }),
});
