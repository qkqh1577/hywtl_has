package com.howoocast.hywtl_has.business.controller;

import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.parameter.BusinessPredicateBuilder;
import com.howoocast.hywtl_has.business.parameter.BusinessRegistrationNumberCheckParameter;
import com.howoocast.hywtl_has.business.service.BusinessService;
import com.howoocast.hywtl_has.business.view.BusinessListView;
import com.howoocast.hywtl_has.business.view.BusinessView;
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
public class BusinessController {

    private final BusinessService businessService;

    @GetMapping("/business")
    public Page<BusinessListView> page(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        Pageable pageable
    ) {
        return businessService.page(
            new BusinessPredicateBuilder()
                .keyword(keywordType, keyword)
                .build(),
            pageable
        );
    }

    @GetMapping("/business/all")
    public List<BusinessView> getList(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword
    ) {
        return businessService.getList(
            new BusinessPredicateBuilder()
                .keywordForModal(keywordType, keyword)
                .build()
        );
    }

    @GetMapping("/business/{id}")
    public BusinessView get(@PathVariable Long id) {
        return businessService.get(id);
    }

    @PostMapping("/business")
    public BusinessView add(@Valid @RequestBody BusinessParameter params) {
        return businessService.add(params);
    }


    @PostMapping("/business/registration-number/check")
    public void checkRegistrationNumber(
        @Valid @RequestBody BusinessRegistrationNumberCheckParameter params
    ) {
        businessService.checkRegistrationNumber(params);
    }

    @PatchMapping("/business/{id}")
    public BusinessView change(
        @PathVariable Long id,
        @Valid @RequestBody BusinessParameter params
    ) {
        businessService.change(id, params);
        return businessService.get(id);
    }

    @DeleteMapping("/business/{id}")
    public void delete(@PathVariable Long id) { businessService.delete(id); }
}
