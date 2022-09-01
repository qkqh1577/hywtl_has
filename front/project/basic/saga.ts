import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  projectBasicActionType,
  ProjectBasicActionType
} from 'project/basic/action';
import { ProjectId } from 'project/domain';
import { ProjectBasicBusiness } from 'project/basic/domain';
import { projectBasicApi } from 'project/basic/api';
import { dialogActions } from 'components/Dialog';
import { RootState } from 'services/reducer';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(ProjectBasicActionType.setId);
    yield call(requestBusinessList, id);
  }
}

function* requestBusinessList(id: ProjectId) {
  const businessList: ProjectBasicBusiness[] = yield call(projectBasicApi.getBusinessList, id);
  yield put(projectBasicActionType.setBusinessList(businessList));
}

function* pushBusiness() {
  while (true) {
    const { payload: formik } = yield take(ProjectBasicActionType.pushBusiness);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield call(projectBasicApi.pushBusiness, id, formik.values.params);
      yield put(dialogActions.openAlert('등록하였습니다.'));
      yield call(requestBusinessList, id);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '에러가 발생하였습니다.'
      }));
    }
    finally {
      yield  call(formik.setSubmitting, false);
    }
  }
}

export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(pushBusiness);
}