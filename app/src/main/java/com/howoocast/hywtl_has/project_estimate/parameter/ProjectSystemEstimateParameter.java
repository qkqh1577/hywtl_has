package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectSystemEstimate;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectSystemEstimateParameter {

    public ProjectSystemEstimateParameter(Boolean isSent, String recipient, String note, Boolean isLh,
        ProjectEstimatePlanParameter plan, List<ProjectEstimateComplexSiteParameter> siteList,
        List<ProjectEstimateComplexBuildingParameter> buildingList, List<ProjectEstimateTemplateParameter> templateList,
        List<String> contentList, FileItemParameter file) {
        System.out.println("hello world");
        System.out.println(contentList);

        this.isSent = isSent;
        this.recipient = recipient;
        this.note = note;
        this.isLh = isLh;
        this.plan = plan;
        this.siteList = siteList;
        this.buildingList = buildingList;
        this.templateList = templateList;
        this.contentList = contentList;
        this.file = file;
    }

    @NotNull(message = ProjectSystemEstimate.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @NotBlank(message = ProjectSystemEstimate.KEY + ".recipient.not_blank")
    private String recipient;

    private String note;

    private Boolean isLh;

    @NotNull(message = ProjectSystemEstimate.KEY + ".plan.not_null")
    private ProjectEstimatePlanParameter plan;

    @NotEmpty(message = ProjectSystemEstimate.KEY + ".site_list.not_empty")
    private List<ProjectEstimateComplexSiteParameter> siteList;

    @NotEmpty(message = ProjectSystemEstimate.KEY + ".building_list.not_empty")
    private List<ProjectEstimateComplexBuildingParameter> buildingList;

    @NotEmpty(message = ProjectSystemEstimate.KEY + ".template_list.not_empty")
    private List<ProjectEstimateTemplateParameter> templateList;

    private List<String> contentList;

    private FileItemParameter file;
}
