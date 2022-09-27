import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  projectBasicActionType,
  ProjectBasicActionType
} from 'project_basic/action';
import { ProjectId } from 'project/domain';
import {
  ProjectBasicBid,
  ProjectBasicBusiness,
  ProjectBasicContract,
  ProjectBasicEstimate,
  ProjectBasicTest,
  RivalBidId
} from 'project_basic/domain';
import { projectBasicApi } from 'project_basic/api';
import { dialogActions } from 'components/Dialog';
import { RootState } from 'services/reducer';
import { RivalEstimateId } from 'rival_estimate/domain';
import { TestType } from 'admin/estimate/content/domain';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(ProjectBasicActionType.setId);
    yield call(requestBusinessList, id);
    yield call(requestTest, id);
    yield call(requestEstimate, id);
    yield call(requestBid, id);
    yield call(requestContract, id);
  }
}

function* requestBusinessList(id: ProjectId) {
  const businessList: ProjectBasicBusiness[] = yield call(projectBasicApi.getBusinessList, id);
  yield put(projectBasicActionType.setBusinessList(businessList));
}

function* requestTest(id: ProjectId) {
  // const testDetail: ProjectComplexTestVO = yield call(projectComplexApi.getTestDetail, id);
  // yield put(projectBasicActionType.setTest(testDetail));

  yield put(projectBasicActionType.setTest(testData()));

  function testData(): ProjectBasicTest {
    return {
      siteCount: 10,
      targetTest: 'test-targetTest',
      testList: [
        {
          testType: TestType.A,
          buildingCount: 3,
          buildingNameList: ['A-1', 'A-2', 'A-3']
        },
        {
          testType: TestType.B,
          buildingCount: 2,
          buildingNameList: ['B-1', 'B-2']
        }
      ]
    };
  }
}

function* requestEstimate(id: ProjectId) {
  // TODO: API 사양과 해당 Domain 불일치로 보류
  // const estimateList: ProjectEstimateVO[] = yield call(projectEstimateApi.getList, id);
  // const rivalEstimateList: RivalEstimateVO[] = yield call(rivalEstimateApi.getList, id);
  //
  // yield put(projectBasicActionType.setEstimate({
  //   estimate:          estimateList.filter((e) => e.confirmed)[0],
  //   rivalEstimateList: rivalEstimateList
  // }));

  yield put(projectBasicActionType.setEstimate(testData()));

  function testData(): ProjectBasicEstimate {
    return {
      estimate: {
        code: 'test-code',
        confirmed: true,
        plan: {
          estimateDate: new Date('2022-09-26'),
          testAmount: 1000,
          reviewAmount: 2000,
          totalAmount: 3000,
          expectedDuration: 'esti-expectedDuration',
        }
      },
      rivalEstimateList: [
        {
          id: RivalEstimateId(1),
          business: {
            id: '',
            name: 'esti-expectedDuration-business1',
            registrationNumber: '',
            managerList: []
          },
          testAmount: 1001,
          reviewAmount: 2001,
          totalAmount: 3001,
          expectedDuration: 'esti-rival-expectedDuration1',
          modifiedAt: new Date(),
        },
        {
          id: RivalEstimateId(2),
          business: {
            id: '',
            name: 'esti-expectedDuration-business2',
            registrationNumber: '',
            managerList: []
          },
          testAmount: 1002,
          reviewAmount: 2002,
          totalAmount: 3002,
          expectedDuration: 'esti-rival-expectedDuration2',
          modifiedAt: new Date(),
        }
      ],
    };
  }
}

function* requestBid(id: ProjectId) {
  // const bid: ProjectBidVO = yield call(projectBidApi.get, id);
  // const rivalBidList: RivalBidVO[] = yield call(projectBasicApi.getRivalBidList, id);
  //
  // yield put(projectBasicActionType.setBid({
  //   bid,
  //   rivalBidList: rivalBidList
  // }));

  yield put(projectBasicActionType.setBid(testData()));

  function testData(): ProjectBasicBid {
    return {
      bid: {
        bidDate: new Date('2022-10-26'),
        testAmount: 4000,
        reviewAmount: 5000,
        totalAmount: 6000,
        expectedDuration: 'bid-expectedDuration',
      },
      rivalBidList: [
        {
          id:  RivalBidId(1),
          business: {
            id: '',
            name: 'bid-expectedDuration-business1',
            registrationNumber: '',
            managerList: [],
            managerCount: 0,
            projectCount: 0,
          },
          testAmount: 4001,
          reviewAmount: 5001,
          totalAmount: 6001,
          expectedDuration: 'bid-rival-expectedDuration1',
          modifiedAt: new Date(),
        },
        {
          id:  RivalBidId(2),
          business: {
            id: '',
            name: 'bid-expectedDuration-business2',
            registrationNumber: '',
            managerList: [],
            managerCount: 0,
            projectCount: 0,
          },
          testAmount: 4002,
          reviewAmount: 5002,
          totalAmount: 6002,
          expectedDuration: 'bid-rival-expectedDuration2',
          modifiedAt: new Date(),
        },
      ],
    }
  }
}

function* requestContract(id: ProjectId) {
  yield put(projectBasicActionType.setContract(testData()));

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
      yield  call(formik.setSubmitting, false);
    }
  }
}

export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(pushBusiness);
}
