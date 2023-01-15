import Page from 'type/Page';
import { createReducer } from 'typesafe-actions';
import { DepartmentActionType } from './action';
import Department, { ListDepartment } from './entity';

export type DepartmentTreeState = {
  list: ListDepartment[];
  page?: Page<ListDepartment>;
  detail?: Department;
}

export const initState: DepartmentTreeState = {
  list: [],
};

const departmentTreeReducer = createReducer(initState, {
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

export default departmentTreeReducer;
