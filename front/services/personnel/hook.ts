import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  Personnel,
  PersonnelParameter,
  PersonnelQuery,
  personnelActions,
} from 'services/personnel';

export default function usePersonnel() {
  const state = useSelector((state: RootState) => state.personnel);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: PersonnelQuery) =>
      dispatch(personnelActions.getPage(query)),
    [dispatch]
  );

  const getBasic = useCallback(
    (id: number) =>
      dispatch(personnelActions.getBasic(id)),
    [dispatch]
  );

  const getCompany = useCallback(
    (id: number) =>
      dispatch(personnelActions.getCompany(id)),
    [dispatch]
  );

  const getJob = useCallback(
    (id: number) =>
      dispatch(personnelActions.getJob(id)),
    [dispatch]
  );

  const getJobList = useCallback(
    (id: number) =>
      dispatch(personnelActions.getJobList(id)),
    [dispatch]
  );

  const getAcademicList = useCallback(
    (id: number) =>
      dispatch(personnelActions.getAcademicList(id)),
    [dispatch]
  );

  const getCareerList = useCallback(
    (id: number) =>
      dispatch(personnelActions.getCareerList(id)),
    [dispatch]
  );

  const getLicenseList = useCallback(
    (id: number) =>
      dispatch(personnelActions.getLicenseList(id)),
    [dispatch]
  );

  const getLanguageList = useCallback(
    (id: number) =>
      dispatch(personnelActions.getLanguageList(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(personnelActions.clearOne()),
    [dispatch]
  );

  const update = useCallback(
    (params: PersonnelParameter, callback: (data?: Personnel) => void) =>
      dispatch(personnelActions.update({ params, callback })),
    [dispatch]
  );

  return {
    state,
    getPage,
    getBasic,
    getCompany,
    getJob,
    getJobList,
    getAcademicList,
    getCareerList,
    getLicenseList,
    getLanguageList,
    clearOne,
    update,
  };
}
