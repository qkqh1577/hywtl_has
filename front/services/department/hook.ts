import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import { departmentActions } from './actions';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter, DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';
import Department, { ListDepartment } from 'services/department/entity';

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

  const add = useCallback(
    (params: DepartmentAddParameter, callback: (data?: Department) => void) =>
      dispatch(departmentActions.add({ params, callback })),
    [dispatch]
  );

  const change = useCallback(
    (params: DepartmentChangeParameter, callback: (data?: Department) => void) =>
      dispatch(departmentActions.change({ params, callback })),
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
    add,
    change,
    changeTree,
  };
}
