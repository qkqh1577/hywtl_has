import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  ProjectScheduleAction,
  projectScheduleAction
} from 'project_schedule/action';
import { RootState } from 'services/reducer';
import {
  ProjectScheduleShort,
  ProjectScheduleVO
} from 'project_schedule/domain';
import { projectScheduleApi } from 'project_schedule/api';
import { dialogActions } from 'components/Dialog';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectScheduleAction.setId);
    const detail: ProjectScheduleVO = yield call(projectScheduleApi.getOne, id);
    yield put(projectScheduleAction.setOne(detail));
  }
}

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(projectScheduleAction.setFilter);
    try {
      const list: ProjectScheduleShort[] = yield call(projectScheduleApi.getList, formik.values.projectId, formik.values);
      yield put(projectScheduleAction.setList(list));
    }
    catch (e) {
      yield put(projectScheduleAction.setList(undefined));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchAdd() {
  while (true) {
    const { payload: formik } = yield take(ProjectScheduleAction.add);
    try {
      const { projectId } = yield select((root: RootState) => root.projectSchedule);
      yield put(projectScheduleAction.addModal(false));
      yield call(projectScheduleApi.add, projectId, formik.values);
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

function* watchUpdate() {
  while (true) {
    const { payload: formik } = yield take(ProjectScheduleAction.update);
    try {
      yield call(projectScheduleApi.update, formik.values);
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

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(ProjectScheduleAction.delete);
    try {
      yield call(projectScheduleApi.delete, id);
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
