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
    private Boolean resetReceptionManagerId;

    private Long salesManagerId;
    private Boolean resetSalesManagerId;

    private Long projectManagerId;
    private Boolean resetProjectManagerId;

    private LocalDate expectedMonth;
    private Boolean resetExpectedMonth;

    private LocalDate requestedMonth;
    private Boolean resetRequestedMonth;

    private Boolean isLh;

    private Boolean isFavorite;
}
