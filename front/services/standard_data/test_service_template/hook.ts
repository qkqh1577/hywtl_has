import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  TestServiceTemplateChangeSeqParameter,
  TestServiceTemplateParameter,
  TestServiceTemplateQuery,
  testServiceTemplateActions,
} from 'services/standard_data/test_service_template';

export default function useTestServiceTemplate() {
  const state = useSelector((state: RootState) => state.testServiceTemplate);
  const dispatch = useDispatch();

  const getList = useCallback(
    (query: TestServiceTemplateQuery) =>
      dispatch(testServiceTemplateActions.getList(query)),
    [dispatch]
  );

  const clearList = useCallback(
    () =>
      dispatch(testServiceTemplateActions.setList([])),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(testServiceTemplateActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(testServiceTemplateActions.setOne(undefined)),
    [dispatch]
  );

  const add = useCallback(
    (params: TestServiceTemplateParameter, callback: () => void) =>
      dispatch(testServiceTemplateActions.add({ params, callback })),
    [dispatch]
  );

  const change = useCallback(
    (id: number, params: TestServiceTemplateParameter, callback: () => void) =>
      dispatch(testServiceTemplateActions.change({ id, params, callback })),
    [dispatch]
  );

  const changeSeq = useCallback(
    (params: TestServiceTemplateChangeSeqParameter, callback: () => void) =>
      dispatch(testServiceTemplateActions.changeSeq({ params, callback })),
    [dispatch]
  );

  const setSeqModal = useCallback(
    (open: boolean) =>
      dispatch(testServiceTemplateActions.setSeqModal(open)),
    [dispatch]
  );

  const getSeqList = useCallback(
    () =>
      dispatch(testServiceTemplateActions.getSeqList()),
    [dispatch]
  );

  const clearSeqList = useCallback(
    () =>
      dispatch(testServiceTemplateActions.setSeqList([])),
    [dispatch]
  );

  return {
    state,
    getList,
    clearList,
    getOne,
    clearOne,
    add,
    change,
    changeSeq,
    setSeqModal,
    getSeqList,
    clearSeqList
  };
}