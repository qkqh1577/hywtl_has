package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateTemplate;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateTemplateParameter {

    @NotBlank(message = ProjectEstimateTemplate.KEY + ".title.not_blank")
    private String title;

    @NotNull(message = ProjectEstimateTemplate.KEY + ".test_type.not_null")
    private TestType testType;

    @NotEmpty(message = ProjectEstimateTemplate.KEY + ".detail_list.not_empty")
    private List<ProjectEstimateTemplateDetailParameter> detailList;
}
