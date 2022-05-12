package com.howoocast.hywtl_has.company.controller;

import com.howoocast.hywtl_has.company.parameter.CompanyParameter;
import com.howoocast.hywtl_has.company.parameter.CompanyPredicateBuilder;
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
import java.util.List;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/companies")
    public Page<CompanyListView> page(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        return companyService.page(
            new CompanyPredicateBuilder()
                .keyword(keywordType, keyword)
                .build(),
            pageable
        );
    }

    @GetMapping("/companies/all")
    public List<CompanyView> getList(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword
    ) {
        return companyService.getList(
            new CompanyPredicateBuilder()
                .keywordForModal(keywordType, keyword)
                .build()
        );
    }

    @GetMapping("/companies/{id}")
    public CompanyView get(@PathVariable Long id) {
        return companyService.get(id);
    }

    @PostMapping("/companies")
    public CompanyView add(@Valid @RequestBody CompanyParameter params) {
        return companyService.add(params);
    }

    @PatchMapping("/companies/{id}")
    public CompanyView change(
        @PathVariable Long id,
        @Valid @RequestBody CompanyParameter params
    ) {
        companyService.change(id, params);
        return companyService.get(id);
    }
}
