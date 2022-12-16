package com.howoocast.hywtl_has.estimate_template.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplate;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateTemplateParameter {

    @NotBlank(message = EstimateTemplate.KEY + ".title.not_blank")
    private String title;

    @NotNull(message = EstimateTemplate.KEY + ".test_type.not_null")
    private TestType testType;

    @Valid
    @NotEmpty(message = EstimateTemplate.KEY + ".detail_list.not_empty")
    private List<EstimateTemplateDetailParameter> detailList;
}
