package com.howoocast.hywtl_has.business.view;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import java.util.Collections;
import java.util.Optional;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class BusinessView {

    private Long id;
    private String name;
    private String ceoName;
    private String officePhone;
    private String registrationNumber;
    private String address;
    private String note;
    private List<BusinessManagerView> managerList;

    public static BusinessView assemble(Business business) {
        BusinessView target = new BusinessView();
        target.id = business.getId();
        target.name = business.getName();
        target.ceoName = business.getCeoName();
        target.officePhone = business.getOfficePhone();
        target.registrationNumber = business.getRegistrationNumber();
        target.address = business.getAddress();
        target.note = business.getNote();
        target.managerList = Optional.ofNullable(business.getManagerList())
            .map(BusinessView::toView)
            .orElse(Collections.emptyList());
        return target;
    }

    private static List<BusinessManagerView> toView(List<BusinessManager> list) {
        return list.stream().map(BusinessManagerView::assemble).collect(Collectors.toList());
    }
}
