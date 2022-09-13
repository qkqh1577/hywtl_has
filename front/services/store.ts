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
import estimateTemplateSaga from 'estimate_template/saga';
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
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
