package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.Business;
import java.util.Optional;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class BusinessView {

    private Long id;

    private String name;
    private String representativeName; // 대표명
    private String registrationNumber; // 사업자번호
    private String address; // 주소
    private String zipCode; // 우편번호
    private String officePhone; // 대표 전화번호
    private String memo; // 비고
    private List<BusinessManagerView> managerList;

    public static BusinessView assemble(Business business) {
        BusinessView target = new BusinessView();
        target.id = business.getId();
        target.name = business.getName();
        target.representativeName = business.getRepresentativeName();
        target.registrationNumber = business.getRegistrationNumber();
        target.address = business.getAddress();
        target.zipCode = business.getZipCode();
        target.officePhone = business.getOfficePhone();
        target.memo = business.getMemo();
        target.managerList = Optional.ofNullable(business.getManagerList())
            .map(managerList -> managerList.stream()
                .map(BusinessManagerView::assemble)
                .collect(Collectors.toList()
                )
            )
            .orElse(null);
        return target;
    }
}
