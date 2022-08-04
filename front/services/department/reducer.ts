import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'services/common/domain/Page';
import {
  Department,
  DepartmentActionType,
  DepartmentShort,
} from 'services/department';

export type DepartmentState = {
  list: DepartmentShort[];
  page: Page<DepartmentShort>;
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
