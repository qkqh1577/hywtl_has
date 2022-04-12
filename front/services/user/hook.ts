import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/reducer';
import { useCallback } from 'react';
import { UserAddParameter, UserChangeParameter, UserQuery } from './parameter';
import { userActions } from './actions';
import User from 'services/user/User';

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
    (params: UserAddParameter, callback: (data?: User) => void) =>
      dispatch(userActions.add({ params, callback })),
    [dispatch],
  );

  const change = useCallback(
    (params: UserChangeParameter, callback: (data?: User) => void) =>
      dispatch(userActions.change({ params, callback })),
    [dispatch],
  );

  const selectOne = useCallback(
    (id: number) =>
      dispatch(userActions.selectOne(id)),
    [dispatch],
  );

  return {
    userState,
    getPage,
    getOne,
    clearOne,
    add,
    change,
    selectOne,
  };
}