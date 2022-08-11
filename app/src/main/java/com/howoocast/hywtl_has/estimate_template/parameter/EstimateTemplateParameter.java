package com.howoocast.hywtl_has.estimate_template.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateTemplateParameter {

    @NotBlank(message = "estimate-template.title.not-blank")
    private String title;

    @NotNull(message = "estimate-template.test-type.not-null")
    private TestType testType;

    @NotEmpty(message = "test-service-template.detail-list.not-empty")
    private List<EstimateTemplateDetailParameter> detailList;
}
