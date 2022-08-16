import {
  DepartmentShort,
  DepartmentVO
} from 'department/domain';
import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { DepartmentAction } from 'department/action';
import { DepartmentQuery } from 'department/query';

export interface DepartmentState {
  filter?: DepartmentQuery;
  page?: Page<DepartmentShort>;
  list?: DepartmentShort[];
  detail?: DepartmentVO;
}

const initialState: DepartmentState = {};

export const departmentReducer = createReducer(initialState, {
  [DepartmentAction.setFilter]: (state,
                                 action
                                ) => ({
    ...state,
    filter: action.payload.values,
  }),
  [DepartmentAction.setPage]:   (state,
                                 action
                                ) => ({
    ...state,
    page: action.payload,
  }),
  [DepartmentAction.setList]:   (state,
                                 action
                                ) => ({
    ...state,
    list: action.payload,
  }),
  [DepartmentAction.setOne]:    (state,
                                 action
                                ) => ({
    ...state,
    detail: action.payload,
  })
});