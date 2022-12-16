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
import {
  TestType,
  testUnitName
} from 'type/TestType';
import {
  PersonnelJobVO,
  PersonnelVO
} from 'personnel/domain';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';

class ProjectEstimateData {

  setData = async (values: ProjectSystemEstimateParameter,
                   variableList: EstimateContentVariableVO[],
                   project: ProjectVO
  ) => {
    const estimateNumber = this.getEstimateNumber(project.code!, await documentDataApi.getSequenceNumber(project.id));
    const manager1 = values.plan.manager1Id ? await personnelApi.getOne(values.plan.manager1Id) ?? undefined : undefined;
    const manager2 = values.plan.manager2Id ? await personnelApi.getOne(values.plan.manager2Id) ?? undefined : undefined;
    values.contentList = this.mapToContentList(values.contentList as unknown as string[], variableList);
    values.templateList = this.getMappedServiceList(values.templateList);
    const templateListWithOutReview = values.templateList.filter(template => template.testType !== TestType.REVIEW);

    return {
      recipient:           values.recipient!,
      projectName:         project.name,
      estimateDate:        values.plan.estimateDate,
      estimateNumber:      estimateNumber ?? '',
      expectedServiceDate: values.plan.expectedServiceDate,
      manager1_jobClass:   this.getJobClass(getManagerJobList(manager1)) ?? '',
      manager1_name:       getManagerName(manager1) ?? '',
      manager1_phone:      getManagerPhone(manager1) ?? '',
      manager1_email:      getManagerEmail(manager1) ?? '',
      manager2_jobClass:   this.getJobClass(getManagerJobList(manager2)) ?? '',
      manager2_name:       getManagerName(manager2) ?? '',
      manager2_phone:      getManagerPhone(manager2) ?? '',
      manager2_email:      getManagerEmail(manager2) ?? '',
      totalAmount:         values.plan.totalAmount.toLocaleString(),
      totalAmountKor:      toAmountKor(values.plan?.totalAmount ?? 0),
      discountAmount:      values.plan.discountAmount ? values.plan.discountAmount.toLocaleString() : 0,
      testAmount:          values.plan.testAmount.toLocaleString(),
      serviceList:         this.getServiceList(templateListWithOutReview),
      serviceReviewList:   this.getServiceList(values.templateList.filter(template => template.testType === TestType.REVIEW), templateListWithOutReview.length),
      contentList:         values.contentList,
      isLh:                values.plan.isLh ? '면제' : '별도'
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
            note:        detail.note ?? '',
            titleList:   this.getMappedTitleList(detail.titleList as unknown as string[]),
            inUse:       detail.inUse,
          };
        })
      };
    });
  };

  getMappedTitleList = (list: string[]): ProjectEstimateTemplateDetailTitleListToMap[] => {
    return list.map((title) => {
      if(typeof title === 'string') {
        return {
          title: title,
        };
      }
      return title;
    });
  };

  getServiceList = (list: ProjectEstimateTemplateParameter[],
                    templateListWithoutReviewLength: number = 0
  ) => {
    return list.map((service,
                     index
    ) => {
      return {
        index:      (templateListWithoutReviewLength + index) + 1,
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
    if (!jobList || jobList.length === 0) {
      return '';
    }
    return jobList.filter(job => job.isRepresentative)[0].jobClass;
  };

  mapToContentList = (contentList: string[] | ProjectEstimateContentListToMap[],
                      variableList: EstimateContentVariableVO[]
  ): ProjectEstimateContentListToMap[] => {
    return contentList.map(content => {
      const contentStr = typeof content === 'string' ? content : content.content;
      return {
        content: this.convertFromVariableToValue(contentStr, variableList),
      };
    });
  };
  convertFromVariableToValue = (content: string,
                                variableList: EstimateContentVariableVO[]
  ): string => {
    let result = content;
    variableList.forEach(variable => {
      if (content.includes(variable.name)) {
        result = content.replace(`{${variable.name}}`, variable.value ?? '');
      }
    });
    return result;
  };

}

function getManagerName(manager: PersonnelVO | undefined) {
  if (!manager) {
    return '';
  }
  return manager.name;
}

function getManagerPhone(manager: PersonnelVO | undefined) {
  if (!manager || !manager.basic) {
    return '';
  }
  return manager.basic.phone;
}

function getManagerEmail(manager: PersonnelVO | undefined) {
  if(!manager){
    return '';
  }
  return manager.email;
}

function getManagerJobList(manager: PersonnelVO | undefined) {
  if(!manager){
    return [];
  }
  return manager.jobList;
}
export const projectEstimateData = new ProjectEstimateData();
