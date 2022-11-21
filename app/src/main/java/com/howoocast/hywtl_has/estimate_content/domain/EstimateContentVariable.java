package com.howoocast.hywtl_has.estimate_content.domain;

import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EstimateContentVariable {

    private static List<EstimateContentVariable> list;

    /**
     * 변수명
     */
    private String name;
    /**
     * 설명
     */
    private String note;

    private String value = "";

    public static List<EstimateContentVariable> list() {
        list = new ArrayList<>();
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "experiment_num";
            instance.note = "실험 동 수";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_apartment_num";
            instance.note = "총 동 수";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "experiment_week";
            instance.note = "설풍 납품 가능 주";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "report_week";
            instance.note = "최종보고서 납풍 가능 주";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_price";
            instance.note = "총 금액(부가세 미포함)";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_price_tax";
            instance.note = "총 금액(부가세 포함)";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_price_kor";
            instance.note = "한글 표기 총 금액(부가세 미포함)";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_price_kor_tax";
            instance.note = "한글 표기 총 금액(부가세 미포함)";
            list.add(instance);
        }
        return list;
    }
}
