package com.howoocast.hywtl_has.contract_condition.controller;

import com.howoocast.hywtl_has.contract_condition.domain.ContractConditionVariable;
import com.howoocast.hywtl_has.contract_condition.parameter.ContractConditionParameter;
import com.howoocast.hywtl_has.contract_condition.service.ContractConditionService;
import com.howoocast.hywtl_has.contract_condition.view.ContractConditionVariableView;
import com.howoocast.hywtl_has.contract_condition.view.ContractConditionView;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class ContractConditionController {


    private final ContractConditionService service;

    @GetMapping("/admin/contract-condition")
    public ContractConditionView get() {
        return ContractConditionView.assemble(service.getList());
    }

    @GetMapping("/admin/contract-condition/variable")
    public List<ContractConditionVariableView> getVariableList() {

        return ContractConditionVariable.list().stream().map(ContractConditionVariableView::assemble)
            .collect(Collectors.toList());
    }

    @PutMapping("/admin/contract-condition")
    public void upsert(
        @Valid @RequestBody ContractConditionParameter parameter
    ) {
        service.upsert(parameter);
    }
}
