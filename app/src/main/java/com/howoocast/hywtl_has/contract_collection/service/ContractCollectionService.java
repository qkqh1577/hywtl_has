package com.howoocast.hywtl_has.contract_collection.service;

import com.howoocast.hywtl_has.contract_collection.domain.ContractCollection;
import com.howoocast.hywtl_has.contract_collection.domain.ContractCollectionStage;
import com.howoocast.hywtl_has.contract_collection.parameter.ContractCollectionParameter;
import com.howoocast.hywtl_has.contract_collection.repository.ContractCollectionRepository;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractCollectionService {


    private final ContractCollectionRepository repository;

    @Transactional(readOnly = true)
    public ContractCollection get() {
        return this.load();
    }

    @Transactional
    public void upsert(ContractCollectionParameter parameter) {
        ContractCollection instance = this.load();

        List<ContractCollectionStage> stageList =
            Optional.ofNullable(parameter.getStageList())
                .map(List::stream)
                .map(list -> list.map(stage -> ContractCollectionStage.of(
                    stage.getName(),
                    stage.getRate(),
                    stage.getNote(),
                    stage.getExpectedDate()
                )))
                .map(stream -> stream.collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        instance.change(
            stageList,
            parameter.getTotalAmountNote()
        );

        if (Objects.isNull(instance.getId())) {
            repository.save(instance);
        }
    }

    private ContractCollection load() {
        return repository.findTop1By().orElse(ContractCollection.of());
    }
}
