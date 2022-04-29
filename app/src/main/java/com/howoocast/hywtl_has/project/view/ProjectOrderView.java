package com.howoocast.hywtl_has.project.view;

import com.howoocast.hywtl_has.project.domain.ProjectOrder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectOrderView {

    private Long amount;

    private LocalDate receivedDate;

    private LocalDate beginDate;

    private LocalDate closeDate;

    private Boolean isOnGoing;

    private LocalDateTime updatedTime;

    public static ProjectOrderView assemble(@Nullable ProjectOrder source) {
        ProjectOrderView target = new ProjectOrderView();
        if (Objects.isNull(source)) {
            return target;
        }

        target.amount = source.getAmount();
        target.receivedDate = source.getReceivedDate();
        target.beginDate = source.getBeginDate();
        target.closeDate = source.getCloseDate();
        target.isOnGoing = source.getIsOnGoing();
        target.updatedTime = source.getUpdatedTime();
        return target;
    }
}
