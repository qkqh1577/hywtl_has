package com.howoocast.hywtl_has.estimate_content.controller;

import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentAddParameter;
import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentChangeParameter;
import com.howoocast.hywtl_has.estimate_content.parameter.EstimateContentPredicateBuilder;
import com.howoocast.hywtl_has.estimate_content.service.EstimateContentService;
import com.howoocast.hywtl_has.estimate_content.view.EstimateContentShortView;
import com.howoocast.hywtl_has.estimate_content.view.EstimateContentVariableView;
import com.howoocast.hywtl_has.estimate_content.view.EstimateContentView;
import com.howoocast.hywtl_has.estimate_template.domain.TestType;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class EstimateContentController {

    private final EstimateContentService service;

    @GetMapping("/admin/estimate-content")
    public List<EstimateContentShortView> list(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String keywordType,
        @RequestParam(required = false, name = "testType") List<TestType> testTypeList
    ) {
        return EstimateContentMapper.toShort(
            service.list(
                new EstimateContentPredicateBuilder(
                    keyword,
                    keywordType,
                    testTypeList
                ).build()
            )
        );
    }

    @GetMapping("/admin/estimate-content/variable")
    public List<EstimateContentVariableView> variableList() {
        return EstimateContentMapper.toVariableView(
            service.variableList()
        );
    }

    @GetMapping("/admin/estimate-content/{id}")
    public EstimateContentView get(
        @PathVariable Long id
    ) {
        return EstimateContentMapper.toView(
            service.get(id)
        );
    }

    @PutMapping("/admin/estimate-content")
    public void add(
        @Valid @RequestBody EstimateContentAddParameter parameter
    ) {
        service.add(parameter);
    }

    @PutMapping("/admin/estimate-content/{id}")
    public void upsert(
        @PathVariable Long id,
        @Valid @RequestBody EstimateContentChangeParameter parameter
    ) {
        service.change(id, parameter);
    }

    @DeleteMapping("/admin/estimate-content/{id}")
    public void delete(
        @PathVariable Long id
    ) {
        service.delete(id);
    }
}
