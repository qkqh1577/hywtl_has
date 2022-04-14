import { createReducer } from 'typesafe-actions';
import { DepartmentActionType } from './actions';
import Department, { ListDepartment } from './Department';
import Page, { initial } from 'common/Page';

export type DepartmentState = {
  list: ListDepartment[];
  page: Page<ListDepartment>;
  detail?: Department;
}

export const initState: DepartmentState = {
  list: [],
  page: initial,
};

const departmentReducer = createReducer(initState, {
  [DepartmentActionType.setAll]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [DepartmentActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [DepartmentActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default departmentReducer;
