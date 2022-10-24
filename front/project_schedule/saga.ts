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
import { dialogActions } from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

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
    const action = yield take(projectScheduleAction.add);
    const { payload: params } = action;
    console.log(action);
    try {
      const { projectId } = yield select((root: RootState) => root.projectSchedule);
      yield put(projectScheduleAction.requestAdd(ApiStatus.REQUEST));
      yield call(projectScheduleApi.add, projectId, params);
      yield put(projectScheduleAction.requestAdd(ApiStatus.DONE));
      yield put(dialogActions.openAlert('저장하였습니다.'));
    }
    catch (e) {
      console.error(e);
      yield put(projectScheduleAction.requestAdd(ApiStatus.FAIL));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(projectScheduleAction.update);
    try {
      yield call(projectScheduleApi.update, params);
      yield put(dialogActions.openAlert('저장하였습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectScheduleAction.deleteOne);
    try {
      yield call(projectScheduleApi.deleteOne, id);
      yield put(dialogActions.openAlert('삭제 했습니다.'));
    }
    catch (e) {
      //TODO: 삭제 정책 후 수정 필요
      yield put(dialogActions.openAlert({
        children: '해당 일정은 삭제할 수 없습니다.',
        status:   'error',
      }));
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
