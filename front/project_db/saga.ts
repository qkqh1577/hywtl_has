import {call, fork, put, take} from 'redux-saga/effects';
import {projectDbAction} from 'project_db/action'
import {ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {projectDbApi} from "./api";

function* watchList() {
    while (true) {
        yield take(projectDbAction.requestList);
        const list: ProjectDbVO[] = yield call(projectDbApi.getList);
        yield put(projectDbAction.setList(list));
    }
}

function* watchSchema() {
    while (true) {
        yield take(projectDbAction.requestSchema);
        const list: ProjectDbSchemaVO[] = yield call(projectDbApi.getSchema);
        yield put(projectDbAction.setSchema(list));
    }
}

export default function* projectDbSaga() {
    yield fork(watchList);
    yield fork(watchSchema);
}