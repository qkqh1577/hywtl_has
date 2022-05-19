import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  Business,
  BusinessAddParameter,
  BusinessChangeParameter,
  BusinessQuery,
  BusinessQueryForModal,
  businessActions,
} from 'services/business';

export default function useBusiness() {
  const state = useSelector((state: RootState) => state.business);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: BusinessQuery) => {
      dispatch(businessActions.getPage(query));
    },
    [dispatch]
  );

  const getAll = useCallback(
    (query: BusinessQueryForModal) => {
      dispatch(businessActions.getAll(query));
    },
    [dispatch]);

  const getOne = useCallback(
    (id: number) =>
      dispatch(businessActions.getOne(id)),
    [dispatch]
  );

  const add = useCallback(
    (params: BusinessAddParameter, callback: (data?: Business) => void) =>
      dispatch(businessActions.add({ params, callback })),
    [dispatch]
  );

  const change = useCallback(
    (params: BusinessChangeParameter, callback: (data?: Business) => void) =>
      dispatch(businessActions.change({ params, callback })),
    [dispatch]
  );

  return {
    state,
    getPage,
    getAll,
    getOne,
    add,
    change
  };
}