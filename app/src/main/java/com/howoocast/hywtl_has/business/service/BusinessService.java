package com.howoocast.hywtl_has.business.service;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.parameter.BusinessParameter;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.business.view.BusinessListView;
import com.howoocast.hywtl_has.business.view.BusinessView;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;

    @Transactional(readOnly = true)
    public Page<BusinessListView> page(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> businessRepository.findAll(p, pageable))
            .orElse(businessRepository.findAll(pageable))
            .map(BusinessListView::assemble);
    }

    @Transactional(readOnly = true)
    public List<BusinessView> getList(@Nullable Predicate predicate) {
        Pageable pageable = Pageable.ofSize(Integer.MAX_VALUE);
        return Optional.ofNullable(predicate)
            .map(p -> businessRepository.findAll(p, pageable))
            .orElse(businessRepository.findAll(pageable))
            .map(BusinessView::assemble)
            .getContent();
    }

    @Transactional(readOnly = true)
    public BusinessView get(Long id) {
        Business business = businessRepository.findById(id).orElseThrow(() -> new NotFoundException("business", id));
        return BusinessView.assemble(business);
    }

    @Transactional
    public BusinessView add(BusinessParameter params) {
        List<BusinessManager> managerList = Optional.ofNullable(params.getManagerList()).map(
            list -> list.stream()
                .map(manager -> BusinessManager.of(
                    manager.getName(),
                    manager.getPosition(),
                    manager.getMobile(),
                    manager.getPhone(),
                    manager.getEmail(),
                    manager.getState()))
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

        return BusinessView.assemble(businessRepository.save(business));
    }

    @Transactional
    public void change(Long id, BusinessParameter params) {
        Business business = businessRepository.findById(id).orElseThrow(() -> new NotFoundException("business", id));
        business.change(
            params.getName(),
            params.getRepresentativeName(),
            params.getRegistrationNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getOfficePhone(),
            params.getMemo(),
            params.getManagerList().stream()
                .map(manager -> BusinessManager.of(
                    manager.getName(),
                    manager.getPosition(),
                    manager.getMobile(),
                    manager.getPhone(),
                    manager.getEmail(),
                    manager.getState()))
                .collect(Collectors.toList())
        );
    }
}


