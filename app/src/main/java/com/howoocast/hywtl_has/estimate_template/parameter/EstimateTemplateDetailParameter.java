package com.howoocast.hywtl_has.estimate_template.parameter;

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

    @NotEmpty(message = "estimate-template-detail.title-list.not-empty")
    private List<String> titleList;

    @NotBlank(message = "estimate-template-detail.unit.not-blank")
    private String unit;

    @NotNull(message = "estimate-template-detail.unit-price.not-null")
    @Min(value = 0, message = "estimate-template-detail.unit-price.positive")
    private Long unitPrice;

    private String memo;
}
