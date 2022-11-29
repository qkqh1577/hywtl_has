package com.howoocast.hywtl_has.business.controller;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.parameter.BusinessManagerPredicateBuilder;
import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.parameter.BusinessPredicateBuilder;
import com.howoocast.hywtl_has.business.service.BusinessService;
import com.howoocast.hywtl_has.business.view.BusinessManagerShortView;
import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.business.view.BusinessView;
import com.howoocast.hywtl_has.project.view.ProjectShortView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        Page<Business> businessList = businessService.findAll(
            new BusinessPredicateBuilder()
                .keyword(keywordType, keyword)
                .build(),
            pageable
        );
        return BusinessMapper.toShortView(businessList);
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

    @GetMapping("/business/{id}/manager-list")
    public List<BusinessManagerShortView> getManagerList(@PathVariable Long id) {
        return businessService.get(id).getManagerList().stream()
            .map(BusinessManagerShortView::assemble)
            .collect(Collectors.toList());
    }

    @GetMapping("/business/{id}/manager/all")
    public List<BusinessManagerShortView> getManagerList(
        @PathVariable Long id,
        @RequestParam(required = false) String keywordTypeOfManager,
        @RequestParam(required = false) String keywordOfManager
    ) {
        return businessService.findAllManager(
                new BusinessManagerPredicateBuilder()
                    .keyword(id, keywordTypeOfManager, keywordOfManager).build())
            .stream()
            .map(BusinessManagerShortView::assemble)
            .collect(Collectors.toList());
    }

    @GetMapping("/business/manager/{id}/project-list")
    public List<ProjectShortView> getProjectList(@PathVariable Long id) {
        return businessService.getProjectList(id);
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
