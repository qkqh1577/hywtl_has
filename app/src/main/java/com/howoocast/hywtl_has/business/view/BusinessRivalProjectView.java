package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.project_estimate.domain.RivalEstimate;
import java.time.LocalDate;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class BusinessRivalProjectView {

    private Long id;
    private String code;
    private String name;
    private LocalDate beginDate;
    private LocalDate closeDate;
    private BusinessShortView win;

    public static BusinessRivalProjectView assemble(
        RivalEstimate rivalEstimate,
        @Nullable ProjectBid projectBid
    ) {

        BusinessRivalProjectView target = new BusinessRivalProjectView();
        target.id = rivalEstimate.getProject().getId();
        target.code = rivalEstimate.getProject().getBasic().getCode();
        target.name = rivalEstimate.getProject().getBasic().getName();
        if (Objects.nonNull(projectBid)) {
            target.beginDate = projectBid.getBeginDate();
            target.closeDate = projectBid.getCloseDate();
            if (Objects.nonNull(projectBid.getWin())) {
                target.win = BusinessShortView.assemble(projectBid.getWin());
            }
        }

        return target;
    }
}
