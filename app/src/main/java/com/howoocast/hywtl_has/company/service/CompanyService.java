package com.howoocast.hywtl_has.company.service;

import com.howoocast.hywtl_has.common.exception.NotFoundException;
import com.howoocast.hywtl_has.company.domain.Company;
import com.howoocast.hywtl_has.company.repository.CompanyRepository;
import com.howoocast.hywtl_has.company.view.CompanyListView;
import com.howoocast.hywtl_has.company.view.CompanyView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Transactional(readOnly = true)
    public Page<CompanyListView> page(Pageable pageable) {
        return companyRepository.findAll(pageable).map(CompanyListView::assemble);
    }

    @Transactional(readOnly = true)
    public CompanyView get(Long id) {
        Company company = companyRepository.findById(id).orElseThrow(NotFoundException::new);
        return CompanyView.assemble(company);
    }
//
//    @Transactional
//    public Company create(CompanyParameter companyParameter){
//        //조회- repository.---
//
//        //수정- entity.---
//        List<Manager> managerList = companyParameter.getManagerParameterList().stream()
//                .map(managerParameter -> Manager.of(/*managerparameter...*/))
//                .collect(Collectors.toList());
//        Company company = Company.of(companyParameter.getName(),managerList);
//
//        //저장- repository.---
//        return CompanyView.assemble(companyRepository.save(company));
//    }
/*
    @Transactional
    public Company edit(CompanyParameter companyParameter){
        //조회- repository.---
        Company company = companyRepository.findById(companyParameter.getId()).orElseThrow(CompanyNotFoundException::new);
        //수정- entity.---
        company.edit(companyParameter.getName()....................);
        //저장- repository.---
        companyRepository.save(company);

        return company;
    }*/
}
