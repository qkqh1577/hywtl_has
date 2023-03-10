package com.howoocast.hywtl_has.personnel.controller;

import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelPredicateBuilder;
import com.howoocast.hywtl_has.personnel.service.PersonnelService;
import com.howoocast.hywtl_has.personnel.view.PersonnelAcademicView;
import com.howoocast.hywtl_has.personnel.view.PersonnelBasicView;
import com.howoocast.hywtl_has.personnel.view.PersonnelCareerView;
import com.howoocast.hywtl_has.personnel.view.PersonnelCompanyView;
import com.howoocast.hywtl_has.personnel.view.PersonnelJobView;
import com.howoocast.hywtl_has.personnel.view.PersonnelLanguageView;
import com.howoocast.hywtl_has.personnel.view.PersonnelLicenceView;
import com.howoocast.hywtl_has.personnel.view.PersonnelShortView;
import com.howoocast.hywtl_has.personnel.view.PersonnelView;
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

    @GetMapping("/personnel")
    public Page<PersonnelShortView> page(
        @RequestParam(required = false, name = "sex") List<String> sexList,
        @RequestParam(required = false, name = "hiredType") List<String> hiredTypeList,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false, name = "status") List<String> statusList,
        @RequestParam(required = false, name = "departmentId") List<Long> departmentIdList,
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
        ).map(PersonnelShortView::assemble);
    }

    @GetMapping(value = "/personnel", params = "userId")
    public PersonnelView getByUserId(@RequestParam Long userId) {
        return PersonnelView.assemble(personnelService.getByUserId(userId));
    }

    @GetMapping("/personnel/{id}")
    public PersonnelView get(
        @PathVariable Long id
    ) {
        return PersonnelView.assemble(personnelService.get(id));
    }

    @GetMapping("/personnel/{id}/basic")
    public PersonnelBasicView basic(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getBasic();
    }

    @GetMapping("/personnel/{id}/company")
    public PersonnelCompanyView company(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getCompany();
    }

    @GetMapping("/personnel/{id}/job")
    public PersonnelJobView job(@PathVariable Long id) {
        List<PersonnelJobView> jobList = PersonnelView.assemble(personnelService.get(id)).getJobList();
        return jobList.stream().filter(PersonnelJobView::getIsRepresentative)
            .findFirst()
            .orElse(jobList.get(0));
    }

    @GetMapping("/personnel/{id}/job-list")
    public List<PersonnelJobView> jobList(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getJobList();
    }

    @GetMapping(value = "/personnel/job-list", params = "userId")
    public List<PersonnelJobView> jobListByUserId(@RequestParam Long userId) {
        return PersonnelView.assemble(personnelService.getByUserId(userId)).getJobList();
    }

    @GetMapping("/personnel/{id}/academic-list")
    public List<PersonnelAcademicView> academicList(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getAcademicList();
    }

    @GetMapping("/personnel/{id}/career-list")
    public List<PersonnelCareerView> careerList(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getCareerList();
    }

    @GetMapping("/personnel/{id}/licence-list")
    public List<PersonnelLicenceView> licenceList(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getLicenceList();
    }

    @GetMapping("/personnel/{id}/language-list")
    public List<PersonnelLanguageView> languageList(@PathVariable Long id) {
        return PersonnelView.assemble(personnelService.get(id)).getLanguageList();
    }

    @PutMapping("/personnel/{id}")
    public void update(
        @PathVariable Long id,
        @Valid @ModelAttribute PersonnelParameter parameter
    ) {
        personnelService.change(id, parameter);
    }
}
