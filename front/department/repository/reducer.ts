import { DepartmentVO } from 'department/domain/department';
import Page, { initialPage } from 'services/common/domain/Page';
import { createReducer } from 'typesafe-actions';
import { DepartmentAction } from 'department/domain/action';
import {
  DepartmentQuery,
  initialDepartmentQuery
} from 'department/parameter/query';


export interface DepartmentState {
  filter: DepartmentQuery;
  page: Page<DepartmentVO>;
  list: DepartmentVO[] | undefined;
  detail: DepartmentVO | undefined;
}

const initialState: DepartmentState = {
  filter: initialDepartmentQuery,
  page:   initialPage,
  list:   undefined,
  detail: undefined,
};

export const departmentReducer = createReducer(initialState, {
  [DepartmentAction.setFilter]: (state,
                                 action
                                ) => ({
    ...state,
    filter: action.payload,
  }),
  [DepartmentAction.setPage]:   (state,
                                 action
                                ) => ({
    ...state,
    page: action.payload,
  }),
  [DepartmentAction.setOne]:    (state,
                                 action
                                ) => ({
    ...state,
    detail: action.payload,
  })
});