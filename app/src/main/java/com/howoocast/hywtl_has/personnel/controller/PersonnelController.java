package com.howoocast.hywtl_has.personnel.controller;

import com.howoocast.hywtl_has.personnel.parameter.PersonnelParameter;
import com.howoocast.hywtl_has.personnel.parameter.PersonnelPredicateBuilder;
import com.howoocast.hywtl_has.personnel.service.PersonnelService;
import com.howoocast.hywtl_has.personnel.view.PersonnelListView;
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

    @GetMapping("/personnels")
    public Page<PersonnelListView> page(
        @RequestParam(required = false, name = "sex[]") List<String> sexList,
        @RequestParam(required = false, name = "hiredType[]") List<String> hiredTypeList,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false, name = "keywordType[]") List<String> keywordTypeList,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
        @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
        @RequestParam(required = false, name = "dateType[]") List<String> dateTypeList,
        Pageable pageable
    ) {
        return personnelService.page(
            new PersonnelPredicateBuilder()
                .sex(sexList)
                .hiredType(hiredTypeList)
                .keyword(keywordTypeList, keyword)
                .date(dateTypeList, startDate, endDate)
                .build(),
            pageable
        );
    }

    @GetMapping("/personnels/{id}")
    public PersonnelView get(@PathVariable Long id) {
        return personnelService.get(id);
    }

    @PutMapping("/personnels/{id}")
    public PersonnelView update(
        @PathVariable Long id,
        @Valid @ModelAttribute PersonnelParameter params
    ) {
        personnelService.update(id, params);
        return personnelService.get(id);
    }
}
