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

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    userSaga(),
    loginUserSaga(),
    departmentSaga(),
    estimateTemplateSaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
