import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  useCallback,
  useEffect
} from 'react';
import { DepartmentQuery } from 'department/parameter/query';
import { departmentAction } from 'department/domain/action';
import { DepartmentId } from 'department/domain/department';
import { DepartmentParameter } from 'department/parameter/parameter';

export default function useDepartment() {
  const state = useSelector((root: RootState) => root.department);
  const {
          filter,
        } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(departmentAction.getPage(filter));
  }, [filter]);

  const setFilter = useCallback(
    (query: DepartmentQuery) => dispatch(departmentAction.setFilter(query)),
    [dispatch]
  );

  const getOne = useCallback((id: DepartmentId) => dispatch(departmentAction.getOne(id)), [dispatch]);

  const upsert = useCallback(
    (params: DepartmentParameter) => dispatch(departmentAction.upsert(params)),
    [dispatch]
  );
  return {
    ...state,
    setFilter,
    getOne,
    upsert,
  };
}