package com.howoocast.hywtl_has.estimate_content.domain;

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
        return list(null, null, null);
    }

    public static List<EstimateContentVariable> list(
        @Nullable Integer buildingCount,
        @Nullable Integer totalBuildingCount,
        @Nullable Long totalAmount
    ) {
        list = new ArrayList<>();
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "building_count";
            instance.note = "실험 동 수";
            if (Objects.nonNull(buildingCount)) {
                instance.value = String.format("%d", buildingCount);
            }
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_building_count";
            instance.note = "총 동 수";
            if (Objects.nonNull(totalBuildingCount)) {
                instance.value = String.format("%d", totalBuildingCount);
            }
            list.add(instance);
        }
        {
            EstimateContentVariable instance = new EstimateContentVariable();
            instance.name = "total_price";
            instance.note = "총액(부가세 미포함)";
            if (Objects.nonNull(totalAmount)) {
                instance.value = NumberUtil.toLocaleString(totalAmount);
            }
            list.add(instance);
        }
        return list;
    }
}
