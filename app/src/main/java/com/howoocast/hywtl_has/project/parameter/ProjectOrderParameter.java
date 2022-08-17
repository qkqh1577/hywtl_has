package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.Project;
import java.time.LocalDate;
import javax.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectOrderParameter {

    @Min(value = 0, message = "project_order.amount.positive")
    private Long amount;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate receivedDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate beginDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate closeDate;

    private Boolean isOnGoing;

    public ProjectChangeOrderBuilder changeOrderBuilder() {
        return new ProjectChangeOrderBuilder(this);
    }

    @RequiredArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ProjectChangeOrderBuilder {

        private final ProjectOrderParameter parameter;

        public void action(Project instance) {
            instance.changeOrder(
                parameter.amount,
                parameter.receivedDate,
                parameter.beginDate,
                parameter.closeDate,
                parameter.isOnGoing
            );
        }

    }
}
