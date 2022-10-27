import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import {
  ProjectActionType,
  ProjectFilterStatus
} from 'project/action';
import {
  ProjectId,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectQuery } from 'project/parameter';

export interface ProjectState {
  filter?: ProjectQuery;
  id?: ProjectId;
  page?: Page<ProjectShortVO>;
  detail?: ProjectVO;
  requestAdd: ApiStatus;
  requestUpdateStatus: ApiStatus;
  requestAddFailReason: ApiStatus;
  addModal: boolean;
  failReasonModal: boolean;
  drawerOpen: boolean;
  filterOpen: boolean;
  filterStatus: ProjectFilterStatus;
}

const initial: ProjectState = {
  requestAdd:           'idle',
  requestUpdateStatus:  'idle',
  requestAddFailReason: 'idle',
  addModal:             false,
  failReasonModal:      false,
  drawerOpen:           true,
  filterOpen:           false,
  filterStatus:         ProjectFilterStatus.IDLE,
};

export const projectReducer = createReducer(initial, {
  [ProjectActionType.setFilter]:            (state,
                                             action
                                            ) => ({
    ...state,
    filter: action.payload,
  }),
  [ProjectActionType.setPage]:              (state,
                                             action
                                            ) => ({
    ...state,
    page: action.payload,
  }),
  [ProjectActionType.setId]:                (state,
                                             action
                                            ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectActionType.setOne]:               (state,
                                             action
                                            ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectActionType.requestAdd]:           (state,
                                             action
                                            ) => ({
    ...state,
    requestAdd: action.payload,
  }),
  [ProjectActionType.setAddModal]:          (state,
                                             action
                                            ) => ({
    ...state,
    addModal: action.payload
  }),
  [ProjectActionType.requestUpdateStatus]:  (state,
                                             action
                                            ) => ({
    ...state,
    requestUpdateStatus: action.payload,
  }),
  [ProjectActionType.requestAddFailReason]: (state,
                                             action
                                            ) => ({
    ...state,
    requestAddFailReason: action.payload,
  }),
  [ProjectActionType.setFailReasonModal]:   (state,
                                             action
                                            ) => ({
    ...state,
    failReasonModal: action.payload,
  }),
  [ProjectActionType.toggleDrawer]:         (state,
                                            ) => ({
    ...state,
    drawerOpen: !state.drawerOpen,
  }),
  [ProjectActionType.toggleFilter]:         (state,
                                            ) => ({
    ...state,
    filterOpen: !state.filterOpen,
  }),
  [ProjectActionType.setFilterStatus]:      (state,
                                             action
                                            ) => ({
    ...state,
    filterStatus: action.payload,
  })
});

