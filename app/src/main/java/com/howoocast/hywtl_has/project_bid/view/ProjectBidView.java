package com.howoocast.hywtl_has.project_bid.view;

import com.howoocast.hywtl_has.business.view.BusinessView;
import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.Getter;

@Getter
public class ProjectBidView {

    private LocalDate beginDate;
    private LocalDate closeDate;
    private BusinessView win;
    private String bidOrganization;
    private LocalDate bidDate;
    private Long testAmount;
    private Long reviewAmount;
    private Long totalAmount;
    private String expectedDuration;

    private LocalDateTime modifiedAt;

    public static ProjectBidView assemble(ProjectBid source) {
        ProjectBidView target = new ProjectBidView();
        target.beginDate = source.getBeginDate();
        target.closeDate = source.getCloseDate();
        if (Objects.nonNull(source.getWin())) {
            target.win = BusinessView.assemble(source.getWin());
        }
        target.bidOrganization = source.getBidOrganization();
        target.bidDate = source.getBidDate();
        target.testAmount = source.getTestAmount();
        target.reviewAmount = source.getReviewAmount();
        target.totalAmount = source.getTotalAmount();
        target.expectedDuration = source.getExpectedDuration();
        target.modifiedAt = Optional.ofNullable(source.getModifiedAt()).orElse(source.getCreatedAt());

        return target;
    }
}
