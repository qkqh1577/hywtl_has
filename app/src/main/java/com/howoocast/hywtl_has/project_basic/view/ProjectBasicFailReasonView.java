package com.howoocast.hywtl_has.project_basic.view;

import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.project_basic.domain.ProjectBasicFailReason;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import javax.annotation.Nullable;
import lombok.Getter;

@Getter
public class ProjectBasicFailReasonView {

    private BusinessShortView win;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String expectedDuration;
    private String reason;
    private LocalDateTime modifiedAt;

    public static ProjectBasicFailReasonView assemble(@Nullable ProjectBasicFailReason source) {
        ProjectBasicFailReasonView target = new ProjectBasicFailReasonView();
        if (Objects.isNull(source)) {
            return target;
        }
        target.win = BusinessShortView.assemble(source.getWin());
        target.testAmount = source.getTestAmount();
        target.reviewAmount = source.getReviewAmount();
        target.totalAmount = source.getTotalAmount();
        target.expectedDuration = source.getExpectedDuration();
        target.reason = source.getReason();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());
        return target;
    }

}
