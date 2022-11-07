import {
  blobToFile,
  getBlob,
  loadFile
} from 'util/FileUtil';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import {
  ProjectContractCollectionStageParameter,
  ProjectContractConditionDescriptionToMap,
  ProjectContractConditionParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import { fileToView } from 'file-item';
import { toAmountKor } from 'util/NumberUtil';

export function generate(values: ProjectContractParameter,
                         callback: (values: ProjectContractParameter) => void
) {
  loadFile(`${location.origin}/file-item/template?fileName=contract_template.docx`,
    async function (error,
                    content
    ) {
      if (error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks:    true,
      });
      const data = await setData(values);
      doc.setData(data);
      doc.render(data);
      values.file = fileToView(blobToFile(getBlob(doc), `계약서-${data.serviceName}.docx`));
      callback && callback(values);
    });
}

const setData = async (values: ProjectContractParameter
) => {
  values.conditionList = getMappedConditions(values.conditionList);
  return {
    serviceName:                 values.basic.serviceName,
    serviceDuration:             values.basic.serviceDuration,
    expectedTestDeadLine:        values.estimate.plan ? values.estimate.plan.expectedTestDeadline : '',
    expectedFinalReportDeadLine: values.estimate.plan ? values.estimate.plan.expectedFinalReportDeadline : '',
    stageNote:                   values.collection.stageNote,
    collections:                 getCollections(values.collection.stageList),
    stagePercent:                getSumPercent(values.collection.stageList),
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

function getCollections(stageList: ProjectContractCollectionStageParameter[]) {
  return stageList.map((stage,
                        index
  ) => {
    return {
      name:   stage.name,
      rate:   stage.rate,
      amount: 0,
      note:   stage.note,
    };
  });
}

function getMappedConditions(conditionList: ProjectContractConditionParameter[]): ProjectContractConditionParameter[] {
  return conditionList.map((condition) => {
    return {
      title:           condition.title,
      descriptionList: getMappedDescriptionList(condition.descriptionList as unknown as string[]),
    };
  });
}

function getMappedDescriptionList(descriptionList: string[]): ProjectContractConditionDescriptionToMap[] {
  return descriptionList.map((description) => {
    return {
      description: description,
    };
  });
}

function getSumPercent(stageList: ProjectContractCollectionStageParameter[]): number {
  return stageList.map((stage) => stage.rate)
                  .reduce((a,
                           b
                  ) => a + b, 0);
}
