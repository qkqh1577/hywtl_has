import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  projectStatusAction,
  ProjectStatusActionType,
  projectStatusEvent,
  ProjectStatusEventType
} from 'project_status/action';
import { RootState } from 'services/reducer';
import {
  ProjectEstimateExpectation,
  ProjectStatus
} from 'project_status/domain';
import { projectStatusApi } from 'project_status/api';
import { ProjectId } from 'project/domain';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';
import { dialogActions } from 'components/Dialog';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(ProjectStatusActionType.setProjectId);
    yield requestStatus(projectId);
  }
}

function* handleChangeStatus() {
  while (true) {
    const { payload: { status } } = (yield take(ProjectStatusEventType.changeStatus)) as { payload: { status: Partial<ProjectStatus> } };

    if (status.estimateExpectation === ProjectEstimateExpectation.LOSE) {
      const { failReason } = yield select((root: RootState) => root.projectBasic);
      if (isEmpty(failReason)) {
        yield put(projectStatusAction.setFailReasonAddModal(true));
        const { payload: { success } } = yield take(ProjectStatusEventType.finishFailReasonAdd);
        yield put(projectStatusAction.setFailReasonAddModal(false));

        if (!success) {
          yield reloadStatus();
          continue;
        }
      }
    }

    try {
      yield updateStatus(status);
    } catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        children: '수정에 실패하였습니다.',
        status:   'error'
      }));
    }
    yield reloadStatus();
  }

  function* updateStatus(params: Partial<ProjectStatus>) {
    const { projectId } = yield select((root: RootState) => root.projectStatus);
    yield call(projectStatusApi.update, projectId, params);
  }
}

function* handleConfirmClickFailReasonAdd() {
  while (true) {
    const { payload: { params } } = (yield take(ProjectStatusEventType.confirmClickFailReasonAdd)) as { payload: { params: ProjectBasicFailReasonParameter } };
    try {
      yield addFailReason(params);
      yield put(dialogActions.openAlert('등록하였습니다.'));
      yield put(projectStatusEvent.finishFailReasonAdd(true));
    } catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error'
      }));
      yield put(projectStatusEvent.finishFailReasonAdd(false));
    }
  }

  function* addFailReason(params: ProjectBasicFailReasonParameter) {
    const { projectId } = yield select((root: RootState) => root.projectStatus);
    yield call(projectStatusApi.addFailReason, projectId, params);
  }
}

function* handleCancelClickFailReasonAdd() {
  while (true) {
    yield take(ProjectStatusEventType.cancelClickFailReasonAdd);
    yield put(projectStatusEvent.finishFailReasonAdd(false));
  }
}

function* reloadStatus() {
  const { projectId } = yield select((root: RootState) => root.projectStatus);
  yield requestStatus(projectId);
}

function* requestStatus(id: ProjectId) {
  const status: ProjectStatus = yield call(projectStatusApi.getOne, id);
  yield put(projectStatusAction.setStatus(status));
}

function isEmpty(input: any) {
  if (!input) {
    return true;
  }
  return Object.values(input)
               .filter(e => e !== null).length === 0;
}

export default function* projectStatusSaga() {
  yield fork(watchProjectId);
  yield fork(handleChangeStatus);
  yield fork(handleConfirmClickFailReasonAdd);
  yield fork(handleCancelClickFailReasonAdd);
}
