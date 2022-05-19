import { createReducer } from 'typesafe-actions';
import {
  ProjectTargetActionType,
  ProjectTargetDocument,
} from 'services/project_target';

export type ProjectTargetState = {
  documentId?: number | null;
  documentList?: ProjectTargetDocument[];
  documentDetail?: ProjectTargetDocument;
}

const initState: ProjectTargetState = {};
const projectTargetReducer = createReducer(initState, {
  [ProjectTargetActionType.setDocumentId]: (state, action) => ({
    ...state,
    documentId: action.payload,
  }),
  [ProjectTargetActionType.setDocumentList]: (state, action) => ({
    ...state,
    documentList: action.payload,
  }),
  [ProjectTargetActionType.setDocument]: (state, action) => ({
    ...state,
    documentDetail: action.payload,
  }),
});

export default projectTargetReducer;
