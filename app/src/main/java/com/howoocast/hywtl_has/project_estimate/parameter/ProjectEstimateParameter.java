package com.howoocast.hywtl_has.project_estimate.parameter;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectEstimateParameter {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate receivedDate;

    private String figureLevel;

    private String testLevel;

    private String reportLevel;
}
