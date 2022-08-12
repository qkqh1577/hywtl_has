import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import { ProjectShortVO } from 'project/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectAction } from 'project/action';


export interface ProjectState {
  filter?: ProjectQuery;
  page?: Page<ProjectShortVO>;
}

const initial: ProjectState = {};

export const projectReducer = createReducer(initial, {
  [ProjectAction.setFilter]: (state,
                              action
                             ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [ProjectAction.setPage]:   (state,
                              action
                             ) => ({
    ...state,
    page: action.payload,
  })
});