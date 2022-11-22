import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import { ProjectContractParameter } from 'project_contract/parameter';
import { toAmountKor } from 'util/NumberUtil';

export class ProjectContractVariable {
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

  public static list(list: ContractConditionVariableVO[] = [],
                     values?: ProjectContractParameter
  ) {
    if (list.length === 0) {
      return [];
    }
    return list.map((item) => {
      if (item.name === 'experiment_num') {
        return new ProjectContractVariable(item.name, item.note, values?.estimate.test?.targetTest ?? '실험 동 수 없음');
      }
      if (item.name === 'total_apartment_num') {
        return new ProjectContractVariable(item.name, item.note, values?.estimate.buildingList?.length ?? 0);
      }
      if (item.name === 'experiment_week') {
        return new ProjectContractVariable(item.name, item.note, values?.estimate.plan?.expectedTestDeadline);
      }
      if (item.name === 'report_week') {
        return new ProjectContractVariable(item.name, item.note, values?.estimate.plan?.expectedFinalReportDeadline);
      }
      if (item.name === 'total_price') {
        return new ProjectContractVariable(item.name, item.note, values?.estimate.plan?.totalAmount.toLocaleString() ?? 0);
      }
      if (item.name === 'total_price_tax') {
        return new ProjectContractVariable(item.name, item.note, ((values?.estimate.plan?.totalAmount ?? 0) + ((values?.estimate.plan?.totalAmount ?? 0) * 0.1)).toLocaleString() ?? 0);
      }
      if (item.name === 'total_price_kor') {
        return new ProjectContractVariable(item.name, item.note, toAmountKor(values?.estimate.plan?.totalAmount ?? 0));
      }
      if (item.name === 'total_price_kor_tax') {
        return new ProjectContractVariable(item.name, item.note, toAmountKor((values?.estimate.plan?.totalAmount ?? 0) + ((values?.estimate.plan?.totalAmount ?? 0) * 0.1)));
      }
    });
  }
}
