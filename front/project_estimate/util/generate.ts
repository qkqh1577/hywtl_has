import {
  ProjectEstimateContentListToMap,
  ProjectEstimateTemplateParameter,
  ProjectSystemEstimateParameter
} from 'project_estimate/parameter';
import { ProjectVO } from 'project/domain';
import {
  blobToFile,
  getBlob,
  loadFile
} from 'util/FileUtil';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { toAmountKor } from 'util/NumberUtil';
import { testUnitName } from 'type/TestType';
import { personnelApi } from 'personnel/api';
import { documentDataApi } from 'project_estimate/util/api';
import { fileToView } from 'file-item';

export function generate(values: ProjectSystemEstimateParameter,
                         project: ProjectVO,
                         callback: (values: ProjectSystemEstimateParameter) => void
) {
  loadFile(
    'http://localhost:8080/file-item/template?fileName=estimate_template.docx',
    async function (error,
                    content
    ) {
      if (error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks:    true,
      });
      const data = await setData(values, project);
      doc.setData(data);
      doc.render(data);

      values.file = fileToView(blobToFile(getBlob(doc), `견적서-${data.projectName}-${data.estimateNumber}.docx`));
      callback && callback(values);
    }
  );
}

const setData = async (values: ProjectSystemEstimateParameter,
                       project: ProjectVO
) => {
  const estimateNumber = getEstimateNumber(project.code!, await documentDataApi.getSequenceNumber(project.id));
  const manager1 = await personnelApi.getOne(values.plan.manager1Id) ?? undefined;
  const manager2 = await personnelApi.getOne(values.plan.manager2Id) ?? undefined;
  values.contentList = mapToContentList(values.contentList as unknown as string[]);
  return {
    recipient:           values.recipient!,
    projectName:         project.name,
    estimateDate:        values.plan.estimateDate,
    estimateNumber:      estimateNumber ?? '',
    expectedServiceDate: values.plan.expectedServiceDate,
    manager1_jobClass:   getJobClass(manager1?.jobList) ?? '',
    manager1_name:       manager1.name ?? '',
    manager1_phone:      manager1.basic?.phone ?? '',
    manager1_email:      manager1.email ?? '',
    manager2_jobClass:   getJobClass(manager2.jobList) ?? '',
    manager2_name:       manager2.name ?? '',
    manager2_phone:      manager2.basic?.phone ?? '',
    manager2_email:      manager2.email ?? '',
    totalAmount:         values.plan.totalAmount.toLocaleString(),
    totalAmountKor:      toAmountKor(values.plan?.totalAmount ?? 0),
    discountAmount:      values.plan.discountAmount ? values.plan.discountAmount.toLocaleString() : 0,
    testAmount:          values.plan.testAmount.toLocaleString(),
    serviceList:         getServiceList(values.templateList),
    contentList:         values.contentList,
  };
};

const getEstimateNumber = (code: string,
                           sequenceNumber: number
) => {
  return 'Q' + code + sequenceNumber.toString()
                                    .padStart(2, '0');
};

const getServiceList = (list: ProjectEstimateTemplateParameter[]) => {
  return list.map((service,
                   index
  ) => {
    return {
      index:      index + 1,
      title:      service.title,
      detailList: service.detailList.map((detail) => {
        return {
          unit:        testUnitName(detail.unit),
          testCount:   detail.testCount,
          unitAmount:  detail.unitAmount.toLocaleString(),
          totalAmount: detail.inUse ? detail.totalAmount.toLocaleString() : 0,
          note:        detail.note,
          titleList:   detail.titleList.map((title) => {
            return {
              title: title,
            };
          })
        };
      }),
    };
  });
};

const getJobClass = (jobList) => {
  return jobList.filter(job => job.isRepresentative)[0].jobClass;
};

const mapToContentList = (contentList: string[]): ProjectEstimateContentListToMap[] => {
  return contentList.map(content => {
    return {
      content: content,
    };
  });
};
