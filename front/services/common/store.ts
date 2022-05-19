import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { departmentSaga } from 'services/department';
import { userSaga } from 'services/user';
import { userInvitationSaga } from 'services/user/invitation';
import { passwordResetSaga } from 'services/user/password_reset';
import { personnelSaga } from 'services/personnel';
import { projectSaga } from 'services/project';
import { projectReviewSaga } from 'services/project_review';
import { projectTargetSaga } from 'services/project_target';
import { projectEstimateSaga } from 'services/project_estimate';
import { projectCommentSaga } from 'services/project_comment';
import { testServiceTemplateSaga } from 'services/standard_data/test_service_template';
import { companySaga } from 'services/company';
import reducer from 'services/common/reducer';

const middleware = createSagaMiddleware();

function* saga() {
  yield all([
    departmentSaga(),
    userSaga(),
    userInvitationSaga(),
    personnelSaga(),
    projectSaga(),
    projectReviewSaga(),
    projectTargetSaga(),
    projectEstimateSaga(),
    projectCommentSaga(),
    testServiceTemplateSaga(),
    passwordResetSaga(),
    companySaga(),
  ]);
}

const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(saga);

export default store;
