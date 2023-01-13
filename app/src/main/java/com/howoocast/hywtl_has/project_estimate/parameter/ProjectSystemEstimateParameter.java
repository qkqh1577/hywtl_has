package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectSystemEstimateParameter {

    @NotNull(message = ProjectSystemEstimate.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @NotBlank(message = ProjectSystemEstimate.KEY + ".recipient.not_blank")
    private String recipient;

    private String note;

    private Boolean isLh;

    @Valid
    @NotNull(message = ProjectSystemEstimate.KEY + ".plan.not_null")
    private ProjectEstimatePlanParameter plan;

    private List<ProjectEstimateComplexSiteParameter> siteList;

    private List<ProjectEstimateComplexBuildingParameter> buildingList;

    @Valid
    @NotEmpty(message = ProjectSystemEstimate.KEY + ".template_list.not_empty")
    private List<ProjectEstimateTemplateParameter> templateList;

    private List<Content> contentList;

    private FileItemParameter file;

    @Getter
    @Setter
    public static class Content {
        private String content;
    }
}
