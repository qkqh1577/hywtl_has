import {useDispatch, useSelector} from "react-redux";
import { RootState } from 'services/common/reducer';
import {useCallback} from "react";
import {companyActions} from "./actions";
import {CompanyQuery} from "./parameters";

export default function useCompany() {
  const companyState = useSelector((state: RootState) => state.company);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: CompanyQuery) => {
      dispatch(companyActions.getPage(query))
    },
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(companyActions.getOne(id)),
    [dispatch]
  );

  return {
    companyState,
    getPage,
    getOne
  };
}