package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomIdParameter;
import com.howoocast.hywtl_has.common.service.ValidationGroup.OnAdd;
import com.howoocast.hywtl_has.common.service.ValidationGroup.OnEdit;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateSheetTestServiceDetailParameter extends CustomIdParameter {

    @NotNull(message = "project.estimate.sheet.test_service.detail.id.not_null", groups = OnEdit.class)
    private Long id;

    @NotEmpty(message = "project.estimate.sheet.detail.title_list.not_empty", groups = OnAdd.class)
    private List<String> titleList;

    @NotNull(message = "project.estimate.sheet.detail.seq.not_null", groups = OnAdd.class)
    @Min(value = 0, message = "project.estimate.sheet.detail.seq.positive", groups = OnAdd.class)
    private Integer seq;

    @NotBlank(message = "project.estimate.sheet.detail.unit.not_blank")
    private String unit;

    @NotNull(message = "project.estimate.sheet.detail.count.not_null")
    @Min(value = 0, message = "project.estimate.sheet.detail.count.positive")
    private Integer count;

    @NotNull(message = "project.estimate.sheet.detail.unit_price.not_null")
    @Min(value = 0, message = "project.estimate.sheet.detail.unit_price.positive")
    private Long unitPrice;

    @NotNull(message = "project.estimate.sheet.detail.total_price.not_null")
    @Min(value = 0, message = "project.estimate.sheet.detail.total_price.positive")
    private Long totalPrice;

    @NotNull(message = "project.estimate.sheet.detail.is_included.not_null")
    private Boolean isIncluded;

    private String note;
}
