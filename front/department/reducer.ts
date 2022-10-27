import {
  DepartmentId,
  DepartmentShortVO,
  DepartmentVO
} from 'department/domain';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { DepartmentActionType } from 'department/action';
import { DepartmentQuery } from 'department/query';
import { ApiStatus } from 'components/DataFieldProps';

export interface DepartmentState {
  filter?: DepartmentQuery;
  page?: Page<DepartmentShortVO>;
  list?: DepartmentShortVO[];
  detail?: DepartmentVO;
  id?: DepartmentId;
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
}

const initial: DepartmentState = {
  requestUpsert: 'idle',
  requestDelete: 'idle'
};

export const departmentReducer = createReducer(initial, {
  [DepartmentActionType.setFilter]:     (state,
                                         action
                                        ) => ({
    ...state,
    filter: action.payload,
  }),
  [DepartmentActionType.setPage]:       (state,
                                         action
                                        ) => ({
    ...state,
    page: action.payload,
  }),
  [DepartmentActionType.setList]:       (state,
                                         action
                                        ) => ({
    ...state,
    list: action.payload,
  }),
  [DepartmentActionType.setId]:         (state,
                                         action
                                        ) => ({
    ...state,
    id: action.payload,
  }),
  [DepartmentActionType.setOne]:        (state,
                                         action
                                        ) => ({
    ...state,
    detail: action.payload,
  }),
  [DepartmentActionType.requestUpsert]: (state,
                                         action
                                        ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [DepartmentActionType.requestDelete]: (state,
                                         action
                                        ) => ({
    ...state,
    requestDelete: action.payload
  })
});