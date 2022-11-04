import {
  blobToFile,
  getBlob,
  loadFile
} from 'util/FileUtil';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import {
  ProjectContractCollectionStageParameter,
  ProjectContractConditionParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import { fileToView } from 'file-item';

export function generate(values: ProjectContractParameter,
                         callback: (values: ProjectContractParameter) => void
) {
  loadFile('http://localhost:8080/file-item/template?fileName=contract_template.docx',
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
  console.log("values : ", values);
  return {
    serviceName:           values.basic.serviceName,
    serviceDuration:       values.basic.serviceDuration,
    serviceAmount:         '100,000,000',
    stageNote:             values.collection.stageNote,
    collections:           getCollections(values.collection.stageList),
    stagePercent:          '100',
    totalAmount:           values.collection.totalAmount,
    totalAmountNote:       values.collection.totalAmountNote,
    outcome:               values.basic.outcome,
    description:           values.basic.description,
    contractDate:          values.basic.contractDate,
    contractorAddress:     values.basic.contractorAddress ?? '',
    contractorCompanyName: values.basic.contractorCompanyName ?? '',
    contractorCeoName:     values.basic.contractorCeoName ?? '',
    ordererAddress:        values.basic.ordererAddress ?? '',
    ordererCompanyName:    values.basic.ordererCompanyName ?? '',
    ordererCeoName:        values.basic.ordererCeoName ?? '',
    conditions:            getConditions(values.conditionList),
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

function getConditions(conditionList: ProjectContractConditionParameter[]) {
  return conditionList.map((condition) => {
    return {
      title:        condition.title,
      descriptions: getDescriptions(condition.descriptionList)
    };
  });
}

function getDescriptions(descriptions) {
  return descriptions.map((description) => {
    return {
      description,
    };
  });
}
