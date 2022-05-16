package com.howoocast.hywtl_has.company.view;

import com.howoocast.hywtl_has.company.domain.Company;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CompanyView {
    String name;
    String representativeName; // 대표명
    String companyNumber; // 사업자번호
    String address; // 주소
    String zipCode; // 우편번호
    String phone; // 대표 전화번호
    String memo; // 비고
    List<ManagerView> managerList;

    public static CompanyView assemble(Company company){
        CompanyView target = new CompanyView();

        target.name = company.getName();
        target.representativeName = company.getRepresentativeName();
        target.companyNumber = company.getCompanyNumber();
        target.address = company.getAddress();
        target.zipCode = company.getZipCode();
        target.phone = company.getPhone();
        target.memo = company.getMemo();
        target.managerList = company.getManagerList().stream()
                .map(ManagerView::assemble)
                .collect(Collectors.toList());
        return target;
    }
}
