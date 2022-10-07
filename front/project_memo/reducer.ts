import { ProjectMemoQuery } from 'project_memo/parameter';
import Page from 'type/Page';
import { ProjectMemoVO } from 'project_memo/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectMemoAction } from 'project_memo/action';
import { ProjectId } from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectMemoState {
  open: boolean;
  projectId?: ProjectId;
  filter?: ProjectMemoQuery;
  page?: Page<ProjectMemoVO>;
  detail?: ProjectMemoVO;
  requestAdd: ApiStatus;
  requestChange: ApiStatus;
  requestDelete: ApiStatus;
}

const initial: ProjectMemoState = {
  open:          true,
  requestAdd:    ApiStatus.IDLE,
  requestChange: ApiStatus.IDLE,
  requestDelete: ApiStatus.IDLE,
};
export const projectMemoReducer = createReducer(initial, {
  [ProjectMemoAction.setDrawer]:     (state,
                                      action
                                     ) => ({
    ...state,
    open: action.payload,
  }),
  [ProjectMemoAction.setProjectId]:  (state,
                                      action
                                     ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectMemoAction.setFilter]:     (state,
                                      action
                                     ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [ProjectMemoAction.setPage]:       (state,
                                      action
                                     ) => ({
    ...state,
    page: action.payload,
  }),
  [ProjectMemoAction.requestAdd]:    (state,
                                      action
                                     ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectMemoAction.requestChange]: (state,
                                      action
                                     ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [ProjectMemoAction.requestDelete]: (state,
                                      action
                                     ) => ({
    ...state,
    requestDelete: action.payload,
  })
});