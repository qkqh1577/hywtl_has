import { ActionType } from 'typesafe-actions';
import { projectActions, ProjectActionType } from 'services/project/actions';
import Page from 'components/Page';
import Project, {
  ListProject,
  ProjectBasic,
  ProjectOrder,
  ProjectTarget,
  ProjectTargetDocument,
  ProjectTargetReview
} from 'services/project/entity';
import projectApi from 'services/project/api';
import { put, takeLatest } from 'redux-saga/effects';

function* getPage(action: ActionType<typeof projectActions.getPage>) {
  const page: Page<ListProject> = yield projectApi.getPage(action.payload);
  yield put(projectActions.setPage(page));
}

function* getOne(action: ActionType<typeof projectActions.getOne>) {
  const data: Project = yield projectApi.getOne(action.payload);
  yield put(projectActions.setOne(data));
}

function* add(action: ActionType<typeof projectActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Project = yield projectApi.add(params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* getBasic(action: ActionType<typeof projectActions.getBasic>) {
  const data: ProjectBasic = yield projectApi.getBasic(action.payload);
  yield put(projectActions.setBasic(data));
}

function* updateBasic(action: ActionType<typeof projectActions.updateBasic>) {
  const { projectId, params, callback } = action.payload;
  try {
    const data: ProjectBasic = yield projectApi.updateBasic(projectId, params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* getOrder(action: ActionType<typeof projectActions.getOrder>) {
  const data: ProjectOrder = yield projectApi.getOrder(action.payload);
  yield put(projectActions.setOrder(data));
}

function* updateOrder(action: ActionType<typeof projectActions.updateOrder>) {
  const { projectId, params, callback } = action.payload;
  try {
    const data: ProjectOrder = yield projectApi.updateOrder(projectId, params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* getTarget(action: ActionType<typeof projectActions.getTarget>) {
  const data: ProjectTarget = yield projectApi.getTarget(action.payload);
  yield put(projectActions.setTarget(data));
}

function* updateTarget(action: ActionType<typeof projectActions.updateTarget>) {
  const { projectId, params, callback } = action.payload;
  try {
    const data: ProjectTarget = yield projectApi.updateTarget(projectId, params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* getTargetReviewList(action: ActionType<typeof projectActions.getTargetReviewList>) {
  const list: ProjectTargetReview[] = yield projectApi.getTargetReviewList(action.payload);
  yield put(projectActions.setTargetReviewList(list));
}

function* addTargetReview(action: ActionType<typeof projectActions.addTargetReview>) {
  const { projectId, params, callback } = action.payload;
  try {
    const list: ProjectTargetReview[] = yield projectApi.addTargetReview(projectId, params);
    callback(list);
  } catch (e) {
    callback();
  }
}

function* confirmTargetReview(action: ActionType<typeof projectActions.confirmTargetReview>) {
  const { id, callback } = action.payload;
  try {
    yield projectApi.confirmTargetReview(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* getTargetDocumentList(action: ActionType<typeof projectActions.getTargetDocumentList>) {
  const list: ProjectTargetDocument[] = yield projectApi.getTargetDocumentList(action.payload);
  yield put(projectActions.setTargetDocumentList(list));
}

function* addTargetDocument(action: ActionType<typeof projectActions.addTargetDocument>) {
  const { projectId, params, callback } = action.payload;
  try {
    const list: ProjectTargetDocument[] = yield projectApi.addTargetDocument(projectId, params);
    callback(list);
  } catch (e) {
    callback();
  }
}

function* updateTargetDocument(action: ActionType<typeof projectActions.updateTargetDocument>) {
  const { id, params, callback} = action.payload;
  try {
    yield projectApi.updateTargetDocument(id, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

export default function* projectSaga() {
  yield takeLatest(ProjectActionType.getPage, getPage);
  yield takeLatest(ProjectActionType.getOne, getOne);
  yield takeLatest(ProjectActionType.add, add);
  yield takeLatest(ProjectActionType.getBasic, getBasic);
  yield takeLatest(ProjectActionType.updateBasic, updateBasic);
  yield takeLatest(ProjectActionType.getOrder, getOrder);
  yield takeLatest(ProjectActionType.updateOrder, updateOrder);
  yield takeLatest(ProjectActionType.getTarget, getTarget);
  yield takeLatest(ProjectActionType.updateTarget, updateTarget);
  yield takeLatest(ProjectActionType.getTargetReviewList, getTargetReviewList);
  yield takeLatest(ProjectActionType.addTargetReview, addTargetReview);
  yield takeLatest(ProjectActionType.confirmTargetReview, confirmTargetReview);
  yield takeLatest(ProjectActionType.getTargetDocumentList, getTargetDocumentList);
  yield takeLatest(ProjectActionType.addTargetDocument, addTargetDocument);
  yield takeLatest(ProjectActionType.updateTargetDocument, updateTargetDocument);
}
