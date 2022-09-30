package com.howoocast.hywtl_has.business_trip.controller;

import com.howoocast.hywtl_has.business.service.BusinessService;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTrip;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripCounterpart;
import com.howoocast.hywtl_has.business_trip.domain.BusinessTripExpanse;
import com.howoocast.hywtl_has.business_trip.parameter.BusinessTripParameter;
import com.howoocast.hywtl_has.business_trip.service.BusinessTripService;
import com.howoocast.hywtl_has.business_trip.view.BusinessTripView;
import com.howoocast.hywtl_has.department.domain.Department;
import com.howoocast.hywtl_has.project.domain.Project;
import com.howoocast.hywtl_has.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class BusinessTripController {

    private final BusinessTripService businessTripService;

    @GetMapping("/business-trip/all")
    public List<BusinessTripView> getList() {
        return businessTripService.list().stream().map(BusinessTripView::assemble).collect(Collectors.toList());
    }

    @GetMapping("/business-trip/{id}")
    public BusinessTripView get(@PathVariable Long id) {
        return BusinessTripView.assemble(businessTripService.get(id));
    }

    @PostMapping("/business-trip")
    public void add(@Valid @RequestBody BusinessTripParameter parameter) {
        businessTripService.add(parameter);
    }

    @PutMapping("/business-trip/{id}")
    public void update(@PathVariable Long id, @Valid @RequestBody BusinessTripParameter parameter) {
        businessTripService.change(id, parameter);
    }

    @DeleteMapping("/business-trip/{id}")
    public void remove(@PathVariable Long id) {
        businessTripService.remove(id);
    }
}
