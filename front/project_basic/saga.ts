import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectBasicAction } from 'project_basic/action';
import {
  CityListData,
  ProjectBasicBusiness,
  ProjectBasicDesignVO,
  ProjectBasicExternalContributorVO,
  ProjectBasicFailReasonVO,
  ProjectBasicInternalContributorVO,
} from 'project_basic/domain';
import { projectBasicApi } from 'project_basic/api';
import { RootState } from 'services/reducer';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { RivalBidVO } from 'rival_bid/domain';
import { ProjectContractVO } from 'project_contract/domain';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.setId);
    yield put(projectBasicAction.getInternalList(id));
    yield put(projectBasicAction.getExternalList(id));
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

function* watchInternalList() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getInternalList);
    if (id) {
      const list: ProjectBasicInternalContributorVO[] = yield call(projectBasicApi.getInternalList, id);
      yield put(projectBasicAction.setInternalList(list));
    }
    else {
      yield put(projectBasicAction.setInternalList(undefined));
    }
  }
}

function* watchExternalList() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.getExternalList);
    if (id) {
      const list: ProjectBasicExternalContributorVO[] = yield call(projectBasicApi.getExternalList, id);
      yield put(projectBasicAction.setExternalList(list));
    }
    else {
      yield put(projectBasicAction.setExternalList(undefined));
    }
  }
}

function* watchAddInternal() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.addInternal);
    try {
      yield put(projectBasicAction.requestAddInternal('request'));
      yield call(projectBasicApi.addInternal, id);
      yield put(projectBasicAction.requestAddInternal('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.addInternal, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestAddInternal(message));
    }
  }
}

function* watchAddExternal() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.addExternal);
    try {
      yield put(projectBasicAction.requestAddExternal('request'));
      yield call(projectBasicApi.addExternal, id);
      yield put(projectBasicAction.requestAddExternal('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.addExternal, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestAddExternal(message));
    }
  }
}

function* watchUpdateInternal() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateInternal);
    try {
      yield put(projectBasicAction.requestUpdateInternal('request'));
      yield call(projectBasicApi.updateInternal, params);
      yield put(projectBasicAction.requestUpdateInternal('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.updateInternal, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestUpdateInternal(message));
    }
  }
}

function* watchUpdateExternal() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateExternal);
    try {
      yield put(projectBasicAction.requestUpdateExternal('request'));
      yield call(projectBasicApi.updateExternal, params);
      yield put(projectBasicAction.requestUpdateExternal('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.updateExternal, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestUpdateExternal(message));
    }
  }
}

function* watchDeleteInternal() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.deleteInternal);
    try {
      yield put(projectBasicAction.requestDeleteInternal('request'));
      yield call(projectBasicApi.deleteInternal, id);
      yield put(projectBasicAction.requestDeleteInternal('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.deleteInternal, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestDeleteInternal(message));
    }
  }
}

function* watchDeleteExternal() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.deleteExternal);
    try {
      yield put(projectBasicAction.requestDeleteExternal('request'));
      yield call(projectBasicApi.deleteExternal, id);
      yield put(projectBasicAction.requestDeleteExternal('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.deleteExternal, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestDeleteExternal(message));
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
      const detail: ProjectBasicDesignVO = yield call(projectBasicApi.getDesign, id);
      yield put(projectBasicAction.setDesign(detail));
      yield put(projectBasicAction.getCity1List());
      if (detail.city1) {
        yield put(projectBasicAction.getCity2List(detail.city1));
      }
    }
    else {
      yield put(projectBasicAction.setDesign(undefined));
      yield put(projectBasicAction.getCity1List());
      yield put(projectBasicAction.getCity2List(undefined));
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
      const detail: ProjectBasicFailReasonVO = yield call(projectBasicApi.getFailReason, id);
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
      yield put(projectBasicAction.requestAddBusiness('request'));
      yield call(projectBasicApi.addBusiness, id, params);
      yield put(projectBasicAction.requestAddBusiness('done'));
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.addBusiness, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestAddBusiness(message));
    }
  }
}

function* watchChangeBusiness() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.changeBusiness);
    try {
      yield put(projectBasicAction.requestChangeBusiness('request'));
      yield call(projectBasicApi.changeBusiness, params);
      yield put(projectBasicAction.requestChangeBusiness('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.changeBusiness, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestChangeBusiness(message));
    }
  }
}

function* watchDeleteBusiness() {
  while (true) {
    const { payload: id } = yield take(projectBasicAction.deleteBusiness);
    try {
      yield put(projectBasicAction.requestDeleteBusiness('request'));
      yield call(projectBasicApi.deleteBusiness, id);
      yield put(projectBasicAction.requestDeleteBusiness('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.deleteBusiness, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestDeleteBusiness(message));
    }
  }
}

function* watchUpdateBasic() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateBasic);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestUpdateBasic('request'));
      yield call(projectBasicApi.updateBasic, id, params);
      yield put(projectBasicAction.requestUpdateBasic('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.updateBasic, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestUpdateBasic(message));
    }
  }
}

function* watchUpdateDesign() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateDesign);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestUpdateDesign('request'));
      yield call(projectBasicApi.updateDesign, id, params);
      yield put(projectBasicAction.requestUpdateDesign('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.updateDesign, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestUpdateDesign(message));
    }
  }
}

function* watchUpdateFailReason() {
  while (true) {
    const { payload: params } = yield take(projectBasicAction.updateFailReason);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield put(projectBasicAction.requestUpdateFailReason('request'));
      yield call(projectBasicApi.updateFailReason, id, params);
      yield put(projectBasicAction.requestUpdateFailReason('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectBasicAction.updateFailReason, e);
      yield put(dialogAction.openError(message));
      yield put(projectBasicAction.requestUpdateFailReason(message));
    }
  }
}


function* watchCity1List() {
  while (true) {
    try {
      yield take(projectBasicAction.getCity1List);
      const data: CityListData = yield call(projectBasicApi.getCityData);
      yield put(projectBasicAction.setCity1List(data.regcodes));
    }
    catch (e) {
      yield put(dialogAction.openError('시/도1 목록을 불러오는데 실패하였습니다.'));
    }
  }
}

function* watchCity2List() {
  while (true) {
    const { payload: regCode } = yield take(projectBasicAction.getCity2List);
    try {
      if (regCode) {
        const data: CityListData = yield call(projectBasicApi.getCityData, regCode);
        yield put(projectBasicAction.setCity2List(data.regcodes));
      }
    }
    catch (e) {
      yield put(dialogAction.openError('시/도2 목록을 불러오는데 실패하였습니다.'));
    }
  }
}


export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(watchInternalList);
  yield fork(watchAddInternal);
  yield fork(watchUpdateInternal);
  yield fork(watchDeleteInternal);
  yield fork(watchExternalList);
  yield fork(watchAddExternal);
  yield fork(watchUpdateExternal);
  yield fork(watchDeleteExternal);
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
  yield fork(watchCity1List);
  yield fork(watchCity2List);
}
