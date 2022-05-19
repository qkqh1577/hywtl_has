import { createReducer } from 'typesafe-actions';
import {
  ListTestServiceTemplate,
  TestServiceTemplate,
  TestServiceTemplateActionType,
} from 'services/standard_data/test_service_template';

export type TestServiceTemplateState = {
  list: ListTestServiceTemplate[];
  detail?: TestServiceTemplate;
}

const initState: TestServiceTemplateState = {
  list: [],
};

const testServiceTemplateReducer = createReducer(initState, {
  [TestServiceTemplateActionType.setList]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [TestServiceTemplateActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  })
});

export default testServiceTemplateReducer;
