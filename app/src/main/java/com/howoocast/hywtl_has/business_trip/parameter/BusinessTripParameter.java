package com.howoocast.hywtl_has.business_trip.parameter;

import com.howoocast.hywtl_has.business_trip.domain.BusinessTripCounterpart;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripExpanse;
import com.howoocast.hywtl_has.department.view.DepartmentShortView;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.view.UserShortView;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BusinessTripParameter {

    private String tripNumber;
    private String reporter;
    private LocalDateTime reportDate;
    private String approver1;
    private String approver2;
    private String approver3;

    @NotNull(message = "business_trip.departmentId.not_null")
    private Long departmentId;
    private LocalDateTime tripDateFrom;
    private LocalDateTime tripDateTo;

    @NotNull(message = "business_trip.projectId.not_null")
    private Long projectId;
    private String location;
    private List<Long> accompanyIds;
    private String purpose;
    private BusinessTripCounterpartParameter counterpart;
    private String contents;
    private String etc;
    private String followUp;
    private BusinessTripExpanseParameter expanse;

}
