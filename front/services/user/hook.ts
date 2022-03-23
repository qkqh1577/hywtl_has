import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'common/reducer';
import {useCallback} from 'react';
import {UserAddParameter, UserChangeParameter, UserQuery} from './parameter';
import {userActions} from './actions';

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
    (params: UserAddParameter) =>
      dispatch(userActions.add(params)),
    [dispatch],
  );

  const change = useCallback(
    (params: UserChangeParameter) =>
      dispatch(userActions.change(params)),
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