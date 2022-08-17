import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useCallback } from 'react';
import { LoginParameter } from 'app/domain/parameter';
import { loginAction } from 'app/domain/action';

export default function useLogin() {

  const state = useSelector((root: RootState) => root.login);
  const { user } = state;
  const dispatch = useDispatch();

  const login = useCallback(
    (parameter: LoginParameter) => dispatch(loginAction.login(parameter)),
    [dispatch]
  );

  const getLoginUser = useCallback(
    () => dispatch(loginAction.getLoginUser()),
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch(loginAction.logout()),
    [dispatch]
  );

  return {
    user,
    login,
    getLoginUser,
    logout,
  };
}