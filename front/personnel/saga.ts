import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  PersonnelAction,
  personnelAction
} from 'personnel/action';
import Page from 'type/Page';
import {
  PersonnelAcademicVO,
  PersonnelBasicVO,
  PersonnelCareerVO,
  PersonnelJobVO,
  PersonnelLanguageVO,
  PersonnelLicenseVO,
  PersonnelShortVO,
} from 'personnel/domain';
import { personnelApi } from 'personnel/api';
import {
  UserId,
  UserVO
} from 'user/domain';
import { userApi } from 'user/api';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(personnelAction.setFilter);
    try {
      const page: Page<PersonnelShortVO> = yield call(personnelApi.getPage, formik.values);
      yield put(personnelAction.setPage(page));
    }
    catch (e) {
      yield put(personnelAction.setPage(undefined));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchAccount() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);

    const account: UserVO = yield call(userApi.getOne, UserId(id as number));
    yield put(personnelAction.setAccount(account))
  }
}

function* watchBasic() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const basic: PersonnelBasicVO = yield call(personnelApi.getBasic, id);
    yield put(personnelAction.setBasic(basic));
  }
}

function* watchCompany() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const company = yield call(personnelApi.getCompany, id);
    yield put(personnelAction.setCompany(company));
  }
}

function* watchJobList() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const jobList: PersonnelJobVO[] = yield call(personnelApi.getJobList, id);
    yield put(personnelAction.setJobList(jobList));
  }
}

function* watchAcademicList() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const academyList: PersonnelAcademicVO[] = yield call(personnelApi.getAcademicList, id);
    yield put(personnelAction.setAcademicList(academyList));
  }
}

function* watchCareerList() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const careerList: PersonnelCareerVO[] = yield call(personnelApi.getCareerList, id);
    yield put(personnelAction.setCareerList(careerList));
  }
}

function* watchLicenseList() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const licenseList: PersonnelLicenseVO[] = yield call(personnelApi.getLicenseList, id);
    yield put(personnelAction.setLicenseList(licenseList));
  }
}

function* watchLanguageList() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const languageList: PersonnelLanguageVO[] = yield call(personnelApi.getLanguageList, id);
    yield put(personnelAction.setLanguageList(languageList));

  }
}


export default function* personnelSaga() {
  yield fork(watchFilter);
  yield fork(watchAccount);
  yield fork(watchBasic);
  yield fork(watchCompany);
  yield fork(watchJobList);
  yield fork(watchAcademicList);
  yield fork(watchCareerList);
  yield fork(watchLicenseList);
  yield fork(watchLanguageList);
};
