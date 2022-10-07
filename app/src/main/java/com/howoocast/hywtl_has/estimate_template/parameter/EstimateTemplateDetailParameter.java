package com.howoocast.hywtl_has.estimate_template.parameter;

import com.howoocast.hywtl_has.estimate_template.domain.EstimateTemplateDetail;
import com.howoocast.hywtl_has.estimate_template.domain.EstimateUnit;
import java.util.List;
import javax.validation.constraints.Min;
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

    @NotNull(message = EstimateTemplateDetail.KEY + ".unit.note_null")
    private EstimateUnit unit;

    @NotNull(message = EstimateTemplateDetail.KEY + ".unit_amount.not_null")
    @Min(value = 0, message = EstimateTemplateDetail.KEY + ".unit_amount.positive")
    private Long unitAmount;

    @NotNull(message = EstimateTemplateDetail.KEY + ".in_use.not_null")
    private Boolean inUse;

    private String note;
}
