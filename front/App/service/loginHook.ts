import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import { LoginParameter } from 'App/domain/parameter';
import { loginAction } from 'App/domain/action';

export default function useLogin() {

  const state = useSelector((root: RootState) => root.login);
  const { user } = state;
  const dispatch = useDispatch();

  const login = useCallback(
    (params: LoginParameter) => dispatch(loginAction.login(params)),
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