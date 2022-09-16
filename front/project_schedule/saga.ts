import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectScheduleAction } from 'project_schedule/action';
import { RootState } from 'services/reducer';
import { ProjectScheduleShort } from 'project_schedule/domain';
import { projectScheduleApi } from 'project_schedule/api';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(projectScheduleAction.setFilter);
    try {
      const { projectId } = yield select((root: RootState) => root.projectSchedule);
      const list: ProjectScheduleShort[] = yield call(projectScheduleApi.getList, projectId, formik.values);
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

export default function* projectScheduleSaga() {
  yield fork(watchFilter);
};
