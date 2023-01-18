package com.howoocast.hywtl_has.project_estimate.parameter;

import com.howoocast.hywtl_has.file.parameter.FileItemParameter;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectCustomEstimate;
import com.howoocast.hywtl_has.project_estimate.domain.ProjectEstimateType;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class ProjectCustomEstimateAddParameter {

    @NotNull(message = ProjectCustomEstimate.KEY + ".is_sent.not_null")
    private Boolean isSent;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sentDate;

    @NotBlank(message = ProjectCustomEstimate.KEY + ".recipient.not_blank")
    private String recipient;

    @NotNull(message = ProjectCustomEstimate.KEY + ".business.not_null")
    private Long businessId;

    private String note;

    private FileItemParameter file;

    @NotNull(message = ProjectCustomEstimate.KEY + ".type.not_null")
    private ProjectEstimateType type;

    private Boolean hasExperimentInfo;

}
