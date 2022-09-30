package com.howoocast.hywtl_has.business_trip.view;

import com.howoocast.hywtl_has.business_trip.domain.BusinessTrip;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripCounterpart;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripExpanse;
import com.howoocast.hywtl_has.department.view.DepartmentShortView;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.project.domain.ProjectBasic;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import com.howoocast.hywtl_has.user.view.UserShortView;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class BusinessTripView {
    private Long id;
    private String tripNumber;
    private String reporter;
    private LocalDateTime reportDate;
    private String approver1;
    private String approver2;
    private String approver3;
    private DepartmentShortView department;
    private LocalDateTime tripDateFrom;
    private LocalDateTime tripDateTo;
    private ProjectShortView project;
    private String location;
    private List<UserShortView> accompany;
    private String purpose;
    private BusinessTripCounterpart counterpart;
    private String contents;
    private String etc;
    private String followUp;
    private BusinessTripExpanse expanse;

    public static BusinessTripView assemble(BusinessTrip source) {
        BusinessTripView target = new BusinessTripView();
        target.id = source.getId();
        target.tripNumber = source.getTripNumber();
        target.reporter = source.getReporter();
        target.reportDate = source.getReportDate();
        target.approver1 = source.getApprover1();
        target.approver2 = source.getApprover2();
        target.approver3 = source.getApprover3();
        target.department = DepartmentShortView.assemble(source.getDepartment());
        target.tripDateFrom = source.getTripDateFrom();
        target.tripDateTo = source.getTripDateTo();
        target.project = ProjectShortView.assemble(source.getProject());
        target.location = source.getLocation();
        target.accompany = source.getAccompany().stream().map(UserShortView::assemble).collect(Collectors.toList());
        target.purpose = source.getPurpose();
        target.counterpart = source.getCounterpart();
        target.contents = source.getContents();
        target.etc = source.getEtc();
        target.followUp = source.getFollowUp();
        target.expanse = source.getExpanse();
        return target;
    }

}
