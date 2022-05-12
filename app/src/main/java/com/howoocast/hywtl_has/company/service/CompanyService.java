package com.howoocast.hywtl_has.company.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.company.domain.Company;
import com.howoocast.hywtl_has.company.domain.Manager;
import com.howoocast.hywtl_has.company.parameter.CompanyParameter;
import com.howoocast.hywtl_has.company.repository.CompanyRepository;
import com.howoocast.hywtl_has.company.view.CompanyListView;
import com.howoocast.hywtl_has.company.view.CompanyView;
import com.querydsl.core.types.Predicate;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Transactional(readOnly = true)
    public Page<CompanyListView> page(@Nullable Predicate predicate, Pageable pageable) {
        return Optional.ofNullable(predicate)
            .map(p -> companyRepository.findAll(p, pageable))
            .orElse(companyRepository.findAll(pageable))
            .map(CompanyListView::assemble);
    }

    @Transactional(readOnly = true)
    public List<CompanyView> getList(@Nullable Predicate predicate) {
        Pageable pageable = Pageable.ofSize(Integer.MAX_VALUE);
        return Optional.ofNullable(predicate)
            .map(p -> companyRepository.findAll(p, pageable))
            .orElse(companyRepository.findAll(pageable))
            .map(CompanyView::assemble)
            .getContent();
    }

    @Transactional(readOnly = true)
    public CompanyView get(Long id) {
        Company company = companyRepository.findById(id).orElseThrow(() -> new NotFoundException("company", id));
        return CompanyView.assemble(company);
    }

    @Transactional
    public CompanyView add(CompanyParameter params) {
        List<Manager> managerList = Optional.ofNullable(params.getManagerList()).map(
            list -> list.stream()
                .map(manager -> Manager.of(
                    manager.getName(),
                    manager.getPosition(),
                    manager.getMobile(),
                    manager.getPhone(),
                    manager.getEmail(),
                    manager.getState()))
                .collect(Collectors.toList())
        ).orElse(Collections.emptyList());

        Company company = Company.of(
            params.getName(),
            params.getRepresentativeName(),
            params.getCompanyNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getPhone(),
            params.getMemo(),
            managerList
        );

        return CompanyView.assemble(companyRepository.save(company));
    }

    @Transactional
    public void change(Long id, CompanyParameter params) {
        Company company = companyRepository.findById(id).orElseThrow(() -> new NotFoundException("company", id));
        company.change(
            params.getName(),
            params.getRepresentativeName(),
            params.getCompanyNumber(),
            params.getAddress(),
            params.getZipCode(),
            params.getPhone(),
            params.getMemo(),
            params.getManagerList().stream()
                .map(manager -> Manager.of(
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


