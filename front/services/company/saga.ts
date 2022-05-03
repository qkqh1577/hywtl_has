import { ActionType } from 'typesafe-actions';
import Company, {ListCompany} from "./entity";
import {companyActions, CompanyActionType} from "./actions";
import companyApi from "./api";
import {put, takeLatest} from "redux-saga/effects";
import Page from "components/Page";

function* getPage(action: ActionType<typeof companyActions.getPage>) {
  const page: Page<ListCompany> = yield companyApi.getPage(action.payload);
  yield put(companyActions.setPage(page));
}

function* getOne(action: ActionType<typeof companyActions.getOne>) {
  try {
    const detail: Company = yield companyApi.getOne(action.payload);
    yield put(companyActions.setOne(detail));
  } catch (e) {
    // nothing to do
  }
}

export default function* saga() {
  yield takeLatest(CompanyActionType.getPage, getPage);
  yield takeLatest(CompanyActionType.getOne, getOne);
}