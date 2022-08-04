import { createReducer } from 'typesafe-actions';
import {
  initQuery,
  TestServiceTemplate,
  TestServiceTemplateActionType,
  TestServiceTemplateQuery,
  TestServiceTemplateShort,
} from 'services/standard_data/test_service_template';

export type TestServiceTemplateState = {
  filter: TestServiceTemplateQuery;
  list: TestServiceTemplateShort[];
  seqList: TestServiceTemplateShort[];
  detail?: TestServiceTemplate;
  seqModal: boolean;
}

const initState: TestServiceTemplateState = {
  filter: initQuery,
  list: [],
  seqList: [],
  seqModal: false,
};

const testServiceTemplateReducer = createReducer(initState, {
  [TestServiceTemplateActionType.setFilter]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
  [TestServiceTemplateActionType.setList]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [TestServiceTemplateActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
  [TestServiceTemplateActionType.setSeqModal]: (state, action) => ({
    ...state,
    seqModal: action.payload,
  }),
  [TestServiceTemplateActionType.setSeqList]: (state, action) => ({
    ...state,
    seqList: action.payload,
  }),
});

export default testServiceTemplateReducer;
