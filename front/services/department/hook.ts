import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  Department,
  DepartmentChangeTreeParameter,
  DepartmentParameter,
  DepartmentQuery,
  DepartmentShort,
  departmentActions,
} from 'services/department';

export default function useDepartment() {
  const state = useSelector((state: RootState) => state.department);
  const dispatch = useDispatch();

  const getAll = useCallback(
    (type?: string) => dispatch(departmentActions.getAll(type)),
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
    (params: DepartmentChangeTreeParameter, callback: (list?: DepartmentShort[]) => void) =>
      dispatch(departmentActions.changeTree({ params, callback })),
    [dispatch],
  );

  return {
    state,
    getAll,
    getPage,
    getOne,
    clearOne,
    upsert,
    changeTree,
  };
}
