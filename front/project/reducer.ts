import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { ProjectActionType } from 'project/action';
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';

export interface ProjectState {
  filter?: ProjectQuery;
  page?: Page<ProjectShortVO>;
  detail?: ProjectVO;
  requestAdd: string;
  addModal: boolean;
}

const initial: ProjectState = {
  requestAdd: 'idle',
  addModal:   false
};

export const projectReducer = createReducer(initial, {
  [ProjectActionType.setFilter]:   (state,
                                    action
                               ) => ({
    ...state,
    filter: action.payload,
  }),
  [ProjectActionType.setPage]:     (state,
                                    action
                               ) => ({
    ...state,
    page: action.payload,
  }),
  [ProjectActionType.setOne]:      (state,
                                    action
                               ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectActionType.requestAdd]:  (state,
                                    action
                               ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectActionType.setAddModal]: (state,
                                    action
                               ) => ({
    ...state,
    addModal: action.payload
  })
});
