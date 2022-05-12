import { ActionType } from 'typesafe-actions';
import CompanyDetail, {Company, CompanyList} from "./entity";
import {companyActions, CompanyActionType} from "./actions";
import companyApi from "./api";
import {put, takeLatest} from "redux-saga/effects";
import Page from "components/Page";

function* getPage(action: ActionType<typeof companyActions.getPage>) {
  const page: Page<CompanyList> = yield companyApi.getPage(action.payload);
  yield put(companyActions.setPage(page));
}

function* getAll(action: ActionType<typeof companyActions.getAll>) {
  const data: Company[] = yield companyApi.getAll(action.payload);
  yield put(companyActions.setAll(data));
}

function* getOne(action: ActionType<typeof companyActions.getOne>) {
  try {
    const detail: CompanyDetail = yield companyApi.getOne(action.payload);
    yield put(companyActions.setOne(detail));
  } catch (e) {
    // nothing to do
  }
}

function* add(action: ActionType<typeof companyActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Company = yield companyApi.add(params);
    yield put(companyActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* change(action: ActionType<typeof companyActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: Company = yield companyApi.change(params);
    yield put(companyActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* saga() {
  yield takeLatest(CompanyActionType.getPage, getPage);
  yield takeLatest(CompanyActionType.getAll, getAll);
  yield takeLatest(CompanyActionType.getOne, getOne);
  yield takeLatest(CompanyActionType.add, add);
  yield takeLatest(CompanyActionType.change, change);
}