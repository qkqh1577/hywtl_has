import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useCallback,
  useEffect,
} from 'react';
import { UserQuery } from 'user/parameter/query';
import { userAction } from 'user/domain/action';
import { RootState } from 'services/common/reducer';
import { UserId } from 'user/domain/user';

export default function useUser() {

  const state = useSelector((root: RootState) => root.user);
  const {
          page,
          filter,
          detail,
        } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getPage(filter));
  }, [filter]);

  const setFilter = useCallback((query: UserQuery) => dispatch(userAction.setFilter(query)), [dispatch]);

  const getOne = useCallback((id: UserId) => dispatch(userAction.getOne(id)), [dispatch]);
  return {
    filter,
    page,
    detail,
    setFilter,
    getOne,
  };
}