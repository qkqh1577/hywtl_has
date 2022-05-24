package com.howoocast.hywtl_has.project_estimate.parameter;

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
public class ProjectEstimateSheetTestServiceParameter {

    @NotNull(message = "project.estimate.sheet.test-service.id.not-null", groups = OnEdit.class)
    private Long id;

    @NotBlank(message = "project.estimate.sheet.test-service.title.not-blank", groups = OnAdd.class)
    private String title;

    @NotEmpty(message = "project.estimate.sheet.test-service.detail-list.not-empty")
    private List<ProjectEstimateSheetTestServiceDetailParameter> detailList;

    @NotNull(message = "project.estimate.sheet.test-service.seq.not-null", groups = OnAdd.class)
    private Integer seq;
}
