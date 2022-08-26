package com.howoocast.hywtl_has.estimate_template.controller;

import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import com.howoocast.hywtl_has.estimate_template.parameter.EstimateTemplateChangeSeqParameter;
import com.howoocast.hywtl_has.estimate_template.parameter.EstimateTemplateParameter;
import com.howoocast.hywtl_has.estimate_template.parameter.EstimateTemplatePredicateBuilder;
import com.howoocast.hywtl_has.estimate_template.service.EstimateTemplateService;
import com.howoocast.hywtl_has.estimate_template.view.EstimateTemplateShortView;
import com.howoocast.hywtl_has.estimate_template.view.EstimateTemplateView;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class EstimateTemplateController {

    private final EstimateTemplateService service;


    @GetMapping("/estimate-template")
    public List<EstimateTemplateShortView> getList(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false, name = "testType[]") List<TestType> testTypeList
    ) {
        return service.getList(
            new EstimateTemplatePredicateBuilder()
                .keyword(keywordType, keyword)
                .testTypeIn(testTypeList)
                .build()
        );
    }

    @SuppressWarnings("unused")
    @GetMapping(value = "/estimate-template", params = "type")
    public List<EstimateTemplateView> getFullList(
        @RequestParam String type,
        @RequestParam(required = false, name = "testType[]") List<TestType> testTypeList
    ) {
        return service.getFullList(
            new EstimateTemplatePredicateBuilder()
                .testTypeIn(testTypeList)
                .build()
        );
    }

    @GetMapping("/estimate-template/{id}")
    public EstimateTemplateView getOne(@PathVariable Long id) {
        return service.getOne(id);
    }

    @PostMapping("/estimate-template")
    public EstimateTemplateView add(@Valid @RequestBody EstimateTemplateParameter parameter) {
        return service.add(parameter);
    }

    @PostMapping("/estimate-template/seq")
    public void changeSeq(@Valid @RequestBody EstimateTemplateChangeSeqParameter parameter) {
        service.changeSeq(parameter);
    }

    @PatchMapping("/estimate-template/{id}")
    public void change(@PathVariable Long id, @Valid @RequestBody EstimateTemplateParameter parameter) {
        service.change(id, parameter);
    }
}
