package com.howoocast.hywtl_has.project.domain;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectStatus {

    /**
     * 진행 현황
     */
    @Setter
    @NotNull
    @Enumerated(EnumType.STRING)
    private ProjectProgressStatus progressStatus;

    /**
     * 견적 분류
     */
    @Setter
    @Enumerated(EnumType.STRING)
    private ProjectEstimateExpectation estimateExpectation;

    /**
     * 견적 상태
     */
    @Setter
    @Enumerated(EnumType.STRING)
    private ProjectEstimateStatus estimateStatus;

    /**
     * 계약 상태
     */
    @Setter
    @Enumerated(EnumType.STRING)
    private ProjectContractStatus contractStatus;

    public static ProjectStatus of(
        ProjectProgressStatus progressStatus
    ) {
        ProjectStatus instance = new ProjectStatus();
        instance.progressStatus = progressStatus;
        return instance;
    }

}
