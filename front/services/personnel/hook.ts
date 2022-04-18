import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import { personnelActions } from 'services/personnel/actions';
import { PersonnelAddParameter, PersonnelChangeParameter } from 'services/personnel/parameter';
import Personnel from 'services/personnel/entity';

export default function usePersonnel() {
  const personnelState = useSelector((state: RootState) => state.personnel);
  const dispatch = useDispatch();

  const getOne = useCallback(
    (id: number) =>
      dispatch(personnelActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(personnelActions.setOne(undefined)),
    [dispatch]
  );

  const add = useCallback(
    (params: PersonnelAddParameter, callback: (data?: Personnel) => void) =>
      dispatch(personnelActions.add({ params, callback })),
    [dispatch]
  );

  const change = useCallback(
    (params: PersonnelChangeParameter, callback: (data?: Personnel) => void) =>
      dispatch(personnelActions.change({ params, callback })),
    [dispatch],
  );

  return {
    personnelState,
    getOne,
    clearOne,
    add,
    change,
  };
}
