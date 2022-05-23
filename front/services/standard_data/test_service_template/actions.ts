import { createAction } from 'typesafe-actions';
import {
  ListTestServiceTemplate,
  TestServiceTemplate,
  TestServiceTemplateChangeSeqParameter,
  TestServiceTemplateParameter,
  TestServiceTemplateQuery,
} from 'services/standard_data/test_service_template';

export enum TestServiceTemplateActionType {
  getList = 'standard-data/test-service-template/getList',
  setList = 'standard-data/test-service-template/setList',
  getOne = 'standard-data/test-service-template/getOne',
  setOne = 'standard-data/test-service-template/setOne',
  add = 'standard-data/test-service-template/add',
  change = 'standard-data/test-service-template/change',
  changeSeq = 'standard-data/test-service-template/changeSeq',
  setSeqModal = 'standard-data/test-service-template/setSeqModal',
  getSeqList = 'standard-data/test-service-template/getSeqList',
  setSeqList = 'standard-data/test-service-template/setSeqList',
}

export const testServiceTemplateActions = {
  getList: createAction(TestServiceTemplateActionType.getList)<TestServiceTemplateQuery>(),
  setList: createAction(TestServiceTemplateActionType.setList)<ListTestServiceTemplate[]>(),
  getOne: createAction(TestServiceTemplateActionType.getOne)<number>(),
  setOne: createAction(TestServiceTemplateActionType.setOne)<TestServiceTemplate | undefined>(),
  add: createAction(TestServiceTemplateActionType.add)<{
    params: TestServiceTemplateParameter;
    callback: () => void;
  }>(),
  change: createAction(TestServiceTemplateActionType.change)<{
    id: number;
    params: TestServiceTemplateParameter;
    callback: () => void;
  }>(),
  changeSeq: createAction(TestServiceTemplateActionType.changeSeq)<{
    params: TestServiceTemplateChangeSeqParameter;
    callback: () => void;
  }>(),
  setSeqModal: createAction(TestServiceTemplateActionType.setSeqModal)<boolean>(),
  getSeqList: createAction(TestServiceTemplateActionType.getSeqList)(),
  setSeqList: createAction(TestServiceTemplateActionType.setSeqList)<ListTestServiceTemplate[]>(),
};
