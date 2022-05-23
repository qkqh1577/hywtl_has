import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  BusinessAddParameter,
  BusinessChangeParameter,
  BusinessQuery,
  BusinessQueryForModal,
  businessActions, BusinessRegistrationNumberCheckParameter,
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

  const clearOne = useCallback(
    () =>
      dispatch(businessActions.setOne(undefined)),
    [dispatch],
  );

  const add = useCallback(
    (params: BusinessAddParameter, callback: () => void) =>
      dispatch(businessActions.add({ params, callback })),
    [dispatch]
  );

  const change = useCallback(
    (params: BusinessChangeParameter, callback: () => void) =>
      dispatch(businessActions.change({ params, callback })),
    [dispatch]
  );

  const remove = useCallback(
    (id: number, callback: () => void) =>
      dispatch(businessActions.remove({ id, callback })),
    [dispatch]
  );

  const checkRegistrationNumber = useCallback(
    (params: BusinessRegistrationNumberCheckParameter, callback: (e?: any) => void) =>
      dispatch(businessActions.checkRegistrationNumber({ params, callback })),
    [dispatch]
  );

  return {
    state,
    getPage,
    getAll,
    getOne,
    clearOne,
    add,
    change,
    remove,
    checkRegistrationNumber
  };
}