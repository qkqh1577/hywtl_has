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
import { businessApi } from 'business/api';

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
    const { payload: id } = yield take(projectDocumentAction.setId);
    const detail: ProjectDocumentVO = yield call(projectDocumentApi.getOne, id);
    yield put(projectDocumentAction.setOne(detail));
  }
}

function* watchAdd() {
  while (true) {
    const { payload: formik } = yield take(ProjectDocumentAction.add);
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
      yield put(projectDocumentAction.setId(formik.values.id));
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

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(ProjectDocumentAction.delete);
    try {
      yield call(projectDocumentApi.delete, id);
      yield put(dialogActions.openAlert('삭제 했습니다.'));
    }
    catch (e) {
      //TODO: 삭제 정책 후 수정 필요
      yield put(dialogActions.openAlert({
        children: '해당 자료는 동 정보에 연결되어 삭제할 수 없습니다. 자료를 삭제하려면, 동 정보 연결을 해제해 주세요.',
        status:   'error',
      }));
    }
  }
}

export default function* documentSaga() {
  yield fork(watchAllList);
  yield fork(watchId);
  yield fork(watchAdd);
  yield fork(watchUpdate);
  yield fork(watchDelete);
};
