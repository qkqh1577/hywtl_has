import { createReducer } from 'typesafe-actions';
import { DepartmentActionType } from './actions';
import Department, { ListDepartment } from './Department';
import Page, { initial } from 'common/Page';

export type DepartmentState = {
  list: Department[];
  page: Page<ListDepartment>;
  detail?: Department;
  selectedId?: number;
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
  [DepartmentActionType.selectOne]: (state, action) => ({
    ...state,
    selectedId: action.payload,
  }),
});

export default departmentReducer;
