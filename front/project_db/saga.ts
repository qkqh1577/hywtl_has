import {call, fork, put, take} from 'redux-saga/effects';
import {projectDbAction} from 'project_db/action'
import {ProjectDbVO} from "./domain";
import {projectDbApi} from "./api";

function* watchList() {
    while (true) {
        yield take(projectDbAction.requestList);
        const list: ProjectDbVO[] = yield call(projectDbApi.getList);
        yield put(projectDbAction.setList(list));
    }
}

export default function* projectDbSaga() {
    yield fork(watchList);
}