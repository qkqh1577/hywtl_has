import { combineReducers } from 'redux';
import departmentReducer, { DepartmentState } from 'services/department/reducer';

export type RootState = {
  department: DepartmentState;
}

const reducer = combineReducers<RootState>({
  department: departmentReducer,
});

export default reducer;