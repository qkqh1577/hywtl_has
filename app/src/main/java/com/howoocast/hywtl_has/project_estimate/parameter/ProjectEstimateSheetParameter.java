package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.common.service.ValidationGroup.OnAdd;
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
public class ProjectEstimateSheetParameter {

    @NotNull(message = "project.estimate.sheet.confirm.not_null")
    private Boolean confirmed;

    @NotNull(message = "project.estimate.sheet.status.not_null")
    private ProjectEstimateSheetStatus status;

    @NotBlank(message = "project.estimate.sheet.title.not_blank")
    private String title;

    private String note;

    @NotNull(message = "project.estimate.sheet.estimate_date.not_null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate estimateDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate expectedStartMonth;

    @NotNull(message = "project.estimate.sheet.sales_team_leader_id.not_null")
    private Long salesTeamLeaderId;

    private Long salesManagementLeaderId;

    private Integer engineeringPeriod;

    private Integer finalReportPeriod;

    @NotNull(message = "project.estimate.sheet.project_review_id.not_null", groups = OnAdd.class)
    private Long reviewId;

    @NotEmpty(message = "project.estimate.sheet.test_service_list.not_empty")
    private List<ProjectEstimateSheetTestServiceParameter> testServiceList;

    private Long specialDiscount;

    @NotEmpty(message = "project.estimate.sheet.comment_list.not_empty")
    private List<ProjectEstimateSheetCommentParameter> commentList;

}
