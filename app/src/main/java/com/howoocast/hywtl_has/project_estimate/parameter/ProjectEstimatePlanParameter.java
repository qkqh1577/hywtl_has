package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectEstimatePlanParameter {

    @NotNull(message = ProjectSystemEstimate.KEY + ".estimate_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate estimateDate;
    @NotNull(message = ProjectSystemEstimate.KEY + ".expected_service_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate expectedServiceDate;
    @NotNull(message = ProjectSystemEstimate.KEY + ".expected_test_deadline.not_null")
    private Integer expectedTestDeadline;
    @NotNull(message = ProjectSystemEstimate.KEY + ".expected_final_report_deadline.not_null")
    private Integer expectedFinalReportDeadline;

    private Long testAmount;
    private Long reviewAmount;
    private Long discountAmount;
    private Long totalAmount;
    private Long manager1Id;
    private Long manager2Id;
    @NotNull(message = ProjectSystemEstimate.KEY + ".estimate_isLh.not_null")
    private Boolean isLh;
    private Boolean hasExperimentInfo;
}
