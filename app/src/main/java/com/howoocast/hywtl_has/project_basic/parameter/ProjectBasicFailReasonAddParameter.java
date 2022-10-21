package com.howoocast.hywtl_has.project_basic.parameter;

import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicFailReason;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectBasicFailReasonAddParameter {

    @NotNull(message = ProjectBasicFailReason.KEY + ".win_id.not_null")
    private Long winId;

    @NotNull(message = ProjectBasicFailReason.KEY + ".test_amount.not_null")
    private Long testAmount;

    @NotNull(message = ProjectBasicFailReason.KEY + ".review_amount.not_null")
    private Long reviewAmount;

    @NotNull(message = ProjectBasicFailReason.KEY + ".total_amount.not_null")
    private Long totalAmount;

    @NotBlank(message = ProjectBasicFailReason.KEY + ".expected_duration.not_blank")
    private String expectedDuration;

    @NotBlank(message = ProjectBasicFailReason.KEY + ".reason.not_blank")
    private String reason;
}
