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
  ProjectBasicActionType,
  projectBasicEvent
} from 'project_basic/action';
import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
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
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';
import { businessApi } from 'business/api';
import {
  BusinessId,
  BusinessInvolvedType,
  BusinessManagerId,
  BusinessShort
} from 'business/domain';
import {
  BusinessAddModal,
  BusinessDetailModal,
  BusinessUpdateModal,
  ProjectBasicState
} from 'project_basic/reducer';

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

function* handleEventBusiness() {
  yield fork(handleEventBusinessList);
  yield fork(handleEventBusinessAddModal);
  yield fork(handleEventBusinessDetailModal);
  yield fork(handleEventBusinessUpdateModal);
}

function* handleEventBusinessList() {
  yield fork(handleAddClick);
  yield fork(handleTupleClick);

  function* handleAddClick() {
    while (true) {
      yield take(projectBasicEvent.business.list.addClick);

      const businessList = (yield call(businessApi.getListAll, {})) as BusinessShort[];

      yield put(projectBasicAction.setBusinessAddModal(
        {
          open:   true,
          isSubmitting: false,
          values: {
            businessList:        businessList,
            businessManagerList: [],
          }
        }
      ));
    }
  }

  function* handleTupleClick() {
    while (true) {
      const { payload: id } = (yield take(projectBasicEvent.business.list.tupleClick)) as { payload: ProjectBasicBusinessId };

      const { business, businessManager, involvedType } = (yield call(projectBasicApi.getBusiness, id)) as ProjectBasicBusiness;

      yield put(projectBasicAction.setBusinessDetailModal({
        open:         true,
        isSubmitting: false,
        id,
        values:       { business, businessManager, involvedType }
      }));
    }
  }
}

function* handleEventBusinessAddModal() {
  yield fork(handleRequestFilterBusinessList);
  yield fork(handleRequestFilterBusinessManagerList);
  yield fork(handleSelectInvolvedType);
  yield fork(handleSelectBusiness);
  yield fork(handleSelectBusinessManager);
  yield fork(handleConfirmClick);

  function* handleRequestFilterBusinessList() {
    while (true) {
      const { payload: condition } = (yield take(projectBasicEvent.business.addModal.requestFilterBusinessList)) as { payload: { keywordType: string, keyword: string } };

      const businessAddModal = (yield select((root: RootState) => root.projectBasic.businessAddModal)) as BusinessAddModal;
      const { selected } = businessAddModal;

      const businessList = (yield call(businessApi.getListAll, {
        keywordType: condition.keywordType,
        keyword:     condition.keyword,
      })) as BusinessShort[];

      yield put(projectBasicAction.setBusinessAddModal(
        {
          ...businessAddModal,
          selected: {
            involvedType: selected?.involvedType
          },
          values:   {
            businessList:            businessList,
            businessFilterCondition: condition,
            businessManagerList:     [],
          }
        }
      ));
    }
  }

  function* handleRequestFilterBusinessManagerList() {
    while (true) {
      const { payload: condition } = (yield take(projectBasicEvent.business.addModal.requestFilterBusinessManagerList)) as { payload: { keywordType: string, keyword: string } };

      const businessAddModal = (yield select((root: RootState) => root.projectBasic.businessAddModal)) as BusinessAddModal;
      const { selected, values } = businessAddModal;
      if (!values) {
        continue;
      }

      yield put(projectBasicAction.setBusinessAddModal({
        ...businessAddModal,
        selected: {
          involvedType: selected?.involvedType,
          businessId:   selected?.businessId
        },
        values:   {
          ...values,
          businessManagerList:            (() => {
            if (!condition || !condition.keywordType || !condition.keyword) {
              return values.businessManagerList;
            }
            return values.businessManagerList.filter(bm => {
              switch (condition.keywordType) {
                case 'by_name':
                  return bm.name.includes(condition.keyword);
                case 'by_department':
                  if (!bm.department) {
                    return false;
                  }
                  return bm.department.includes(condition.keyword);
                default:
                  return false;
              }
            });
          })(),
          businessManagerFilterCondition: condition,
        }
      }));
    }
  }

  function* handleSelectInvolvedType() {
    while (true) {
      const { payload: involvedType } = (yield take(projectBasicEvent.business.addModal.selectInvolvedType)) as { payload: BusinessInvolvedType };

      const businessAddModal = (yield select((root: RootState) => root.projectBasic.businessAddModal)) as BusinessAddModal;
      const { selected } = businessAddModal;

      yield put(projectBasicAction.setBusinessAddModal({
        ...businessAddModal,
        selected: {
          ...selected!,
          involvedType
        },
      }));
    }
  }

  function* handleSelectBusiness() {
    while (true) {
      const { payload: businessId } = (yield take(projectBasicEvent.business.addModal.selectBusiness)) as { payload: BusinessId };

      const businessAddModal = (yield select((root: RootState) => root.projectBasic.businessAddModal)) as BusinessAddModal;
      const { selected, values } = businessAddModal;
      if (!values) {
        continue;
      }

      yield put(projectBasicAction.setBusinessAddModal({
        ...businessAddModal,
        selected: {
          ...selected,
          businessId,
          businessManagerId: undefined
        },
        values:   {
          ...values,
          businessManagerList:            values.businessList.filter(b => b.id === businessId)[0].managerList || [],
          businessManagerFilterCondition: { keywordType: '', keyword: '' },
        }
      }));
    }
  }

  function* handleSelectBusinessManager() {
    while (true) {
      const { payload: businessManagerId } = (yield take(projectBasicEvent.business.addModal.selectBusinessManager)) as { payload: BusinessManagerId };

      const businessAddModal = (yield select((root: RootState) => root.projectBasic.businessAddModal)) as BusinessAddModal;
      const { selected } = businessAddModal;

      yield put(projectBasicAction.setBusinessAddModal({
        ...businessAddModal,
        selected: {
          ...selected!,
          businessManagerId
        },
      }));
    }
  }

  function* handleConfirmClick() {
    while (true) {
      const { payload: params } = (yield take(projectBasicEvent.business.addModal.confirmClick)) as { payload: ProjectBasicBusinessParameter };

      const businessAddModal = (yield select((root: RootState) => root.projectBasic.businessAddModal)) as BusinessAddModal;

      yield put(projectBasicAction.setBusinessAddModal({
        ...businessAddModal,
        isSubmitting: true,
      }));

      const { id } = yield select((root: RootState) => root.projectBasic);
      try {
        yield call(projectBasicApi.pushBusiness, id, params);
        yield put(dialogActions.openAlert('등록하였습니다.'));
      }
      catch (e) {
        console.error(e);
        yield put(dialogActions.openAlert({
          status:   'error',
          children: '에러가 발생하였습니다.'
        }));
      }
      finally {
        yield put(projectBasicAction.setBusinessAddModal({
          open:         false,
          isSubmitting: false,
        }));
        yield call(requestBusinessList, id);
      }
    }
  }
}

function* handleEventBusinessDetailModal() {
  yield fork(handleDeleteClick);
  yield fork(handleUpdateClick);

  function* handleDeleteClick() {
    while (true) {
      yield take(projectBasicEvent.business.detailModal.deleteClick);

      const businessDetailModal = (yield select((root: RootState) => root.projectBasic.businessDetailModal)) as BusinessDetailModal;
      const { id: projectBasicBusinessId } = businessDetailModal;

      yield put(projectBasicAction.setBusinessDetailModal({
        ...businessDetailModal,
        isSubmitting: true,
      }));

      try {
        yield call(projectBasicApi.deleteBusiness, projectBasicBusinessId!);
        yield put(dialogActions.openAlert('삭제하였습니다.'));
      }
      catch (e) {
        console.error(e);
        yield put(dialogActions.openAlert({
          status:   'error',
          children: '에러가 발생하였습니다.'
        }));
      }
      finally {
        yield put(projectBasicAction.setBusinessDetailModal({
          ...businessDetailModal,
          open:         false,
          isSubmitting: false,
        }));
        const { id } = (yield select((root: RootState) => root.projectBasic)) as ProjectBasicState;
        yield call(requestBusinessList, id!);
      }
    }
  }

  function* handleUpdateClick() {
    while (true) {
      yield take(projectBasicEvent.business.detailModal.updateClick);
      const { id, values } = (yield select((root: RootState) => root.projectBasic.businessDetailModal)) as BusinessDetailModal;
      const businessList = (yield call(businessApi.getListAll, {})) as BusinessShort[];
      yield put(projectBasicAction.setBusinessUpdateModal({
        open: true,
        isSubmitting: false,
        id,
        selected: {
          involvedType: values?.involvedType,
          businessId: values?.business.id,
          businessManagerId: values?.businessManager.id,
        },
        values: {
          businessList: businessList,
          businessManagerList: businessList.filter(b => b.id === values?.business.id)[0].managerList || [],
        }
      }));
    }
  }
}

function* handleEventBusinessUpdateModal() {
  yield fork(handleRequestFilterBusinessList);
  yield fork(handleRequestFilterBusinessManagerList);
  yield fork(handleSelectInvolvedType);
  yield fork(handleSelectBusiness);
  yield fork(handleSelectBusinessManager);
  yield fork(handleConfirmClick);

  function* handleRequestFilterBusinessList() {
    while (true) {
      const { payload: condition } = (yield take(projectBasicEvent.business.updateModal.requestFilterBusinessList)) as { payload: { keywordType: string, keyword: string } };

      const businessUpdateModal = (yield select((root: RootState) => root.projectBasic.businessUpdateModal)) as BusinessUpdateModal;
      const { selected } = businessUpdateModal;

      const businessList = (yield call(businessApi.getListAll, {
        keywordType: condition.keywordType,
        keyword:     condition.keyword,
      })) as BusinessShort[];

      yield put(projectBasicAction.setBusinessUpdateModal(
        {
          ...businessUpdateModal,
          selected: {
            involvedType: selected?.involvedType
          },
          values:   {
            businessList:            businessList,
            businessFilterCondition: condition,
            businessManagerList:     [],
          }
        }
      ));
    }
  }

  function* handleRequestFilterBusinessManagerList() {
    while (true) {
      const { payload: condition } = (yield take(projectBasicEvent.business.updateModal.requestFilterBusinessManagerList)) as { payload: { keywordType: string, keyword: string } };

      const businessUpdateModal = (yield select((root: RootState) => root.projectBasic.businessUpdateModal)) as BusinessUpdateModal;
      const { selected, values } = businessUpdateModal;
      if (!values) {
        continue;
      }

      yield put(projectBasicAction.setBusinessUpdateModal({
        ...businessUpdateModal,
        selected: {
          involvedType: selected?.involvedType,
          businessId:   selected?.businessId
        },
        values:   {
          ...values,
          businessManagerList:            (() => {
            if (!condition || !condition.keywordType || !condition.keyword) {
              return values.businessManagerList;
            }
            return values.businessManagerList.filter(bm => {
              switch (condition.keywordType) {
                case 'by_name':
                  return bm.name.includes(condition.keyword);
                case 'by_department':
                  if (!bm.department) {
                    return false;
                  }
                  return bm.department.includes(condition.keyword);
                default:
                  return false;
              }
            });
          })(),
          businessManagerFilterCondition: condition,
        }
      }));
    }
  }

  function* handleSelectInvolvedType() {
    while (true) {
      const { payload: involvedType } = (yield take(projectBasicEvent.business.updateModal.selectInvolvedType)) as { payload: BusinessInvolvedType };

      const businessUpdateModal = (yield select((root: RootState) => root.projectBasic.businessUpdateModal)) as BusinessUpdateModal;
      const { selected } = businessUpdateModal;

      yield put(projectBasicAction.setBusinessUpdateModal({
        ...businessUpdateModal,
        selected: {
          ...selected!,
          involvedType
        },
      }));
    }
  }

  function* handleSelectBusiness() {
    while (true) {
      const { payload: businessId } = (yield take(projectBasicEvent.business.updateModal.selectBusiness)) as { payload: BusinessId };

      const businessUpdateModal = (yield select((root: RootState) => root.projectBasic.businessUpdateModal)) as BusinessUpdateModal;
      const { selected, values } = businessUpdateModal;
      if (!values) {
        continue;
      }

      yield put(projectBasicAction.setBusinessUpdateModal({
        ...businessUpdateModal,
        selected: {
          ...selected,
          businessId,
          businessManagerId: undefined
        },
        values:   {
          ...values,
          businessManagerList:            values.businessList.filter(b => b.id === businessId)[0].managerList || [],
          businessManagerFilterCondition: { keywordType: '', keyword: '' },
        }
      }));
    }
  }

  function* handleSelectBusinessManager() {
    while (true) {
      const { payload: businessManagerId } = (yield take(projectBasicEvent.business.updateModal.selectBusinessManager)) as { payload: BusinessManagerId };

      const businessUpdateModal = (yield select((root: RootState) => root.projectBasic.businessUpdateModal)) as BusinessUpdateModal;
      const { selected } = businessUpdateModal;

      yield put(projectBasicAction.setBusinessUpdateModal({
        ...businessUpdateModal,
        selected: {
          ...selected!,
          businessManagerId
        },
      }));
    }
  }

  function* handleConfirmClick() {
    while (true) {
      const { payload: params } = (yield take(projectBasicEvent.business.updateModal.confirmClick)) as { payload: ProjectBasicBusinessParameter };

      const businessUpdateModal = (yield select((root: RootState) => root.projectBasic.businessUpdateModal)) as BusinessUpdateModal;
      const { id: projectBasicBusinessId } = businessUpdateModal;

      yield put(projectBasicAction.setBusinessUpdateModal({
        ...businessUpdateModal,
        isSubmitting: true,
      }));

      const { id } = yield select((root: RootState) => root.projectBasic);
      try {
        yield call(projectBasicApi.deleteBusiness, projectBasicBusinessId!);
        yield call(projectBasicApi.pushBusiness, id, params);
        yield put(dialogActions.openAlert('수정하였습니다.'));
      }
      catch (e) {
        console.error(e);
        yield put(dialogActions.openAlert({
          status:   'error',
          children: '에러가 발생하였습니다.'
        }));
      }
      finally {
        yield put(projectBasicAction.setBusinessUpdateModal({
          open:         false,
          isSubmitting: false,
        }));
        yield put(projectBasicAction.setBusinessDetailModal({
          open:         false,
          isSubmitting: false,
        }));
        yield call(requestBusinessList, id);
      }
    }
  }
}

export default function* projectBasicSaga() {
  yield fork(watchId);
  yield fork(handleEventBusiness);
  yield fork(watchSetStatusInProjectStatusAction);
  yield fork(watchFinishFailReasonAdd);
}
