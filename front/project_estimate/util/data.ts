import {
  ProjectEstimateContentListToMap,
  ProjectEstimateTemplateDetailTitleListToMap,
  ProjectEstimateTemplateParameter,
  ProjectSystemEstimateParameter
} from 'project_estimate/parameter';
import { ProjectVO } from 'project/domain';
import { documentDataApi } from 'project_estimate/util/api';
import { personnelApi } from 'personnel/api';
import { toAmountKor } from 'util/NumberUtil';
import { testUnitName } from 'type/TestType';
import { PersonnelJobVO } from 'personnel/domain';

class ProjectEstimateData {
  setData = async (values: ProjectSystemEstimateParameter,
                   project: ProjectVO
  ) => {
    const estimateNumber = this.getEstimateNumber(project.code!, await documentDataApi.getSequenceNumber(project.id));
    const manager1 = await personnelApi.getOne(values.plan.manager1Id) ?? undefined;
    const manager2 = await personnelApi.getOne(values.plan.manager2Id) ?? undefined;
    values.contentList = this.mapToContentList(values.contentList as unknown as string[]);
    values.templateList = this.getMappedServiceList(values.templateList);
    return {
      recipient:           values.recipient!,
      projectName:         project.name,
      estimateDate:        values.plan.estimateDate,
      estimateNumber:      estimateNumber ?? '',
      expectedServiceDate: values.plan.expectedServiceDate,
      manager1_jobClass:   this.getJobClass(manager1?.jobList) ?? '',
      manager1_name:       manager1.name ?? '',
      manager1_phone:      manager1.basic?.phone ?? '',
      manager1_email:      manager1.email ?? '',
      manager2_jobClass:   this.getJobClass(manager2.jobList) ?? '',
      manager2_name:       manager2.name ?? '',
      manager2_phone:      manager2.basic?.phone ?? '',
      manager2_email:      manager2.email ?? '',
      totalAmount:         values.plan.totalAmount.toLocaleString(),
      totalAmountKor:      toAmountKor(values.plan?.totalAmount ?? 0),
      discountAmount:      values.plan.discountAmount ? values.plan.discountAmount.toLocaleString() : 0,
      testAmount:          values.plan.testAmount.toLocaleString(),
      serviceList:         this.getServiceList(values.templateList),
      contentList:         values.contentList,
    };
  };

  getEstimateNumber = (code: string,
                       sequenceNumber: number
  ): String => {
    return 'Q' + code + sequenceNumber.toString()
                                      .padStart(2, '0');
  };


  getMappedServiceList = (list: ProjectEstimateTemplateParameter[]): ProjectEstimateTemplateParameter[] => {
    return list.map((service) => {
      return {
        title:      service.title,
        testType:   service.testType,
        detailList: service.detailList.map((detail) => {
          return {
            unit:        detail.unit,
            testCount:   detail.testCount,
            unitAmount:  detail.unitAmount,
            totalAmount: detail.totalAmount,
            note:        detail.note,
            titleList:   this.getMappedTitleList(detail.titleList as unknown as string[]),
            inUse:       detail.inUse,
          };
        })
      };
    });
  };

  getMappedTitleList = (list: string[]): ProjectEstimateTemplateDetailTitleListToMap[] => {
    return list.map((title) => {
      return {
        title: title,
      };
    });
  };

  getServiceList = (list: ProjectEstimateTemplateParameter[]) => {
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
                title: title.title,
              };
            })
          };
        }),
      };
    });
  };

  getJobClass = (jobList: PersonnelJobVO[]): String | undefined => {
    return jobList.filter(job => job.isRepresentative)[0].jobClass;
  };

  mapToContentList = (contentList: string[]): ProjectEstimateContentListToMap[] => {
    return contentList.map(content => {
      return {
        content: content,
      };
    });
  };
}

export const projectEstimateData = new ProjectEstimateData();
