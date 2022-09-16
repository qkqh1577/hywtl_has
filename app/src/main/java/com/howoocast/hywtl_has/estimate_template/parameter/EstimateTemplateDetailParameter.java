package com.howoocast.hywtl_has.estimate_template.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstimateTemplateDetailParameter {

    private Long id;

    @NotEmpty(message = EstimateTemplateDetail.KEY + ".title_list.not_empty")
    private List<String> titleList;

    @NotBlank(message = EstimateTemplateDetail.KEY + ".unit.not_blank")
    private String unit;

    @NotNull(message = EstimateTemplateDetail.KEY + ".unit_amount.not_null")
    @Min(value = 0, message = EstimateTemplateDetail.KEY + ".unit_amount.positive")
    private Long unitAmount;

    private String note;
}
