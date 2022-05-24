import { createReducer } from 'typesafe-actions';
import {
  ListTestServiceTemplate,
  TestServiceTemplate,
  TestServiceTemplateActionType,
} from 'services/standard_data/test_service_template';

export type TestServiceTemplateState = {
  list: ListTestServiceTemplate[];
  seqList: ListTestServiceTemplate[];
  detail?: TestServiceTemplate;
  seqModal: boolean;
}

const initState: TestServiceTemplateState = {
  list: [],
  seqList: [],
  seqModal: false,
};

const testServiceTemplateReducer = createReducer(initState, {
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
