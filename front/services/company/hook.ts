import {useDispatch, useSelector} from "react-redux";
import { RootState } from 'services/common/reducer';
import {useCallback} from "react";
import {companyActions} from "./actions";
import {CompanyAddParameter, CompanyChangeParameter, CompanyQuery, CompanyQueryForModal} from "./parameters";
import {Company} from "./entity";

export default function useCompany() {
  const companyState = useSelector((state: RootState) => state.company);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: CompanyQuery) => {
      dispatch(companyActions.getPage(query))
    },
    [dispatch]
  );

  const getAll = useCallback(
    (query: CompanyQueryForModal) => {
      dispatch(companyActions.getAll(query))
    },
    [dispatch])

  const getOne = useCallback(
    (id: number) =>
      dispatch(companyActions.getOne(id)),
    [dispatch]
  );

  const add = useCallback(
    (params: CompanyAddParameter, callback: (data?: Company) => void) =>
      dispatch(companyActions.add({ params, callback })),
    [dispatch]
  )

  const change = useCallback(
    (params: CompanyChangeParameter, callback: (data?: Company) => void) =>
      dispatch(companyActions.change({ params, callback })),
    [dispatch]
  )

  return {
    companyState,
    getPage,
    getAll,
    getOne,
    add,
    change
  };
}