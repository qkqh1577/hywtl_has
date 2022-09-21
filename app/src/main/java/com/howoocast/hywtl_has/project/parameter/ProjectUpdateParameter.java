package com.howoocast.hywtl_has.project.parameter;

import com.howoocast.hywtl_has.project.domain.ProjectBasicBidType;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectUpdateParameter {


    private String alias;

    private String name;

    private ProjectBasicBidType bidType;

    private Long receptionManagerId;

    private Long salesManagerId;

    private Long projectManagerId;

    private LocalDate expectedMonth;

    private LocalDate requestedMonth;

    private Boolean isLh;
}
