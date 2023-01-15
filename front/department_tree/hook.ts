import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter, DepartmentChangeTreeParameter,
  DepartmentQuery
} from './parameter';
import { RootState } from 'services/reducer';
import { departmentTreeActions } from './action';
import Department, {ListDepartment} from "./entity";

export default function useDepartment() {
  const departmentState = useSelector((state: RootState) => state.departmentTree);
  const dispatch = useDispatch();

  const getAll = useCallback(
    () => dispatch(departmentTreeActions.getAll()),
    [dispatch]
  );

  const getPage = useCallback(
    (query: DepartmentQuery) =>
      dispatch(departmentTreeActions.getPage(query)),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(departmentTreeActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () => dispatch(departmentTreeActions.setOne(undefined)),
    [dispatch]
  );

  const add = useCallback(
    (params: DepartmentAddParameter, callback: (data?: Department) => void) =>
      dispatch(departmentTreeActions.add({ params, callback })),
    [dispatch]
  );

  const change = useCallback(
    (params: DepartmentChangeParameter, callback: (data?: Department) => void) =>
      dispatch(departmentTreeActions.change({ params, callback })),
    [dispatch]
  );

  const changeTree = useCallback(
    (params: DepartmentChangeTreeParameter, callback: (list?: ListDepartment[]) => void) =>
      dispatch(departmentTreeActions.changeTree({ params, callback })),
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
