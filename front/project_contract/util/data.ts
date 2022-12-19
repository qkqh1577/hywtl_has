import {
  ProjectContractCollectionStageParameter,
  ProjectContractConditionDescriptionToMap,
  ProjectContractConditionParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import { toAmountKor } from 'util/NumberUtil';
import { ContractConditionVariableVO, } from 'admin/contract/condition/domain';

class ProjectContractData {

  setData = async (values: ProjectContractParameter,
                   variableList: ContractConditionVariableVO[]
  ) => {
    if (!values.estimate || !values.basic) {
      return;
    }
    values.conditionList = this.getMappedConditions(values.conditionList, variableList);
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

  getMappedConditions(conditionList: ProjectContractConditionParameter[],
                      variableList: ContractConditionVariableVO[]
  ): ProjectContractConditionParameter[] {
    return conditionList.map((condition) => {
      return {
        title:           condition.title,
        descriptionList: this.getMappedDescriptionList(condition.descriptionList as unknown as string[], variableList),
      };
    });
  }

  getMappedDescriptionList(descriptionList: string[] | ProjectContractConditionDescriptionToMap[],
                           variableList: ContractConditionVariableVO[]
  ): ProjectContractConditionDescriptionToMap[] {
    return descriptionList.map((description) => {
      let descriptionStr = typeof description === 'string' ? description : description.description;
      return {
        description: this.convertFromVariableToValue(descriptionStr as string, variableList),
      };
    });
  }

  getSumPercent(stageList: ProjectContractCollectionStageParameter[]): number {
    return stageList.map((stage) => stage.rate)
                    .reduce((a,
                             b
                    ) => a + b, 0);
  }

  convertFromVariableToValue = (description: string,
                                variableList: ContractConditionVariableVO[]
  ): string => {
    let result = description;
    variableList.forEach(variable => {
      if (description.includes(variable.name)) {
        result = description.replace(`{${variable.name}}`, variable.value ?? '');
      }
    });
    return result;
  };
}

export const projectContractData = new ProjectContractData();
