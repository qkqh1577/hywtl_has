import { createReducer } from 'typesafe-actions';
import { DepartmentActionType } from './actions';
import Department from './Department';
import Page, { initial } from 'common/Page';

export type DepartmentState = {
  page: Page<Department>;
  detail?: Department;
  selectedId?: number;
}

export const initState: DepartmentState = {
  page: initial,
};

const departmentReducer = createReducer(initState, {
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
