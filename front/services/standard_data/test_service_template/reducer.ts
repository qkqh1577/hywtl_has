import { createReducer } from 'typesafe-actions';
import {
  ListTestServiceTemplate,
  TestServiceTemplate,
  TestServiceTemplateActionType,
} from 'services/standard_data/test_service_template';

export type TestServiceTemplateState = {
  list: ListTestServiceTemplate[];
  detail?: TestServiceTemplate;
  seqModal: boolean;
}

const initState: TestServiceTemplateState = {
  list: [],
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
});

export default testServiceTemplateReducer;
