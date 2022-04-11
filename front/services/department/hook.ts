import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/reducer';
import { useCallback } from 'react';
import { departmentActions } from './actions';
import {
  DepartmentAddParameter,
  DepartmentChangeParameter,
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

  const add = useCallback(
    (params: DepartmentAddParameter) =>
      dispatch(departmentActions.add(params)),
    [dispatch]
  );

  const change = useCallback(
    (params: DepartmentChangeParameter, callback: (success?: boolean) => void) =>
      dispatch(departmentActions.change({ params, callback })),
    [dispatch]
  );

  const changeParent = useCallback(
    (params: { id: number; parentId?: number; }, callback: (success?: boolean) => void) =>
      dispatch(departmentActions.changeParent({ params, callback })),
    [dispatch]
  );

  const selectOne = useCallback(
    (id?: number) =>
      dispatch(departmentActions.selectOne(id)),
    [dispatch]
  );

  return {
    departmentState,
    getAll,
    getPage,
    getOne,
    clearOne,
    add,
    change,
    changeParent,
    selectOne
  };
}