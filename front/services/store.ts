import {
  applyMiddleware,
  createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import reducer from 'services/reducer';
import businessSaga from 'business/saga';
import contractBasicSage from 'admin/contract/basic/saga';
import contractCollectionSaga from 'admin/contract/collection/saga';
import contractConditionSaga from 'admin/contract/condition/saga';
import departmentSaga from 'department/saga';
import estimateContentSaga from 'admin/estimate/content/saga';
import estimateTemplateSaga from 'admin/estimate/template/saga';
import loginSaga from 'login/saga';
import menuSaga from 'menu/saga';
import personnelSaga from 'personnel/saga';
import projectBasicSaga from 'project_basic/saga';
import projectBidSaga from 'project_bid/saga';
import projectCollectionSaga from 'project_collection/saga';
import projectComplexSaga from 'project_complex/saga';
import projectContractSaga from 'project_contract/saga';
import projectDocumentSaga from 'project_document/saga';
import projectEstimateSaga from 'project_estimate/saga';
import projectLogSaga from 'project_log/saga';
import projectMemoSaga from 'project_memo/saga';
import projectSaga from 'project/saga';
import projectScheduleSaga from 'project_schedule/saga';
import rivalBidSaga from 'rival_bid/saga';
import rivalEstimateSaga from 'rival_estimate/saga';
import userNotificationSaga from 'user_notification/saga';
import userSaga from 'user/saga';
import { businessSelectorSaga } from 'components/BusinessSelector';
import projectDbSaga from 'project_db/saga';
import addressModalSaga from 'components/AddressModal/saga';

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    businessSaga(),
    businessSelectorSaga(),
    contractBasicSage(),
    contractCollectionSaga(),
    contractConditionSaga(),
    departmentSaga(),
    estimateContentSaga(),
    estimateTemplateSaga(),
    loginSaga(),
    menuSaga(),
    personnelSaga(),
    projectBasicSaga(),
    projectBidSaga(),
    projectCollectionSaga(),
    projectComplexSaga(),
    projectContractSaga(),
    projectDocumentSaga(),
    projectEstimateSaga(),
    projectLogSaga(),
    projectMemoSaga(),
    projectSaga(),
    projectScheduleSaga(),
    rivalBidSaga(),
    rivalEstimateSaga(),
    userNotificationSaga(),
    userSaga(),
    projectDbSaga(),
    addressModalSaga()
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
