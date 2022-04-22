import { ActionType } from 'typesafe-actions';
import { personnelActions, PersonnelActionType } from 'services/personnel/actions';
import personnelApi from 'services/personnel/api';
import Personnel, { ListPersonnel } from 'services/personnel/entity';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'components/Page';

function* getPage(action: ActionType<typeof personnelActions.getPage>) {
  const page: Page<ListPersonnel> = yield personnelApi.getPage(action.payload);
  yield put(personnelActions.setPage(page));
}

function* getOne(action: ActionType<typeof personnelActions.getOne>) {
  try {
    const detail: Personnel = yield personnelApi.getOne(action.payload);
    yield put(personnelActions.setOne(detail));
  } catch (e) {
    // nothing to do
  }
}

function* update(action: ActionType<typeof personnelActions.update>) {
  const { params, callback } = action.payload;
  try {
    const data: Personnel = yield personnelApi.update(params);
    yield put(personnelActions.setOne(data));
    callback(data);
  } catch (e) {
    console.log(e);
    callback();
  }
}

export default function* saga() {
  yield takeLatest(PersonnelActionType.getPage, getPage);
  yield takeLatest(PersonnelActionType.getOne, getOne);
  yield takeLatest(PersonnelActionType.update, update);
}
