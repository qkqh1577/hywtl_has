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
  ProjectBasicFailReason,
} from 'project_basic/domain';
import { projectBasicApi } from 'project_basic/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { RivalBidVO } from 'rival_bid/domain';
import { ProjectContractVO } from 'project_contract/domain';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(ProjectBasicActionType.setId);
    yield put(projectBasicAction.getBasic(id));
    yield put(projectBasicAction.getBusinessList(id));
    yield put(projectBasicAction.getDesign(id));
    yield put(projectBasicAction.getTest(id));
    yield put(projectBasicAction.getEstimate(id));
    yield put(projectBasicAction.getRivalEstimateList(id));
    yield put(projectBasicAction.getBid(id));
    yield put(projectBasicAction.getRivalBidList(id));
    yield put(projectBasicAction.getContract(id));
    yield put(projectBasicAction.getFailReason(id));
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
      const detail: ProjectComplexTestVO = yield call(projectBasicApi.getTest, id);
      yield put(projectBasicAction.setTest(detail));
    }
    else {
      yield put(projectBasicAction.setTest(undefined));
    }
  }
}

function* watchEstimate() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getEstimate);
    if (id) {
      const detail: ProjectEstimateVO = yield call(projectBasicApi.getEstimate, id);
      yield put(projectBasicAction.setEstimate(detail));
    }
    else {
      yield put(projectBasicAction.setEstimate(undefined));
    }
  }
}

function* watchRivalEstimateList() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getRivalEstimateList);
    if (id) {
      const list: RivalEstimateVO[] = yield call(projectBasicApi.getRivalEstimateList, id);
      yield put(projectBasicAction.setRivalEstimateList(list));
    }
    else {
      yield put(projectBasicAction.setRivalEstimateList(undefined));
    }
  }
}

function* watchBid() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getBid);
    if (id) {
      const detail: ProjectBidVO = yield call(projectBasicApi.getBid, id);
      yield put(projectBasicAction.setBid(detail));
    }
    else {
      yield put(projectBasicAction.setBid(undefined));
    }
  }
}

function* watchRivalBidList() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getRivalBidList);
    if (id) {
      const list: RivalBidVO [] = yield call(projectBasicApi.getRivalBidList, id);
      yield put(projectBasicAction.setRivalBidList(list));
    }
    else {
      yield put(projectBasicAction.setRivalBidList(undefined));
    }
  }
}

function* watchContract() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getContract);
    if (id) {
      const detail: ProjectContractVO = yield call(projectBasicApi.getContract, id);
      yield put(projectBasicAction.setContract(detail));
    }
    else {
      yield put(projectBasicAction.setContract(undefined));
    }
  }
}

function* watchFailReason() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getFailReason);
    if (id) {
      const detail: ProjectBasicFailReason = yield call(projectBasicApi.getFailReason, id);
      yield put(projectBasicAction.setFailReason(detail));
    }
    else {
      yield put(projectBasicAction.setFailReason(undefined));
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

function* watchUpdateFailReason() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateFailReason);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestUpdateFailReason(ApiStatus.REQUEST));
      yield call(projectBasicApi.updateFailReason, id, params);
      yield put(projectBasicAction.requestUpdateFailReason(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectBasicAction.requestUpdateFailReason(ApiStatus.FAIL));
    }
  }
}

export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(watchBasic);
  yield fork(watchBusinessList);
  yield fork(watchDesign);
  yield fork(watchTest);
  yield fork(watchEstimate);
  yield fork(watchRivalEstimateList);
  yield fork(watchBid);
  yield fork(watchRivalBidList);
  yield fork(watchContract);
  yield fork(watchFailReason);
  yield fork(watchAddBusiness);
  yield fork(watchChangeBusiness);
  yield fork(watchDeleteBusiness);
  yield fork(watchUpdateBasic);
  yield fork(watchUpdateDesign);
  yield fork(watchUpdateFailReason);
}
