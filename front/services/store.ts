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
import businessSaga from "../business/saga";
import projectMemoSaga from 'project_memo/saga';
import documentSaga from 'project/document/saga';

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
    documentSaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
