package com.howoocast.hywtl_has.project_contract.domain;

import java.time.LocalDate;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectContractCollectionStage {

    /**
     * 단계명
     */
    private String name;

    /**
     * 비율
     */
    private Double rate;

    /**
     * 금액
     */
    private Long amount;

    /**
     * 시기
     */
    private String note;
    /**
     * 예정일
     */
    private LocalDate expectedDate;

    public static ProjectContractCollectionStage of(
        String name,
        Double rate,
        @Nullable Long amount,
        String note,
        @Nullable LocalDate expectedDate
    ) {
        ProjectContractCollectionStage instance = new ProjectContractCollectionStage();
        instance.name = name;
        instance.rate = rate;
        instance.amount = amount;
        instance.note = note;
        instance.expectedDate = expectedDate;
        return instance;
    }

}
