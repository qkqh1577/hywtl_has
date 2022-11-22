import { EstimateContentVariableVO } from 'admin/estimate/content/domain';
import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';
import { toAmountKor } from 'util/NumberUtil';
import { TestType } from 'type/TestType';

export class ProjectEstimateVariable {
  private name: string;
  private note: string;
  private value: string;

  constructor(name,
              note,
              value
  ) {
    this.name = name;
    this.note = note;
    this.value = value;
  }

  public static list(list: EstimateContentVariableVO[] = [],
                     values: ProjectSystemEstimateParameter
  ) {
    let targetTest = getTargetTest(values);

    if (list.length === 0) {
      return [];
    }
    return list.map((item) => {
      if (item.name === 'experiment_num') {
        return new ProjectEstimateVariable(item.name, item.note, targetTest || '실험 동 수 없음');
      }
      if (item.name === 'total_apartment_num') {
        return new ProjectEstimateVariable(item.name, item.note, values?.buildingList.length ?? 0);
      }
      if (item.name === 'experiment_week') {
        return new ProjectEstimateVariable(item.name, item.note, values?.plan.expectedTestDeadline);
      }
      if (item.name === 'report_week') {
        return new ProjectEstimateVariable(item.name, item.note, values?.plan.expectedFinalReportDeadline);
      }
      if (item.name === 'total_price') {
        return new ProjectEstimateVariable(item.name, item.note, values?.plan.totalAmount.toLocaleString() ?? 0);
      }
      if (item.name === 'total_price_tax') {
        return new ProjectEstimateVariable(item.name, item.note, values && (((values.plan.totalAmount + (values.plan.totalAmount * 0.1))).toLocaleString() ?? 0));
      }
      if (item.name === 'total_price_kor') {
        return new ProjectEstimateVariable(item.name, item.note, toAmountKor(values!.plan.totalAmount ?? 0));
      }
      if (item.name === 'total_price_kor_tax') {
        return new ProjectEstimateVariable(item.name, item.note, toAmountKor((values!.plan.totalAmount + (values!.plan.totalAmount * 0.1)) ?? 0));
      }
    });
  }
}

const getTargetTest = (values: ProjectSystemEstimateParameter) => {
  let targetTest: string = '';
  let testTypeFCount: number = 0;
  let testTypePCount: number = 0;
  let testTypeACount: number = 0;
  let testTypeECount: number = 0;

  values?.buildingList.forEach(building => {
    building.testTypeList?.forEach(testType => {
      if (testType === TestType.P) {
        testTypePCount++;
      }
      if (testType === TestType.A) {
        testTypeACount++;
      }
      if (testType === TestType.F) {
        testTypeFCount++;
      }
    });
    targetTest =
      (testTypeFCount ? (TestType.F + testTypeFCount) : '') +
      (testTypePCount ? (TestType.P + testTypePCount) : '') +
      (testTypeACount ? (TestType.A + testTypeACount) : '');
  });

  values?.siteList.forEach(site => {
    if (site.withEnvironmentTest) {
      testTypeECount++;
    }
  });
  targetTest += (testTypeECount ? (TestType.E + testTypeECount) : '');
  return targetTest;
};

