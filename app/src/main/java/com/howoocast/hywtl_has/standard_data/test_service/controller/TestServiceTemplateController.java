package com.howoocast.hywtl_has.standard_data.test_service.controller;

import com.howoocast.hywtl_has.standard_data.test_service.parameter.TestServiceTemplateChangeSeqParameter;
import com.howoocast.hywtl_has.standard_data.test_service.parameter.TestServiceTemplateParameter;
import com.howoocast.hywtl_has.standard_data.test_service.parameter.TestServiceTemplatePredicateBuilder;
import com.howoocast.hywtl_has.standard_data.test_service.service.TestServiceTemplateService;
import com.howoocast.hywtl_has.standard_data.test_service.view.TestServiceTemplateListView;
import com.howoocast.hywtl_has.standard_data.test_service.view.TestServiceTemplateView;
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
public class TestServiceTemplateController {

    private final TestServiceTemplateService service;

    @GetMapping("/standard-data/test-service-templates")
    public List<TestServiceTemplateListView> getList(
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false, name = "testType[]") List<String> testTypeList
    ) {
        return service.getList(
            new TestServiceTemplatePredicateBuilder()
                .keyword(keywordType, keyword)
                .testTypeIn(testTypeList)
                .build()
        );
    }

    @SuppressWarnings("unused")
    @GetMapping(value = "/standard-data/test-service-templates", params = "type")
    public List<TestServiceTemplateView> getFullList(
        @RequestParam String type,
        @RequestParam(required = false, name = "testType[]") List<String> testTypeList
    ) {
        return service.getFullList(
            new TestServiceTemplatePredicateBuilder()
                .testTypeIn(testTypeList)
                .build()
        );
    }

    @GetMapping("/standard-data/test-service-templates/{id}")
    public TestServiceTemplateView getOne(@PathVariable Long id) {
        return service.getOne(id);
    }

    @PostMapping("/standard-data/test-service-templates")
    public TestServiceTemplateView add(@Valid @RequestBody TestServiceTemplateParameter params) {
        return service.add(params);
    }

    @PostMapping("/standard-data/test-service-templates/seq/change")
    public void changeSeq(@Valid @RequestBody TestServiceTemplateChangeSeqParameter params) {
        service.changeSeq(params);
    }

    @PatchMapping("/standard-data/test-service-templates/{id}")
    public void change(@PathVariable Long id, @Valid @RequestBody TestServiceTemplateParameter params) {
        service.change(id, params);
    }
}
