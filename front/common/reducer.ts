import { combineReducers } from 'redux';
import departmentReducer, { DepartmentState } from 'services/department/reducer';
import userReducer , { UserState } from 'services/user/reducer';

export type RootState = {
  department: DepartmentState;
  user: UserState;
}

const reducer = combineReducers<RootState>({
  department: departmentReducer,
  user: userReducer
});

export default reducer;