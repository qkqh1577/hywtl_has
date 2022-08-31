import {
  ProjectDocumentAction,
  projectDocumentAction,
} from 'project/document/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  ProjectDocumentShort,
  ProjectDocumentVO
} from 'project/document/domain';
import {
  projectDocumentApi
} from 'project/document/api';
import { ProjectId } from 'project/domain';
import { dialogActions } from 'components/Dialog';

function* watchAllList() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.setAllList);
    yield fork(fetchSentList, id);
    yield fork(fetchReceivedList, id);
    yield fork(fetchBuildingList, id);
  }
}

function* fetchSentList(id: ProjectId) {
  const list: ProjectDocumentShort[] = yield call(projectDocumentApi.getSentList, id);
  yield put(projectDocumentAction.setSentList(list));
}

function* fetchReceivedList(id: ProjectId) {
  const list: ProjectDocumentShort[] = yield call(projectDocumentApi.getReceivedList, id);
  yield put(projectDocumentAction.setReceivedList(list));
}

function* fetchBuildingList(id: ProjectId) {
  const list: ProjectDocumentShort[] = yield call(projectDocumentApi.getBuildingList, id);
  yield put(projectDocumentAction.setBuildingList(list));
}

function* watchId() {
  while (true) {
    const { id } = yield take(ProjectDocumentAction.setOne);
    const detail: ProjectDocumentVO = yield call(projectDocumentApi.getOne, id);
    yield put(projectDocumentAction.setOne(detail));
  }
}

function* watchAdd() {
  while (true) {
    const { payload: formik } = yield take(ProjectDocumentAction.add);
    console.log(formik.values);
    try {
      yield call(projectDocumentApi.add, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
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

function* watchUpdate() {
  while (true) {
    const { payload: formik } = yield take(ProjectDocumentAction.update);
    try {
      yield call(projectDocumentApi.update, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
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


export default function* documentSaga() {
  yield fork(watchAllList);
  yield fork(watchId);
  yield fork(watchAdd);
  yield fork(watchUpdate);
};
