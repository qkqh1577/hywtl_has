import {
  applyMiddleware,
  createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import reducer from 'services/reducer';
import userSaga from 'user/saga';
import loginUserSaga from 'app/repository/saga';
import departmentSaga from 'department/saga';
import estimateTemplateSaga from 'admin/estimate/template/saga';
import projectSaga from 'project/saga';
import estimateContentSaga from 'admin/estimate/content/saga';
import businessSaga from 'business/saga';
import projectMemoSaga from 'project_memo/saga';
import projectBasicSaga from 'project_basic/saga';
import projectDocumentSaga from 'project_document/saga';
import projectComplexSaga from 'project_complex/saga';
import projectEstimateSaga from 'project_estimate/saga';
import { businessSelectorSaga } from 'components/BusinessSelector';
import contractBasicSage from 'admin/contract/basic/saga';
import contractCollectionSaga from 'admin/contract/collection/saga';
import contractConditionSaga from 'admin/contract/condition/saga';
import projectLogSaga from 'project_log/saga';
import rivalEstimateSaga from 'rival_estimate/saga';
import projectBidSaga from 'project_bid/saga';
import projectScheduleSaga from 'project_schedule/saga';
import personnelSaga from 'personnel/saga';
import userNotificationSaga from 'user_notification/saga';
import projectContractSaga from 'project_contract/saga';
import projectStatusSaga from 'project_status/saga';

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    userSaga(),
    loginUserSaga(),
    departmentSaga(),
    estimateTemplateSaga(),
    projectSaga(),
    businessSaga(),
    estimateContentSaga(),
    projectMemoSaga(),
    projectDocumentSaga(),
    projectBasicSaga(),
    projectComplexSaga(),
    projectEstimateSaga(),
    businessSelectorSaga(),
    contractBasicSage(),
    contractCollectionSaga(),
    contractConditionSaga(),
    projectLogSaga(),
    rivalEstimateSaga(),
    projectBidSaga(),
    projectScheduleSaga(),
    personnelSaga(),
    projectScheduleSaga(),
    userNotificationSaga(),
    projectContractSaga(),
    projectStatusSaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
