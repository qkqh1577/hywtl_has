import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import Department, { ListDepartment } from 'services/department/entity';
import { departmentActions } from './actions';
import {
  DepartmentParameter,
  DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';

export default function useDepartment() {
  const departmentState = useSelector((state: RootState) => state.department);
  const dispatch = useDispatch();

  const getAll = useCallback(
    () => dispatch(departmentActions.getAll()),
    [dispatch]
  );

  const getPage = useCallback(
    (query: DepartmentQuery) =>
      dispatch(departmentActions.getPage(query)),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(departmentActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () => dispatch(departmentActions.setOne(undefined)),
    [dispatch]
  );

  const upsert = useCallback(
    (params: DepartmentParameter, callback: (data?: Department) => void) =>
      dispatch(departmentActions.upsert({ params, callback })),
    [dispatch]
  );

  const changeTree = useCallback(
    (params: DepartmentChangeTreeParameter, callback: (list?: ListDepartment[]) => void) =>
      dispatch(departmentActions.changeTree({ params, callback })),
    [dispatch],
  );

  return {
    departmentState,
    getAll,
    getPage,
    getOne,
    clearOne,
    upsert,
    changeTree,
  };
}
