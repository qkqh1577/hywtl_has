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
  PersonnelVO,
} from 'personnel/domain';
import { personnelApi } from 'personnel/api';
import {
  UserId,
  UserVO
} from 'user/domain';
import { userApi } from 'user/api';
import { dialogActions } from 'components/Dialog';

function* watchId() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const detail: PersonnelVO = yield call(personnelApi.getOne, id);
    console.log("inside of saga : ", detail);
    yield put(personnelAction.setOne(detail));
  }
}

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
    yield put(personnelAction.setAccount(account));
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

function* watchUpdate() {
  while (true) {
    const { payload: formik } = yield take(PersonnelAction.update);
    try {
      yield call(personnelApi.update, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put({
        type: PersonnelAction.setId,
        id:   formik.values.id
      });
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

export default function* personnelSaga() {
  yield fork(watchId);
  yield fork(watchFilter);
  // yield fork(watchAccount);
  // yield fork(watchBasic);
  // yield fork(watchCompany);
  // yield fork(watchJobList);
  // yield fork(watchAcademicList);
  // yield fork(watchCareerList);
  // yield fork(watchLicenseList);
  // yield fork(watchLanguageList);
  yield fork(watchUpdate);
};
