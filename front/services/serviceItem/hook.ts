import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ServiceItemQuery,
  serviceItemActions,
  ServiceItemDetail,
  ServiceItemParameter
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

  const getOrderList = useCallback(() => dispatch(serviceItemActions.getOrderList()),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) => dispatch(serviceItemActions.getOne(id)),
    [dispatch]
  );

  const add = useCallback(
    (params: ServiceItemParameter, callback: (data?: ServiceItemDetail) => void) =>
      dispatch(serviceItemActions.add({params, callback})),
    [dispatch]
  );

  return {
    state,
    getList,
    getOrderList,
    getOne,
    add,
  }
}