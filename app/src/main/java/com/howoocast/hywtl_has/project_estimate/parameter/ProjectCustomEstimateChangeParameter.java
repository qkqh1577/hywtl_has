package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectCustomEstimateChangeParameter {

    @NotNull(message = ProjectCustomEstimate.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sentDate;
    @NotBlank(message = ProjectCustomEstimate.KEY + ".recipient.not_blank")
    private String recipient;

    @NotNull(message = ProjectCustomEstimate.KEY + ".business.not_null")
    private Long businessId;

    private String note;

    private Boolean isLh;
}
