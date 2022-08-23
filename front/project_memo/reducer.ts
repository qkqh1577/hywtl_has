import { ProjectMemoQuery } from 'project_memo/parameter';
import Page from 'type/Page';
import { ProjectMemoVO } from 'project_memo/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectMemoAction } from 'project_memo/action';

export interface ProjectMemoState {
  projectId?: number;
  filter?: ProjectMemoQuery;
  page?: Page<ProjectMemoVO>;
  detail?: ProjectMemoVO;
}

const initial: ProjectMemoState = {};
export const projectMemoReducer = createReducer(initial, {
  [ProjectMemoAction.setProjectId]: (state,
                                     action
                                    ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectMemoAction.setFilter]:    (state,
                                     action
                                    ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [ProjectMemoAction.setPage]:      (state,
                                     action
                                    ) => ({
    ...state,
    page: action.payload,
  })
});