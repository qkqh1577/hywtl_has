import {
  all,
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
import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicContract,
  ProjectBasicDesign,
  ProjectBasicFailReason,
  RivalBidVO
} from 'project_basic/domain';
import { projectBasicApi } from 'project_basic/api';
import { dialogActions } from 'components/Dialog';
import { RootState } from 'services/reducer';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { projectComplexApi } from 'project_complex/api';
import { ProjectComplexTestVO } from 'project_complex/domain';
import { projectEstimateApi } from 'project_estimate/api';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { rivalEstimateApi } from 'rival_estimate/api';
import { projectBidApi } from 'project_bid/api';
import { ProjectBidVO } from 'project_bid/domain';
import {
  ProjectStatusActionType,
  ProjectStatusEventType
} from 'project_status/action';
import {
  ProjectEstimateExpectation,
  ProjectStatus
} from 'project_status/domain';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(ProjectBasicActionType.setId);
    yield all([
      call(requestBasic, id),
      call(requestBusinessList, id),
      call(requestDesign, id),
      call(requestTest, id),
      call(requestEstimate, id),
      call(requestBid, id),
      call(requestContract, id),
      call(requestFailReason, id),
    ]);
  }
}

function* requestBasic(id: ProjectId) {
  const basic: ProjectBasic = yield call(projectBasicApi.getOne, id);
  yield put(projectBasicAction.setBasic(basic));
}

function* requestBusinessList(id: ProjectId) {
  const businessList: ProjectBasicBusiness[] = yield call(projectBasicApi.getBusinessList, id);
  yield put(projectBasicAction.setBusinessList(businessList));
}

function* requestDesign(id: ProjectId) {
  const design: ProjectBasicDesign = yield call(projectBasicApi.getDesign, id);
  yield put(projectBasicAction.setDesign(design));
}

function* requestTest(id: ProjectId) {
  const testDetail: ProjectComplexTestVO = yield call(projectComplexApi.getTestDetail, id);
  yield put(projectBasicAction.setTest(testDetail));
}

function* requestEstimate(id: ProjectId) {
  const estimateList: ProjectEstimateVO[] = yield call(projectEstimateApi.getList, id);
  const rivalEstimateList: RivalEstimateVO[] = yield call(rivalEstimateApi.getList, id);

  yield put(projectBasicAction.setEstimate({
    estimate:          estimateList.filter((e) => e.confirmed)[0],
    rivalEstimateList: rivalEstimateList
  }));
}

function* requestBid(id: ProjectId) {
  const bid: ProjectBidVO = yield call(projectBidApi.get, id);
  const rivalBidList: RivalBidVO[] = yield call(projectBasicApi.getRivalBidList, id);

  yield put(projectBasicAction.setBid({
    bid,
    rivalBidList: rivalBidList
  }));
}

function* requestContract(id: ProjectId) {
  yield put(projectBasicAction.setContract(testData()));

  function testData(): ProjectBasicContract {
    return {
      orderer1:                           '발주처1',
      orderer2:                           '발주처2',
      orderer3:                           '발주처3',
      orderer4:                           '발주처4',
      testAmount:                         135000,
      reviewAmount:                       15000,
      totalAmount:                        150000,
      expectedDuration:                   '7주/9주',
      projectContractCollectionStageList: [
        {
          name:      '계약금',
          ratio:     30,
          condition: '계약체결 시'
        },
        {
          name:      '중도금',
          ratio:     50,
          condition: '구조설계용 풍하중 납품 (구조심의 접수시)'
        },
        {
          name:      '잔금',
          ratio:     20,
          condition: '최종보고서 납품 (구조심의 완료시)'
        },
      ]
    };
  }
}

function* requestFailReason(id: ProjectId) {
  const failReason: ProjectBasicFailReason = yield call(projectBasicApi.getFailReason, id);
  yield put(projectBasicAction.setFailReason(failReason));
}

function* pushBusiness() {
  while (true) {
    const { payload: formik } = yield take(ProjectBasicActionType.pushBusiness);
    try {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield call(projectBasicApi.pushBusiness, id, formik.values.params);
      yield put(dialogActions.openAlert('등록하였습니다.'));
      yield call(requestBusinessList, id);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '에러가 발생하였습니다.'
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchSetStatusInProjectStatusAction() {
  while (true) {
    const { payload: status } = (yield take(ProjectStatusActionType.setStatus)) as { payload: ProjectStatus };
    if (status.estimateExpectation === ProjectEstimateExpectation.LOSE) {
      yield put(projectBasicAction.setLossEstimateExpectation(true));
    }
    else {
      yield put(projectBasicAction.setLossEstimateExpectation(false));
    }
  }
}

function* watchFinishFailReasonAdd() {
  while (true) {
    const { payload: { success } } = yield take(ProjectStatusEventType.finishFailReasonAdd);
    if (success) {
      const { id } = yield select((root: RootState) => root.projectBasic);
      yield requestFailReason(id);
    }
  }
}

export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(pushBusiness);
  yield fork(watchSetStatusInProjectStatusAction);
  yield fork(watchFinishFailReasonAdd);
}
