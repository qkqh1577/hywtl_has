import {
  applyMiddleware,
  createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import reducer from 'services/common/reducer';
import userSaga from 'user/repository/saga';
import loginUserSaga from 'App/repository/saga';
import departmentSaga from 'department/repository/saga';

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    userSaga(),
    loginUserSaga(),
    departmentSaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
