import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import User from 'services/user/entity';
import {
  AddUserParameter,
  ChangeUserParameter,
  ChangeUserPasswordParameter, LoginParameter,
  UserQuery
} from './parameter';
import { userActions } from './actions';

export default function useUser() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: UserQuery) =>
      dispatch(userActions.getPage(query)),
    [dispatch],
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(userActions.getOne(id)),
    [dispatch],
  );

  const clearOne = useCallback(
    () =>
      dispatch(userActions.setOne(undefined)),
    [dispatch],
  );

  const add = useCallback(
    (params: AddUserParameter, callback: (data?: User) => void) =>
      dispatch(userActions.add({ params, callback })),
    [dispatch],
  );

  const resetPassword = useCallback(
    (id: number, callback: (data?: User) => void) =>
      dispatch(userActions.resetPassword({ id, callback })),
    [dispatch]
  );

  const change = useCallback(
    (params: ChangeUserParameter, callback: (data?: User) => void) =>
      dispatch(userActions.change({ params, callback })),
    [dispatch],
  );

  const changePassword = useCallback(
    (params: ChangeUserPasswordParameter, callback: (data?: User) => void) =>
      dispatch(userActions.changePassword({ params, callback })),
    [dispatch],
  );

  const selectOne = useCallback(
    (id: number) =>
      dispatch(userActions.selectOne(id)),
    [dispatch],
  );

  const getLogin = useCallback(
    (callback: () => void) =>
      dispatch(userActions.getLogin(callback)),
    [dispatch]
  );

  const setLogin = useCallback(
    (data?: User) =>
      dispatch(userActions.setLogin(data)),
    [dispatch]
  );

  const login = useCallback(
    (params: LoginParameter, callback: (data?: User) => void) =>
      dispatch(userActions.login({ params, callback })),
    [dispatch]
  );
  const logout = useCallback(
    () =>
      dispatch(userActions.logout()),
    [dispatch]
  );

  return {
    userState,
    getPage,
    getOne,
    clearOne,
    add,
    resetPassword,
    change,
    changePassword,
    selectOne,
    getLogin,
    setLogin,
    login,
    logout,
  };
}