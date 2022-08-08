import {
  combineReducers,
  Reducer
} from 'redux';
import {
  userReducer,
  UserState
} from 'user/repository/reducer';
import {
  LoginState,
  MenuState,
  loginReducer,
  menuReducer,
} from 'App/repository/reducer';
import {
  DialogState,
  dialogReducer,
} from 'components/Dialog';
import {
  departmentReducer,
  DepartmentState
} from 'department/repository/reducer';

export interface RootState {
  user: UserState;
  login: LoginState;
  department: DepartmentState;
  menu: MenuState;
  dialog: DialogState;
}

const reducer = combineReducers<RootState>({
  user:       userReducer,
  login:      loginReducer,
  department: departmentReducer,
  menu:       menuReducer,
  dialog:     dialogReducer,
});

const rootReducer: Reducer = (state,
                              action
) => {
  if (action.type === 'user/logout') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export default rootReducer;