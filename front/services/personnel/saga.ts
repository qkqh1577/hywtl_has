import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'components/Page';
import {
  ListPersonnel,
  PersonnelAcademic,
  PersonnelActionType,
  PersonnelBasic,
  PersonnelCareer,
  PersonnelCompany,
  PersonnelJob,
  PersonnelLanguage,
  PersonnelLicense,
  personnelActions,
  personnelApi,
} from 'services/personnel';

function* getPage(action: ActionType<typeof personnelActions.getPage>) {
  const page: Page<ListPersonnel> = yield personnelApi.getPage(action.payload);
  yield put(personnelActions.setPage(page));
}

function* getBasic(action: ActionType<typeof personnelActions.getBasic>) {
  try {
    const detail: PersonnelBasic = yield personnelApi.getBasic(action.payload);
    yield put(personnelActions.setBasic(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getCompany(action: ActionType<typeof personnelActions.getCompany>) {
  try {
    const detail: PersonnelCompany = yield personnelApi.getCompany(action.payload);
    yield put(personnelActions.setCompany(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getJob(action: ActionType<typeof personnelActions.getJob>) {
  try {
    const detail: PersonnelJob = yield personnelApi.getJob(action.payload);
    yield put(personnelActions.setJob(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getJobList(action: ActionType<typeof personnelActions.getJobList>) {
  try {
    const detail: PersonnelJob[] | undefined = yield personnelApi.getJobList(action.payload);
    yield put(personnelActions.setJobList(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getAcademicList(action: ActionType<typeof personnelActions.getAcademicList>) {
  try {
    const detail: PersonnelAcademic[] | undefined = yield personnelApi.getAcademicList(action.payload);
    yield put(personnelActions.setAcademicList(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getCareerList(action: ActionType<typeof personnelActions.getCareerList>) {
  try {
    const detail: PersonnelCareer[] | undefined = yield personnelApi.getCareerList(action.payload);
    yield put(personnelActions.setCareerList(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getLicenseList(action: ActionType<typeof personnelActions.getLicenseList>) {
  try {
    const detail: PersonnelLicense[] | undefined = yield personnelApi.getLicenseList(action.payload);
    yield put(personnelActions.setLicenseList(detail));
  } catch (e) {
    // nothing to do
  }
}

function* getLanguageList(action: ActionType<typeof personnelActions.getLanguageList>) {
  try {
    const detail: PersonnelLanguage[] | undefined = yield personnelApi.getLanguageList(action.payload);
    yield put(personnelActions.setLanguageList(detail));
  } catch (e) {
    // nothing to do
  }
}

function* update(action: ActionType<typeof personnelActions.update>) {
  const { params, callback } = action.payload;
  try {
    yield personnelApi.update(params);
    callback();
  } catch (e) {
    console.log(e);
  }
}

export default function* personnelSaga() {
  yield takeLatest(PersonnelActionType.getPage, getPage);
  yield takeLatest(PersonnelActionType.getBasic, getBasic);
  yield takeLatest(PersonnelActionType.getCompany, getCompany);
  yield takeLatest(PersonnelActionType.getJob, getJob);
  yield takeLatest(PersonnelActionType.getJobList, getJobList);
  yield takeLatest(PersonnelActionType.getAcademicList, getAcademicList);
  yield takeLatest(PersonnelActionType.getCareerList, getCareerList);
  yield takeLatest(PersonnelActionType.getLicenseList, getLicenseList);
  yield takeLatest(PersonnelActionType.getLanguageList, getLanguageList);
  yield takeLatest(PersonnelActionType.update, update);
}
