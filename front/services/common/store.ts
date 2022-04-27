import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import departmentSaga from 'services/department/saga';
import userSaga from 'services/user/saga';
import userInvitationSaga from 'services/user/invitation/saga';
import personnelSaga from 'services/personnel/saga';
import projectSaga from 'services/project/saga';
import projectCommentSaga from 'services/project_comment/saga';
import reducer from 'services/common/reducer';

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    departmentSaga(),
    userSaga(),
    userInvitationSaga(),
    personnelSaga(),
    projectSaga(),
    projectCommentSaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;