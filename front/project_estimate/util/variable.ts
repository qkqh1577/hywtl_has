import { EstimateContentVariableVO } from 'admin/estimate/content/domain';
import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';
import { toAmountKor } from 'util/NumberUtil';

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
                     values?: ProjectSystemEstimateParameter
  ) {
    if (list.length === 0) {
      return [];
    }
    return list.map((item) => {
      if (item.name === 'experiment_num') {
        return new ProjectEstimateVariable(item.name, item.note, values?.test?.targetTest ?? '실험 동 수 없음');
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
