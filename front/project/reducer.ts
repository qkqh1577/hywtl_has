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
  loading: boolean,
  filter?: ProjectQuery;
  id?: ProjectId;
  page?: ProjectShortVO[];
  detail?: ProjectVO;
  requestAdd: ApiStatus;
  requestUpdateStatus: ApiStatus;
  requestAddFailReason: ApiStatus;
  addModal: boolean;
  failReasonModal: boolean;
  drawerOpen: boolean;
  filterOpen: boolean;
  filterStatus: ProjectFilterStatus;
  requestDelete: ApiStatus;

}

const initial: ProjectState = {
  loading:              false,
  requestAdd:           'idle',
  requestUpdateStatus:  'idle',
  requestAddFailReason: 'idle',
  requestDelete:        'idle',
  addModal:             false,
  failReasonModal:      false,
  drawerOpen:           true,
  filterOpen:           false,
  filterStatus:         ProjectFilterStatus.IDLE,
};

export const projectReducer = createReducer(initial, {
  [ProjectActionType.setLoading]:            (state,
                                             action
  ) => ({
    ...state,
    loading: action.payload,
  }),
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
  }),
  [ProjectActionType.requestDelete]:           (state,
                                             action
                                            ) => ({
    ...state,
    requestDelete: action.payload,
  }),
});

