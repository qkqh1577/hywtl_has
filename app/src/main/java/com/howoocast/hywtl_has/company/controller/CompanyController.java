package com.howoocast.hywtl_has.company.controller;

import com.howoocast.hywtl_has.company.service.CompanyService;
import com.howoocast.hywtl_has.company.view.CompanyListView;
import com.howoocast.hywtl_has.company.view.CompanyView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
}
