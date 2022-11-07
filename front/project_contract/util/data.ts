import {
  ProjectContractCollectionStageParameter,
  ProjectContractConditionDescriptionToMap,
  ProjectContractConditionParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import { toAmountKor } from 'util/NumberUtil';

class ProjectContractData {

  setData = async (values: ProjectContractParameter
  ) => {
    values.conditionList = this.getMappedConditions(values.conditionList);
    return {
      serviceName:                 values.basic.serviceName,
      serviceDuration:             values.basic.serviceDuration,
      expectedTestDeadLine:        values.estimate.plan ? values.estimate.plan.expectedTestDeadline : '',
      expectedFinalReportDeadLine: values.estimate.plan ? values.estimate.plan.expectedFinalReportDeadline : '',
      stageNote:                   values.collection.stageNote,
      collections:                 this.getCollections(values.collection.stageList),
      stagePercent:                this.getSumPercent(values.collection.stageList),
      totalAmountKor:              toAmountKor(values.collection.totalAmount ?? 0),
      totalAmount:                 values.collection.totalAmount.toLocaleString() ?? 0,
      totalAmountNote:             values.collection.totalAmountNote,
      outcome:                     values.basic.outcome,
      description:                 values.basic.description,
      contractDate:                values.basic.contractDate,
      contractorAddress:           values.basic.contractorAddress ?? '',
      contractorCompanyName:       values.basic.contractorCompanyName ?? '',
      contractorCeoName:           values.basic.contractorCeoName ?? '',
      ordererAddress:              values.basic.ordererAddress ?? '',
      ordererCompanyName:          values.basic.ordererCompanyName ?? '',
      ordererCeoName:              values.basic.ordererCeoName ?? '',
      conditionList:               values.conditionList,
    };
  };

  getCollections(stageList: ProjectContractCollectionStageParameter[]) {
    return stageList.map((stage,
                          index
    ) => {
      return {
        name:   stage.name,
        rate:   stage.rate,
        amount: stage.amount.toLocaleString() ?? 0,
        note:   stage.note,
      };
    });
  }

  getMappedConditions(conditionList: ProjectContractConditionParameter[]): ProjectContractConditionParameter[] {
    return conditionList.map((condition) => {
      return {
        title:           condition.title,
        descriptionList: this.getMappedDescriptionList(condition.descriptionList as unknown as string[]),
      };
    });
  }

  getMappedDescriptionList(descriptionList: string[]): ProjectContractConditionDescriptionToMap[] {
    return descriptionList.map((description) => {
      return {
        description: description,
      };
    });
  }

  getSumPercent(stageList: ProjectContractCollectionStageParameter[]): number {
    return stageList.map((stage) => stage.rate)
                    .reduce((a,
                             b
                    ) => a + b, 0);
  }
}

export const projectContractData = new ProjectContractData();
