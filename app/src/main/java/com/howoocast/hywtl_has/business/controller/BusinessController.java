package com.howoocast.hywtl_has.business.controller;

import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.parameter.BusinessPredicateBuilder;
import com.howoocast.hywtl_has.business.service.BusinessService;
import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.business.view.BusinessView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
    public Page<BusinessShortView> page(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable
    ) {
        return BusinessMapper.toShortView(
            businessService.findAll(
                new BusinessPredicateBuilder()
                    .keyword(keywordType, keyword)
                    .build(),
                pageable
            )
        );
    }

    @GetMapping(value = "/business", params = "registrationNumber")
    public List<BusinessShortView> getList(
        @RequestParam String registrationNumber
    ) {
        return BusinessMapper.toShortView(
            businessService.findByRegistrationNumber(registrationNumber)
        );
    }

    @GetMapping("/business/all")
    public List<BusinessView> getList(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword
    ) {
        return BusinessMapper.toView(
            businessService.findAll(
                new BusinessPredicateBuilder()
                    .keywordForModal(keywordType, keyword)
                    .build()
            )
        );
    }

    @GetMapping("/business/{id}")
    public BusinessView get(@PathVariable Long id) {
        return BusinessMapper.toView(businessService.get(id));
    }

    @PutMapping({"/business", "/business/{id}"})
    public void upsert(
        @PathVariable(required = false) Long id,
        @Valid @RequestBody BusinessParameter parameter
    ) {
        businessService.upsert(id, parameter);
    }

    @DeleteMapping("/business/{id}")
    public void delete(@PathVariable Long id) {
        businessService.delete(id);
    }
}
