package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.common.parameter.CustomIdParameter;
import com.howoocast.hywtl_has.common.service.ValidationGroup.OnAdd;
import com.howoocast.hywtl_has.common.service.ValidationGroup.OnEdit;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectEstimateSheetTestServiceParameter extends CustomIdParameter {

    @NotNull(message = "project.estimate.sheet.test_service.id.not_null", groups = OnEdit.class)
    private Long id;

    @NotBlank(message = "project.estimate.sheet.test_service.title.not_blank", groups = OnAdd.class)
    private String title;

    @NotEmpty(message = "project.estimate.sheet.test_service.detail_list.not_empty")
    private List<ProjectEstimateSheetTestServiceDetailParameter> detailList;

    @NotNull(message = "project.estimate.sheet.test_service.seq.not_null", groups = OnAdd.class)
    private Integer seq;
}
