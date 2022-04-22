import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import { personnelActions } from 'services/personnel/actions';
import { PersonnelParameter, PersonnelQuery } from 'services/personnel/parameter';
import Personnel from 'services/personnel/entity';

export default function usePersonnel() {
  const personnelState = useSelector((state: RootState) => state.personnel);
  const dispatch = useDispatch();

  const getPage =useCallback(
    (query: PersonnelQuery) =>
      dispatch(personnelActions.getPage(query)),
    [dispatch]
  )

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

  const update = useCallback(
    (params: PersonnelParameter, callback: (data?: Personnel) => void) =>
      dispatch(personnelActions.update({ params, callback })),
    [dispatch]
  );

  return {
    personnelState,
    getPage,
    getOne,
    clearOne,
    update,
  };
}
