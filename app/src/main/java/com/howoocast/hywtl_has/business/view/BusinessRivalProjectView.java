package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.project_bid.domain.ProjectBid;
import com.howoocast.hywtl_has.rival_bid.domain.RivalBid;
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
        RivalBid rivalBid,
        @Nullable ProjectBid projectBid
    ) {

        BusinessRivalProjectView target = new BusinessRivalProjectView();
        target.id = rivalBid.getProject().getId();
        target.code = rivalBid.getProject().getBasic().getCode();
        target.name = rivalBid.getProject().getBasic().getName();
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
