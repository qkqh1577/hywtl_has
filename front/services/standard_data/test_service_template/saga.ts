import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  ListTestServiceTemplate,
  TestServiceTemplateActionType,
  testServiceTemplateActions,
  testServiceTemplateApi, TestServiceTemplate,
} from 'services/standard_data/test_service_template';

function* getList(action: ActionType<typeof testServiceTemplateActions.getList>) {
  const list: ListTestServiceTemplate[] = yield testServiceTemplateApi.getList(action.payload);
  yield put(testServiceTemplateActions.setList(list));
}

function* getOne(action: ActionType<typeof testServiceTemplateActions.getOne>) {
  const detail: TestServiceTemplate = yield testServiceTemplateApi.getOne(action.payload);
  yield put(testServiceTemplateActions.setOne(detail));
}

function* add(action: ActionType<typeof testServiceTemplateActions.add>) {
  const { params, callback } = action.payload;
  try {
    yield testServiceTemplateApi.add(params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* change(action: ActionType<typeof testServiceTemplateActions.change>) {
  const { id, params, callback } = action.payload;
  try {
    yield testServiceTemplateApi.change(id, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* changeSeq(action: ActionType<typeof testServiceTemplateActions.changeSeq>) {
  const { params, callback } = action.payload;
  try {
    yield testServiceTemplateApi.changeSeq(params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* getSeqList() {
  const list: ListTestServiceTemplate[] = yield testServiceTemplateApi.getSeqList();
  yield put(testServiceTemplateActions.setSeqList(list));
}

export default function* testServiceTemplateSaga() {
  yield takeLatest(TestServiceTemplateActionType.getList, getList);
  yield takeLatest(TestServiceTemplateActionType.getOne, getOne);
  yield takeLatest(TestServiceTemplateActionType.add, add);
  yield takeLatest(TestServiceTemplateActionType.change, change);
  yield takeLatest(TestServiceTemplateActionType.changeSeq, changeSeq);
  yield takeLatest(TestServiceTemplateActionType.getSeqList, getSeqList);
}