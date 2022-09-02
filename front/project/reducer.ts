import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectAction } from 'project/action';

export interface ProjectState {
  filter?: ProjectQuery;
  page?: Page<ProjectShortVO>;
  detail?: ProjectVO;
  addModal: boolean;
}

const initial: ProjectState = {
  addModal: false
};

export const projectReducer = createReducer(initial, {
  [ProjectAction.setFilter]:   (state,
                                action
                               ) => ({
    ...state,
    filter: action.payload,
  }),
  [ProjectAction.setPage]:     (state,
                                action
                               ) => ({
    ...state,
    page: action.payload,
  }),
  [ProjectAction.setOne]:      (state,
                                action
                               ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectAction.setAddModal]: (state,
                                action
                               ) => ({
    ...state,
    addModal: action.payload
  })
});