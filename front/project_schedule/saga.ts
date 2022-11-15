import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectScheduleAction } from 'project_schedule/action';
import { RootState } from 'services/reducer';
import {
  ProjectScheduleShortVO,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { projectScheduleApi } from 'project_schedule/api';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectScheduleAction.setId);
    if (id) {
      const detail: ProjectScheduleVO = yield call(projectScheduleApi.getOne, id);
      yield put(projectScheduleAction.setOne(detail));
    }
    else {
      yield put(projectScheduleAction.setOne(undefined));
    }
  }
}

function* watchFilter() {
  while (true) {
    const { payload: filter } = yield take(projectScheduleAction.setFilter);
    try {
      const list: ProjectScheduleShortVO[] = yield call(projectScheduleApi.getList, filter.projectId, filter);
      yield put(projectScheduleAction.setList(list));
    }
    catch (e) {
      yield put(projectScheduleAction.setList(undefined));
    }
  }
}

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(projectScheduleAction.add);
    try {
      yield put(projectScheduleAction.requestAdd('request'));
      const { projectId } = yield select((root: RootState) => root.projectSchedule);
      if (!projectId) {
        const message = '프로젝트가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectScheduleAction.requestAdd(message));
        continue;
      }
      yield call(projectScheduleApi.add, projectId, params);
      yield put(projectScheduleAction.requestAdd('done'));
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectScheduleAction.add, e);
      yield put(dialogAction.openError(message));
      yield put(projectScheduleAction.requestAdd(message));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(projectScheduleAction.update);
    try {
      yield put(projectScheduleAction.requestUpdate('request'));
      yield call(projectScheduleApi.update, params);
      yield put(projectScheduleAction.requestUpdate('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectScheduleAction.update, e);
      yield put(dialogAction.openError(message));
      yield put(projectScheduleAction.requestUpdate(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectScheduleAction.deleteOne);
    try {
      yield put(projectScheduleAction.requestDelete('request'));
      if (!id) {
        const message = '일정이 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectScheduleAction.requestDelete(message));
        continue;
      }
      yield call(projectScheduleApi.deleteOne, id);
      yield put(projectScheduleAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectScheduleAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(projectScheduleAction.requestDelete(message));
    }
  }
}

export default function* projectScheduleSaga() {
  yield fork(watchFilter);
  yield fork(watchAdd);
  yield fork(watchUpdate);
  yield fork(watchDelete);
  yield fork(watchId);
};
