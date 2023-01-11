import {call, fork, put, take} from 'redux-saga/effects';
import {projectDbAction} from 'project_db/action'
import {ProjectDbPreset, ProjectDbSchemaVO, ProjectDbVO} from "./domain";
import {projectDbApi} from "./api";

function* watchList() {
    while (true) {
        try{
            const {payload: searchState} = yield take(projectDbAction.requestList);
            yield  put(projectDbAction.setLoading(true));
            const list: ProjectDbVO[] = yield call(projectDbApi.getList, searchState);
            yield put(projectDbAction.setList(list));
        } finally {
            yield  put(projectDbAction.setLoading(false));
        }
    }
}

function* watchSchema() {
    while (true) {
        yield take(projectDbAction.requestSchema);
        const list: ProjectDbSchemaVO[] = yield call(projectDbApi.getSchema);
        yield put(projectDbAction.setSchema(list));
    }
}

function* watchPreset() {
    while (true) {
        yield take(projectDbAction.requestPresetList);
        const list: ProjectDbPreset[] = yield call(projectDbApi.getPresetList);
        yield put(projectDbAction.setPresetList(list));
    }
}

function* watchAddPreset() {
    while (true) {
        const {payload: preset} = yield take(projectDbAction.addPreset);
        yield call(projectDbApi.savePreset, preset);
        const list: ProjectDbPreset[] = yield call(projectDbApi.getPresetList);
        yield put(projectDbAction.setPresetList(list));
        const lastPreset = list[list.length - 1];
        yield put(projectDbAction.setActivePreset(lastPreset));
    }
}

function* watchRemovePreset() {
    while (true) {
        const {payload: id} = yield take(projectDbAction.removePreset);
        yield call(projectDbApi.removePreset, id);
        const list: ProjectDbPreset[] = yield call(projectDbApi.getPresetList);
        yield put(projectDbAction.setPresetList(list));
    }
}

export default function* projectDbSaga() {
    yield fork(watchList);
    yield fork(watchSchema);
    yield fork(watchPreset);
    yield fork(watchAddPreset);
    yield fork(watchRemovePreset);
}