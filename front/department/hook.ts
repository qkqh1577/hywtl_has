import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/reducer';
import { useCallback } from 'react';
import { departmentActions } from 'department/actions';

export default function useDepartment() {
  const departmentState = useSelector((state: RootState) => state.department);
  const dispatch = useDispatch();

  const getOne = useCallback(
    (id: number) =>
      dispatch(departmentActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () => dispatch(departmentActions.setOne(undefined)),
    [dispatch]
  );

  return {
    departmentState,
    getOne,
    clearOne
  };
}