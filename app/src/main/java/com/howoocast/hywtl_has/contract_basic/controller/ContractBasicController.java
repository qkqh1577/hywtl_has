package com.howoocast.hywtl_has.contract_basic.controller;

import com.howoocast.hywtl_has.contract_basic.parameter.ContractBasicParameter;
import com.howoocast.hywtl_has.contract_basic.service.ContractBasicService;
import com.howoocast.hywtl_has.contract_basic.view.ContractBasicView;
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
public class ContractBasicController {


    private final ContractBasicService service;

    @GetMapping("/admin/contract-basic")
    public ContractBasicView get() {
        return ContractBasicView.assemble(service.get());
    }

    @PutMapping("/admin/contract-basic")
    public void upsert(
        @Valid @RequestBody ContractBasicParameter parameter
    ) {
        service.upsert(parameter);
    }
}
