package com.howoocast.hywtl_has.contract_condition.domain;

import com.howoocast.hywtl_has.common.util.NumberUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

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

    private String value = "";

    public static List<ContractConditionVariable> list() {
        return list(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    }

    public static List<ContractConditionVariable> list(
        @Nullable Integer totalSiteCount,
        @Nullable Integer totalBuildingCount,
        @Nullable Integer aBuildingCount,
        @Nullable Long aTestAmount,
        @Nullable Integer aTestWeek,
        @Nullable Long reviewAmount,
        @Nullable Long totalAmount,
        @Nullable Integer testReportWeek,
        @Nullable Integer finalReportWeek

    ) {
        if (list != null) {
            return list;
        }
        list = new ArrayList<>();
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "total_site_count";
            instance.note = "총 단지 수";
            if (Objects.nonNull(totalSiteCount)) {
                instance.value = String.format("%d", totalSiteCount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "total_building_count";
            instance.note = "실험 동 수";
            if (Objects.nonNull(totalBuildingCount)) {
                instance.value = String.format("%d", totalBuildingCount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "a_building_count";
            instance.note = "공기력 진동 실험 동 수";
            if (Objects.nonNull(aBuildingCount)) {
                instance.value = String.format("%d", aBuildingCount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "a_test_amount";
            instance.note = "공기력 진동 실험 추가 금액 (콤마 표기)";
            if (Objects.nonNull(aTestAmount)) {
                instance.value = NumberUtil.toLocaleString(aTestAmount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "a_test_amount_kor";
            instance.note = "공기력 진동 실험 추가 금액 한글 (일금-원 표기)";
            if (Objects.nonNull(aTestAmount)) {
                instance.value = NumberUtil.toAmountKor(aTestAmount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "a_test_week";
            instance.note = "공기력 진동 실험 추가 주";
            if (Objects.nonNull(aTestWeek)) {
                instance.value = String.format("%d", aTestWeek);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "review_amount";
            instance.note = "구검 비용 (콤마 표기)";
            if (Objects.nonNull(reviewAmount)) {
                instance.value = NumberUtil.toLocaleString(reviewAmount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "review_amount_kor";
            instance.note = "구검 비용 한글 (일금-원 표기)";
            if (Objects.nonNull(reviewAmount)) {
                instance.value = NumberUtil.toAmountKor(reviewAmount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "total_amount";
            instance.note = "총액 (콤마 표기)";
            if (Objects.nonNull(totalAmount)) {
                instance.value = NumberUtil.toLocaleString(totalAmount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "total_amount_kor";
            instance.note = "총액 한글 (일금-원 표기)";
            if (Objects.nonNull(totalAmount)) {
                instance.value = NumberUtil.toAmountKor(totalAmount);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "test_report_week";
            instance.note = "구조 설계용 가능 주";
            if (Objects.nonNull(testReportWeek)) {
                instance.value = String.format("%d", testReportWeek);
            }
            list.add(instance);
        }
        {
            ContractConditionVariable instance = new ContractConditionVariable();
            instance.name = "final_report_week";
            instance.note = "최종보고서 납품 가능 주";
            if (Objects.nonNull(finalReportWeek)) {
                instance.value = String.format("%d", finalReportWeek);
            }
            list.add(instance);
        }

        return list;
    }
}
