package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.Business;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class BusinessView {
    String name;
    String representativeName; // 대표명
    String registrationNumber; // 사업자번호
    String address; // 주소
    String zipCode; // 우편번호
    String officePhone; // 대표 전화번호
    String memo; // 비고
    List<BusinessManagerView> managerList;

    public static BusinessView assemble(Business business){
        BusinessView target = new BusinessView();

        target.name = business.getName();
        target.representativeName = business.getRepresentativeName();
        target.registrationNumber = business.getRegistrationNumber();
        target.address = business.getAddress();
        target.zipCode = business.getZipCode();
        target.officePhone = business.getOfficePhone();
        target.memo = business.getMemo();
        target.managerList = business.getManagerList().stream()
                .map(BusinessManagerView::assemble)
                .collect(Collectors.toList());
        return target;
    }
}
