package com.howoocast.hywtl_has.contract_collection.controller;

import com.howoocast.hywtl_has.contract_collection.parameter.ContractCollectionParameter;
import com.howoocast.hywtl_has.contract_collection.service.ContractCollectionService;
import com.howoocast.hywtl_has.contract_collection.view.ContractCollectionView;
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
public class ContractCollectionController {


    private final ContractCollectionService service;

    @GetMapping("/admin/contract/collection")
    public ContractCollectionView get() {
        return ContractCollectionView.assemble(service.get());
    }

    @PutMapping("/admin/contract/collection")
    public void upsert(
        @Valid @RequestBody ContractCollectionParameter parameter
    ) {
        service.upsert(parameter);
    }
}
