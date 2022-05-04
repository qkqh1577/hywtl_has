package com.howoocast.hywtl_has.company.controller;

import com.howoocast.hywtl_has.company.parameter.CompanyAddParameter;
import com.howoocast.hywtl_has.company.service.CompanyService;
import com.howoocast.hywtl_has.company.view.CompanyListView;
import com.howoocast.hywtl_has.company.view.CompanyView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/companies")
    public Page<CompanyListView> page(Pageable pageable) {
        return companyService.page(pageable);
    }

    @GetMapping("/companies/{id}")
    public CompanyView get(@PathVariable Long id) {
        return companyService.get(id);
    }

    @PostMapping("/companies")
    public CompanyView add(@Valid @RequestBody CompanyAddParameter params) {
        return companyService.add(params);
    }
}
