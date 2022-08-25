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

    public static List<EstimateContentVariable> list() {
        if (list != null) {
            return list;
        }
        list = new ArrayList<>();
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "building_count";
            instance.note = "실험 동 수";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_building_count";
            instance.note = "총 동 수";
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_price";
            instance.note = "총액(부가세 미포함)";
            list.add(instance);
        }
        return list;
    }
}
