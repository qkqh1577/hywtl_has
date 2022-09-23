package com.howoocast.hywtl_has.personnel.controller;

import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelPredicateBuilder;
import com.howoocast.hywtl_has.personnel.service.PersonnelService;
import com.howoocast.hywtl_has.personnel.view.PersonnelAcademicView;
import com.howoocast.hywtl_has.personnel.view.PersonnelBasicView;
import com.howoocast.hywtl_has.personnel.view.PersonnelCareerView;
import com.howoocast.hywtl_has.personnel.view.PersonnelCompanyView;
import com.howoocast.hywtl_has.personnel.view.PersonnelJobView;
import com.howoocast.hywtl_has.personnel.view.PersonnelLicenseView;
import com.howoocast.hywtl_has.personnel.view.PersonnelShortView;
import java.time.LocalDate;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class PersonnelController {

    private final PersonnelService personnelService;

    @GetMapping("/personnels")
    public Page<PersonnelShortView> page(
        @RequestParam(required = false, name = "sex[]") List<String> sexList,
        @RequestParam(required = false, name = "hiredType[]") List<String> hiredTypeList,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false, name = "status[]") List<String> statusList,
        @RequestParam(required = false, name = "departmentId[]") List<Long> departmentIdList,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
        @RequestParam(required = false) String dateType,
        Pageable pageable
    ) {
        return personnelService.page(
            new PersonnelPredicateBuilder()
                .sex(sexList)
                .hiredType(hiredTypeList)
                .keyword(keywordType, keyword)
                .status(statusList)
                .department(departmentIdList)
                .date(dateType, startDate, endDate)
                .build(),
            pageable
        );
    }

    @GetMapping("/personnels/{id}/basic")
    public PersonnelBasicView basic(@PathVariable Long id) {
        return personnelService.get(id).getBasic();
    }

    @GetMapping("/personnels/{id}/company")
    public PersonnelCompanyView company(@PathVariable Long id) {
        return personnelService.get(id).getCompany();
    }

    @GetMapping("/personnels/{id}/job")
    public PersonnelJobView job(@PathVariable Long id) {
        return personnelService.get(id).getJobList().get(0);
    }

    @GetMapping("/personnels/{id}/job-list")
    public List<PersonnelJobView> jobList(@PathVariable Long id) {
        return personnelService.get(id).getJobList();
    }

    @GetMapping("/personnels/{id}/academic-list")
    public List<PersonnelAcademicView> academicList(@PathVariable Long id) {
        return personnelService.get(id).getAcademicList();
    }

    @GetMapping("/personnels/{id}/career-list")
    public List<PersonnelCareerView> careerList(@PathVariable Long id) {
        return personnelService.get(id).getCareerList();
    }

    @GetMapping("/personnels/{id}/license-list")
    public List<PersonnelLicenseView> licenseList(@PathVariable Long id) {
        return personnelService.get(id).getLicenseList();
    }

    @GetMapping("/personnels/{id}/language-list")
    public List<PersonnelLicenseView> languageList(@PathVariable Long id) {
        return personnelService.get(id).getLicenseList();
    }

    @PutMapping("/personnels/{id}")
    public void update(
        @PathVariable Long id,
        @Valid @ModelAttribute PersonnelParameter parameter
    ) {
        personnelService.change(id, parameter);
    }
}
