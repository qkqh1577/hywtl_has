package com.howoocast.hywtl_has.project.parameter;

import java.time.LocalDate;
import javax.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectOrderParameter {

    @Min(value = 0, message = "project-order.amount.positive")
    private Long amount;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate receivedDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate beginDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate closeDate;

    private Boolean isOnGoing;
}
