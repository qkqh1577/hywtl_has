import { createReducer } from 'typesafe-actions';
import { DepartmentActionType } from 'department/actions';
import Department from 'department/Department';
import Page, { initial } from 'common/Page';

export type DepartmentState = {
  page: Page<Department>;
  detail?: Department;
}

export const initState: DepartmentState = {
  page: initial,
};

const departmentReducer = createReducer(initState, {
  [DepartmentActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default departmentReducer;
