import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import departmentSaga from 'department/saga';
import reducer from 'common/reducer';

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    departmentSaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;