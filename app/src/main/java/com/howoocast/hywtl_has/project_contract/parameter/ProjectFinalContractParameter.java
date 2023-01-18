package com.howoocast.hywtl_has.project_contract.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectFinalContractParameter {
    private LocalDate contractDate;
    private Boolean resetContractDate;
    private String contractType;
    private Boolean resetContractType;
    private String code;
    private Boolean resetCode;
    private String estimateCode;
    private Boolean resetEstimateCode;
    private String targetTest;
    private Boolean resetTargetTest;
    private Long testAmount;
    private Boolean resetTestAmount;
    private Long reviewAmount;
    private Boolean resetReviewAmount;
    private Long totalAmount;
    private Boolean resetTotalAmount;
    private String note;
    private Boolean resetNote;
    private String schedule;
    private Boolean resetSchedule;
    private Long businessId;
    private Boolean resetBusinessId;
    private Long writerId;
    private Boolean resetWriterId;
    private Boolean isSent;
    private Boolean resetIsSent;

    // 기성단계 추가 관련 프로퍼티
}
