import {
  DepartmentId,
  DepartmentShort,
  DepartmentVO
} from 'department/domain';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { DepartmentAction } from 'department/action';
import { DepartmentQuery } from 'department/query';
import { ApiStatus } from 'components/DataFieldProps';

export interface DepartmentState {
  filter?: DepartmentQuery;
  page?: Page<DepartmentShort>;
  list?: DepartmentShort[];
  detail?: DepartmentVO;
  id?: DepartmentId;
  requestUpsert: ApiStatus;
  requestDelete: ApiStatus;
}

const initialState: DepartmentState = {
  requestUpsert: ApiStatus.IDLE,
  requestDelete: ApiStatus.IDLE
};

export const departmentReducer = createReducer(initialState, {
  [DepartmentAction.setFilter]:     (state,
                                     action
                                    ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [DepartmentAction.setPage]:       (state,
                                     action
                                    ) => ({
    ...state,
    page: action.payload,
  }),
  [DepartmentAction.setList]:       (state,
                                     action
                                    ) => ({
    ...state,
    list: action.payload,
  }),
  [DepartmentAction.setId]:         (state,
                                     action
                                    ) => ({
    ...state,
    id: action.payload,
  }),
  [DepartmentAction.setOne]:        (state,
                                     action
                                    ) => ({
    ...state,
    detail: action.payload,
  }),
  [DepartmentAction.requestUpsert]: (state,
                                     action
                                    ) => ({
    ...state,
    requestUpsert: action.payload,
  }),
  [DepartmentAction.requestDelete]: (state,
                                     action
                                    ) => ({
    ...state,
    requestDelete: action.payload
  })
});