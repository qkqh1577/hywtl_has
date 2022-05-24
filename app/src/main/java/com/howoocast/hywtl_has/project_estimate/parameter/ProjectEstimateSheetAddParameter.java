package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.common.ProjectEstimateSheetStatus;
import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectEstimateSheetAddParameter {

    @NotNull(message = "project.estimate.sheet.confirm.not-null")
    private Boolean confirmed;

    @NotNull(message = "project.estimate.sheet.status.not-null")
    private ProjectEstimateSheetStatus status;

    @NotBlank(message = "project.estimate.sheet.title.not-blank")
    private String title;

    private String memo;

    @NotNull(message = "project.estimate.sheet.estimate-date.not-null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate estimateDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate expectedStartMonth;

    @NotNull(message = "project.estimate.sheet.sales-team-leader-id.not-null")
    private Long salesTeamLeaderId;

    private Long salesManagementLeaderId;

    private Integer engineeringPeriod;

    private Integer finalReportPeriod;

    @NotNull(message = "project.estimate.sheet.project-review-id.not-null")
    private Long reviewId;

    @NotEmpty(message = "project.estimate.sheet.test-service-list.not-empty")
    private List<ProjectEstimateSheetTestServiceParameter> testServiceList;

    private Long specialDiscount;

    @NotEmpty(message = "project.estimate.sheet.comment-list.not-empty")
    private List<ProjectEstimateSheetCommentParameter> commentList;


}
