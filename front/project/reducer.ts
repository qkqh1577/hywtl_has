import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { ProjectActionType } from 'project/action';
import {
  ProjectId,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectState {
  filter?: ProjectQuery;
  id?: ProjectId;
  page?: Page<ProjectShortVO>;
  detail?: ProjectVO;
  requestAdd: ApiStatus;
  addModal: boolean;
}

const initial: ProjectState = {
  requestAdd: ApiStatus.IDLE,
  addModal:   false,
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
  [ProjectActionType.setId]:       (state,
                                    action
                                   ) => ({
    ...state,
    id: action.payload,
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
  }),
});
