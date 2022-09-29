package com.howoocast.hywtl_has.business_trip.controller;

import com.howoocast.hywtl_has.business.service.BusinessService;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTrip;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripCounterpart;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripExpanse;
import com.howoocast.hywtl_has.business_trip.parameter.BusinessTripParameter;
import com.howoocast.hywtl_has.business_trip.service.BusinessTripService;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class BusinessTripController {

    private final BusinessTripService businessTripService;

    @PostMapping("/business-trip")
    public void add(@Valid @RequestBody BusinessTripParameter parameter) {
        BusinessTrip businessTrip = BusinessTrip.of(
                parameter.getTripNumber(),
                parameter.getReporter(),
                parameter.getReportDate(),
                parameter.getApprover1(),
                parameter.getApprover2(),
                parameter.getApprover3(),
                Department.of(parameter.getDepartmentId()),
                parameter.getTripDateFrom(),
                parameter.getTripDateTo(),
                Project.of(parameter.getProjectId()),
                parameter.getLocation(),
                parameter.getAccompanyIds().stream().map(User::of).collect(Collectors.toList()),
                parameter.getPurpose(),
                BusinessTripCounterpart.of(
                        parameter.getCounterpart().getCompanyName(),
                        parameter.getCounterpart().getDepartment(),
                        parameter.getCounterpart().getRank(),
                        parameter.getCounterpart().getName()
                ),
                parameter.getContents(),
                parameter.getEtc(),
                parameter.getFollowUp(),
                BusinessTripExpanse.of(
                        parameter.getExpanse().getDistance(),
                        parameter.getExpanse().getDistanceComment(),
                        parameter.getExpanse().getAccommodationFee(),
                        parameter.getExpanse().getAccommodationFeeComment(),
                        parameter.getExpanse().getTransportationFee(),
                        parameter.getExpanse().getTransportationFeeComment(),
                        parameter.getExpanse().getExtraFee(),
                        parameter.getExpanse().getExtraFeeComment()
                )
        );
        businessTripService.add(businessTrip);
    }

}
