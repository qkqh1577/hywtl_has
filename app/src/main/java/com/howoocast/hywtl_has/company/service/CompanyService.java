package com.howoocast.hywtl_has.company.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.company.domain.Company;
import com.howoocast.hywtl_has.company.domain.Manager;
import com.howoocast.hywtl_has.company.parameter.CompanyParameter;
import com.howoocast.hywtl_has.company.repository.CompanyRepository;
import com.howoocast.hywtl_has.company.repository.ManagerRepository;
import com.howoocast.hywtl_has.company.view.CompanyListView;
import com.howoocast.hywtl_has.company.view.CompanyView;
import com.howoocast.hywtl_has.company.view.ManagerView;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyService {

  private final CompanyRepository companyRepository;
  private final ManagerRepository managerRepository;

  @Transactional(readOnly = true)
  public Page<CompanyListView> page(@Nullable Predicate predicate, Pageable pageable) {
    return Optional.ofNullable(predicate)
        .map(p -> companyRepository.findAll(p, pageable))
        .orElse(companyRepository.findAll(pageable))
        .map(CompanyListView::assemble);
  }

  @Transactional(readOnly = true)
  public CompanyView get(Long id) {
    Company company = companyRepository.findById(id).orElseThrow(NotFoundException::new);
    return CompanyView.assemble(company);
  }

  @Transactional
  public CompanyView add(CompanyParameter params) {

    List<Manager> managerList = params.getManagerList().stream()
        .map(manager -> Manager.of(
            manager.getName(),
            manager.getPosition(),
            manager.getMobile(),
            manager.getPhone(),
            manager.getEmail(),
            manager.getState(),
            "OOO"))
        .collect(Collectors.toList());

    Company company = Company.of(
        params.getName(),
        params.getRepresentativeName(),
        params.getCompanyNumber(),
        params.getAddress(),
        params.getZipCode(),
        params.getPhone(),
        params.getMemo(),
        managerList,
        "OOO"
    );

    return CompanyView.assemble(companyRepository.save(company));
  }

  @Transactional
  public CompanyView change(Long id, CompanyParameter params) {
    Company company = companyRepository.findById(id).orElseThrow(NotFoundException::new);

    List<Manager> newManagers = new ArrayList<>();
    params.getManagerList().stream()
        .forEach(managerParameter -> {
          company.getManagerList().stream()
              .filter(m -> m.getId().equals(managerParameter.getId()))
              .findFirst().ifPresentOrElse(manager -> {
                manager.change(
                    managerParameter.getName(),
                    manager.getPosition(),
                    manager.getMobile(),
                    manager.getPhone(),
                    manager.getEmail(),
                    manager.getState(),
                    "OOO"
                );
              }, () -> {
                newManagers.add(
                    Manager.of(
                        managerParameter.getName(),
                        managerParameter.getPosition(),
                        managerParameter.getMobile(),
                        managerParameter.getPhone(),
                        managerParameter.getEmail(),
                        managerParameter.getState(),
                        "OOO"
                    ));
              });
        });
    company.getManagerList().addAll(newManagers);
    company.getManagerList()
        .removeIf(manager -> params.getManagerList().stream()
            .noneMatch(managerParameter -> manager.getId().equals(managerParameter.getId())));

    company.change(
        params.getName(),
        params.getRepresentativeName(),
        params.getCompanyNumber(),
        params.getAddress(),
        params.getZipCode(),
        params.getPhone(),
        params.getMemo(),
        newManagers,
        "OOO"
    );
    //저장- repository.---
    return CompanyView.assemble(companyRepository.save(company));
  }
}
