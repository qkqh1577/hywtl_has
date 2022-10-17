import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  projectBasicAction,
  ProjectBasicActionType
} from 'project_basic/action';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicDesign,
} from 'project_basic/domain';
import { projectBasicApi } from 'project_basic/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';
import { BusinessVO } from 'business/domain';
import { businessApi } from 'business/api';
import { projectComplexApi } from 'project_complex/api';
import { ProjectComplexTestVO } from 'project_complex/domain';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(ProjectBasicActionType.setId);
    yield put(projectBasicAction.getBasic(id));
    yield put(projectBasicAction.getBusinessList(id));
    yield put(projectBasicAction.getDesign(id));
    yield put(projectBasicAction.getTest(id));
  }
}

function* watchBasic() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getBasic);
    if (id) {
      const basic: ProjectBasic = yield call(projectBasicApi.getOne, id);
      yield put(projectBasicAction.setBasic(basic));
    }
    else {
      yield put(projectBasicAction.setBasic(undefined));
    }
  }
}

function* watchBusinessList() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getBusinessList);
    if (id) {
      const list: ProjectBasicBusiness[] = yield call(projectBasicApi.getBusinessList, id);
      yield put(projectBasicAction.setBusinessList(list));
    }
    else {
      yield put(projectBasicAction.setBusinessList(undefined));
    }
  }
}

function* watchBusiness() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getBusiness);
    if (id) {
      const detail: BusinessVO = yield call(businessApi.getOne, id);
      yield put(projectBasicAction.setBusiness(detail));
    }
    else {
      yield put(projectBasicAction.setBusiness(undefined));
    }
  }
}

function* watchDesign() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getDesign);
    if (id) {
      const detail: ProjectBasicDesign = yield call(projectBasicApi.getDesign, id);
      yield put(projectBasicAction.setDesign(detail));
    }
    else {
      yield put(projectBasicAction.setDesign(undefined));
    }
  }
}

function* watchTest() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getTest);
    if (id) {
      const detail: ProjectComplexTestVO = yield call(projectComplexApi.getTestDetail, id);
      yield put(projectBasicAction.setTest(detail));
    }
    else {
      yield put(projectBasicAction.setTest(undefined));
    }
  }
}

function* watchAddBusiness() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.addBusiness);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestAddBusiness(ApiStatus.REQUEST));
      yield call(projectBasicApi.addBusiness, id, params);
      yield put(projectBasicAction.requestAddBusiness(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectBasicAction.requestAddBusiness(ApiStatus.FAIL));
    }
  }
}

function* watchChangeBusiness() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.changeBusiness);
    try {
      yield put(projectBasicAction.requestChangeBusiness(ApiStatus.REQUEST));
      yield call(projectBasicApi.changeBusiness, params);
      yield put(projectBasicAction.requestChangeBusiness(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectBasicAction.requestChangeBusiness(ApiStatus.FAIL));
    }
  }
}

function* watchDeleteBusiness() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.deleteBusiness);
    try {
      yield put(projectBasicAction.requestDeleteBusiness(ApiStatus.REQUEST));
      yield call(projectBasicApi.deleteBusiness, id);
      yield put(projectBasicAction.requestDeleteBusiness(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectBasicAction.requestDeleteBusiness(ApiStatus.FAIL));
    }
  }
}

function* watchUpdateBasic() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateBasic);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestUpdateBasic(ApiStatus.REQUEST));
      yield call(projectBasicApi.updateBasic, id, params);
      yield put(projectBasicAction.requestUpdateBasic(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectBasicAction.requestUpdateBasic(ApiStatus.FAIL));
    }
  }
}

function* watchUpdateDesign() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateDesign);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestUpdateDesign(ApiStatus.REQUEST));
      yield call(projectBasicApi.updateDesign, id, params);
      yield put(projectBasicAction.requestUpdateDesign(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectBasicAction.requestUpdateDesign(ApiStatus.FAIL));
    }
  }
}

export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(watchBasic);
  yield fork(watchBusinessList);
  yield fork(watchBusiness);
  yield fork(watchDesign);
  yield fork(watchTest);
  yield fork(watchAddBusiness);
  yield fork(watchChangeBusiness);
  yield fork(watchDeleteBusiness);
  yield fork(watchUpdateBasic);
  yield fork(watchUpdateDesign);
}
