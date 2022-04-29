package com.howoocast.hywtl_has.company.service;

import com.howoocast.hywtl_has.company.domain.Company;
import com.howoocast.hywtl_has.company.domain.Manager;
import com.howoocast.hywtl_has.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyService {

//    private final CompanyRepository companyRepository;
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
