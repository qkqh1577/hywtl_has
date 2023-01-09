package com.howoocast.hywtl_has.project.domain;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

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

    @Setter
    @Enumerated(EnumType.STRING)
    private ProjectBidStatus bidStatus;

    public static ProjectStatus of(
        ProjectProgressStatus progressStatus
    ) {
        ProjectStatus instance = new ProjectStatus();
        instance.progressStatus = progressStatus;
        return instance;
    }

    /**
     * @migration 마이그레이션 용도 한정
     * @param progressStatus
     * @param estimateExpectation
     * @param estimateStatus
     * @param contractStatus
     * @return
     */
    public static ProjectStatus of(
        ProjectProgressStatus progressStatus,
        ProjectEstimateExpectation estimateExpectation,
        @Nullable ProjectEstimateStatus estimateStatus,
        ProjectContractStatus contractStatus
    ) {
        ProjectStatus instance = new ProjectStatus();
        instance.progressStatus = progressStatus;
        instance.estimateExpectation = estimateExpectation;
        instance.estimateStatus = estimateStatus;
        instance.contractStatus = contractStatus;
        return instance;
    }

    public ProjectStatus updateContractStatus(ProjectContractStatus contractStatus) {
        this.contractStatus = contractStatus;
        return this;
    }

}
