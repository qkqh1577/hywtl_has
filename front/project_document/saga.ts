import {
  ProjectDocumentAction,
  projectDocumentAction,
} from 'project_document/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  ProjectDocumentShort,
  ProjectDocumentVO
} from 'project_document/domain';
import { projectDocumentApi } from 'project_document/api';
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
    const { payload: id } = yield take(projectDocumentAction.setId);
    const detail: ProjectDocumentVO = yield call(projectDocumentApi.getOne, id);
    yield put(projectDocumentAction.setOne(detail));
  }
}

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(ProjectDocumentAction.add);
    try {
      yield put(projectDocumentAction.addModal('request'));
      yield call(projectDocumentApi.add, params);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put(projectDocumentAction.addModal('response'));
      if (params.type === 'RECEIVED') {
        yield call(fetchReceivedList, params.projectId);
      }
      else if (params.type === 'SENT') {
        yield call(fetchSentList, params.projectId);
      }
      else if (params.type === 'BUILDING') {
        yield call(fetchBuildingList, params.projectId);
      }
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: formik } = yield take(ProjectDocumentAction.change);
    try {
      yield call(projectDocumentApi.change, formik.values);
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
  yield fork(watchChange);
  yield fork(watchDelete);
};
