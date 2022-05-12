package com.howoocast.hywtl_has.project_estimate.view;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimate;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class ProjectEstimateView {

    private LocalDate receivedDate;

    private String figureLevel;

    private String testLevel;

    private String reportLevel;

    private LocalDateTime modifiedAt;

    public static ProjectEstimateView assemble(@Nullable ProjectEstimate source) {
        ProjectEstimateView target = new ProjectEstimateView();
        if (Objects.isNull(source)) {
            return target;
        }
        target.receivedDate = source.getReceivedDate();
        target.figureLevel = source.getFigureLevel();
        target.testLevel = source.getTestLevel();
        target.reportLevel = source.getReportLevel();
        target.modifiedAt = source.getModifiedAt();
        return target;
    }
}
