import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ServiceItemQuery,
  serviceItemActions
} from 'services/serviceItem';

export default function useServiceItem() {
  const state = useSelector((state: RootState) => state.serviceItem);
  const dispatch = useDispatch();

  const getList = useCallback(
    (query: ServiceItemQuery) => {
      dispatch(serviceItemActions.getList(query));
    },
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) => dispatch(serviceItemActions.getOne(id)),
    [dispatch]
  );

  return {
    state,
    getList,
    getOne,
  }
}