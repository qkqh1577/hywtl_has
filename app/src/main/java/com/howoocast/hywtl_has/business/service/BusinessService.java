package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.exception.BusinessDeleteException;
import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.parameter.BusinessRegistrationNumberCheckParameter;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.business.view.BusinessShortView;
import com.howoocast.hywtl_has.business.view.BusinessView;
import com.howoocast.hywtl_has.common.exception.DuplicatedValueException;
import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository repository;

    @Transactional(readOnly = true)
    public Page<BusinessShortView> page(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(BusinessShortView::assemble);
    }

    @Transactional(readOnly = true)
    public List<BusinessView> getList(@Nullable Predicate predicate) {
        Pageable pageable = Pageable.ofSize(Integer.MAX_VALUE);
        return Optional.ofNullable(predicate)
            .map(p -> repository.findAll(p, pageable))
            .orElse(repository.findAll(pageable))
            .map(BusinessView::assemble)
            .getContent();
    }

    @Transactional(readOnly = true)
    public BusinessView get(Long id) {
        return BusinessView.assemble(this.load(id));
    }

    @Transactional(readOnly = true)
    public void checkRegistrationNumber(BusinessRegistrationNumberCheckParameter params) {
        this.checkRegistrationNumber(params.getRegistrationNumber(), params.getId());
    }

    @Transactional
    public BusinessView add(BusinessParameter params) {
        this.checkRegistrationNumber(params.getRegistrationNumber(), null);

        List<BusinessManager> managerList = Optional.ofNullable(params.getManagerList())
            .map(list -> list.stream()
                .map(manager -> BusinessManager.of(
                    manager.getName(),
                    manager.getJobTitle(),
                    manager.getMobilePhone(),
                    manager.getOfficePhone(),
                    manager.getEmail(),
                    manager.getMeta(),
                    manager.getStatus()))
                .collect(Collectors.toList())
            ).orElse(Collections.emptyList());

        Business business = Business.of(
            params.getName(),
            params.getRepresentativeName(),
            params.getRegistrationNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getOfficePhone(),
            params.getMemo(),
            managerList
        );

        return BusinessView.assemble(repository.save(business));
    }

    @Transactional
    public void change(Long id, BusinessParameter params) {
        this.checkRegistrationNumber(params.getRegistrationNumber(), id);

        Business business = this.load(id);

        List<BusinessManager> managerList = Optional.ofNullable(params.getManagerList())
            .map(managerParameterList -> managerParameterList.stream()
                .map(managerParameter -> {
                    if (Objects.isNull(managerParameter.getId())) {
                        return BusinessManager.of(
                            managerParameter.getName(),
                            managerParameter.getJobTitle(),
                            managerParameter.getMobilePhone(),
                            managerParameter.getOfficePhone(),
                            managerParameter.getEmail(),
                            managerParameter.getMeta(),
                            managerParameter.getStatus()
                        );
                    }
                    BusinessManager manager = business.getManagerList().stream()
                        .filter(item -> item.getId().equals(managerParameter.getId()))
                        .findFirst()
                        .orElseThrow(() -> new NotFoundException("business-manager", managerParameter.getId()));
                    manager.change(
                        managerParameter.getName(),
                        managerParameter.getJobTitle(),
                        managerParameter.getMobilePhone(),
                        managerParameter.getOfficePhone(),
                        managerParameter.getEmail(),
                        managerParameter.getMeta(),
                        managerParameter.getStatus()
                    );
                    return manager;
                })
                .collect(Collectors.toList())
            ).orElse(Collections.emptyList());

        business.change(
            params.getName(),
            params.getRepresentativeName(),
            params.getRegistrationNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getOfficePhone(),
            params.getMemo(),
            managerList
        );
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(instance -> {
            if (!instance.getManagerList().isEmpty()) {
                throw new BusinessDeleteException();
            }
            repository.deleteById(instance.getId());
        });
    }

    private Business load(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("business", id));
    }

    private void checkRegistrationNumber(String registrationNumber, @Nullable Long id) {
        repository.findByRegistrationNumber(registrationNumber).ifPresent((instance) -> {
            if (Objects.isNull(id) || !Objects.equals(instance.getId(), id)) {
                throw new DuplicatedValueException("business", "registration-number", registrationNumber);
            }
        });
    }
}


