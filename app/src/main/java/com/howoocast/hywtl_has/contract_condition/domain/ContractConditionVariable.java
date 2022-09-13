package com.howoocast.hywtl_has.contract_condition.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractConditionVariable {

    private static List<ContractConditionVariable> list;

    /**
     * 변수명
     */
    private String name;
    /**
     * 설명
     */
    private String note;

    public static List<ContractConditionVariable> list() {
        if (list != null) {
            return list;
        }

        list = new ArrayList<>();
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "experiment_num";
            instance.note = "실험 동 수";
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "total_apartment_num";
            instance.note = "총 동 수";
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "experiment_week";
            instance.note = "설풍 납품 가능 주";
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "report_week";
            instance.note = "최종보고서 납품 가능 주";
            list.add(instance);
        }

        return list;
    }
}
